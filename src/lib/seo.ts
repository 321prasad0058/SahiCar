// Search and share tags for the current page: title, description, canonical address, Open Graph / Twitter card and
// JSON-LD structured data. Pages call setSeo() when they know what they show; scripts/prerender.mjs bakes the result
// into a static HTML file per page, so search engines read it without running the app.
export const SITE = 'https://sahicar-in.web.app'

export const ORG = {
  '@type': 'Organization',
  '@id': `${SITE}/#org`,
  name: 'SahiCar',
  url: `${SITE}/`,
  logo: `${SITE}/icon-192.png`,
  description: "India's free, unbiased car advisor",
  sameAs: ['https://www.youtube.com/@SahiCar', 'https://www.instagram.com/sahicar.official/'],
}

export interface Seo {
  title: string
  description: string
  /** path with a leading slash, e.g. /car/tata-nexon (no query string) */
  path: string
  /** absolute URL or site path of the share image */
  image?: string
  /** JSON-LD objects (without @context); placed in one @graph */
  ld?: object[]
}

const meta = (attr: 'name' | 'property', key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.content = value
}

export function setSeo({ title, description, path, image, ld }: Seo) {
  const url = SITE + (path === '/' ? '/' : path.replace(/\/$/, ''))
  const img = image ? (image.startsWith('http') ? image : SITE + image) : `${SITE}/og.png`
  document.title = title
  meta('name', 'description', description)
  meta('property', 'og:title', title)
  meta('property', 'og:description', description)
  meta('property', 'og:url', url)
  meta('property', 'og:image', img)
  meta('name', 'twitter:title', title)
  meta('name', 'twitter:description', description)
  meta('name', 'twitter:image', img)
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
  link.href = url
  let s = document.head.querySelector<HTMLScriptElement>('script#ld')
  if (!s) { s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'ld'; document.head.appendChild(s) }
  s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': [ORG, ...(ld ?? [])] })
}

/** a crumb trail for structured data: [['Home','/'], ['Explore','/explore'], ['Tata Nexon','/car/tata-nexon']] */
export const crumbs = (items: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + path })),
})

