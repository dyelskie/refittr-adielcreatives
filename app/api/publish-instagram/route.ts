import {NextResponse} from 'next/server'

const IG_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID!
const IG_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN!
// Check developers.facebook.com/docs for the current API version and update
// this if Meta deprecates v21.0 in the future.
const GRAPH_BASE = 'https://graph.instagram.com/v21.0'

// Allow the Studio (running on a different port/origin) to call this route.
// For a real deployment, replace '*' with your Studio's actual URL.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, {status: 204, headers: corsHeaders})
}

export async function POST(request: Request) {
  try {
    const {slides, caption} = await request.json()

    if (!Array.isArray(slides) || slides.length < 2) {
      return NextResponse.json(
        {error: 'A carousel post needs at least 2 slide images'},
        {status: 400, headers: corsHeaders},
      )
    }
    if (!IG_ACCOUNT_ID || !IG_ACCESS_TOKEN) {
      return NextResponse.json(
        {error: 'Missing INSTAGRAM_ACCOUNT_ID or INSTAGRAM_ACCESS_TOKEN in server environment'},
        {status: 500, headers: corsHeaders},
      )
    }

    // Step 1: create an image container for each slide.
    const childIds: string[] = []
    for (const imageUrl of slides) {
      const res = await fetch(`${GRAPH_BASE}/${IG_ACCOUNT_ID}/media`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          image_url: imageUrl,
          is_carousel_item: true,
          access_token: IG_ACCESS_TOKEN,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error?.message || 'Failed to create an image container')
      }
      childIds.push(data.id)
    }

    // Instagram needs a moment to finish processing each image.
    await waitUntilFinished(childIds)

    // Step 2: bundle all the image containers into one carousel container.
    const carouselRes = await fetch(`${GRAPH_BASE}/${IG_ACCOUNT_ID}/media`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        media_type: 'CAROUSEL',
        children: childIds,
        caption,
        access_token: IG_ACCESS_TOKEN,
      }),
    })
    const carouselData = await carouselRes.json()
    if (!carouselRes.ok) {
      throw new Error(carouselData.error?.message || 'Failed to create the carousel container')
    }

    await waitUntilFinished([carouselData.id])

    // Step 3: publish the carousel.
    const publishRes = await fetch(`${GRAPH_BASE}/${IG_ACCOUNT_ID}/media_publish`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        creation_id: carouselData.id,
        access_token: IG_ACCESS_TOKEN,
      }),
    })
    const publishData = await publishRes.json()
    if (!publishRes.ok) {
      throw new Error(publishData.error?.message || 'Failed to publish the carousel')
    }

    return NextResponse.json({success: true, mediaId: publishData.id}, {headers: corsHeaders})
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {error: error instanceof Error ? error.message : 'Something went wrong'},
      {status: 500, headers: corsHeaders},
    )
  }
}

async function waitUntilFinished(containerIds: string[], maxAttempts = 10, delayMs = 2000) {
  for (const id of containerIds) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const res = await fetch(
        `${GRAPH_BASE}/${id}?fields=status_code&access_token=${IG_ACCESS_TOKEN}`,
      )
      const data = await res.json()

      if (data.status_code === 'FINISHED') break
      if (data.status_code === 'ERROR') {
        throw new Error(`Instagram failed to process a container (${id})`)
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }
}