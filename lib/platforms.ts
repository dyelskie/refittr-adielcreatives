// Keep this in sync with schemaTypes/platforms.ts in the Studio project.
// The "value" here must exactly match the "value" saved on affiliateLinks.platform.
// "color" is used for the monogram badge in the buy popup — a plain colored
// circle with the platform's initial, not the platform's actual trademarked logo.

export const PLATFORMS = [
  {title: 'TikTok Shop', value: 'tiktok', color: '#000000'},
  {title: 'Shopee', value: 'shopee', color: '#EE4D2D'},
  {title: 'Lazada', value: 'lazada', color: '#0F146D'},
  {title: 'Zalora', value: 'zalora', color: '#1A1A1A'},
  {title: 'Shein', value: 'shein', color: '#000000'},
  {title: 'Amazon', value: 'amazon', color: '#FF9900'},
]