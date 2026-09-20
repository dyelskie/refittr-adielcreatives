import {groq} from 'next-sanity'

// All collections, with a live count of how many outfits belong to each.
export const collectionsQuery = groq`
  *[_type == "collection"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    coverImage,
    "outfitCount": count(*[_type == "outfit" && collection._ref == ^._id])
  }
`

// A single collection, plus every outfit that belongs to it.
export const collectionQuery = groq`
  *[_type == "collection" && slug.current == $slug][0]{
    _id,
    name,
    description,
    "outfits": *[_type == "outfit" && collection._ref == ^._id]{
      _id,
      title,
      "slug": slug.current,
      coverImage
    }
  }
`

// A single outfit, with its top/bottom/shoes/accessories resolved to full
// item documents (including their affiliate links) rather than just references.
export const outfitQuery = groq`
  *[_type == "outfit" && slug.current == $slug][0]{
    _id,
    title,
    coverImage,
    "collection": collection->{name, "slug": slug.current},
    top->{_id, name, image, affiliateLinks},
    bottom->{_id, name, image, affiliateLinks},
    shoes->{_id, name, image, affiliateLinks},
    accessories[]->{_id, name, image, affiliateLinks}
  }
`

// Every tag document (both "style" and "tag" kinds) for populating filter dropdowns.
export const tagsQuery = groq`
  *[_type == "tag"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    kind
  }
`
