// Indian number formats: lakh and crore, ₹ with en-IN grouping.

export const inr = (v: number) => `₹${Math.round(v).toLocaleString('en-IN')}`

/** ₹8.49 L, ₹1.2 Cr */
export function lakh(v: number, digits = 2) {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(2).replace(/\.?0+$/, '')} Cr`
  return `₹${(v / 100000).toFixed(digits).replace(/\.0+$/, '')} L`
}

export const priceRange = (p: { min: number; max: number }) => (p.max > p.min ? `${lakh(p.min)} – ${lakh(p.max)}` : lakh(p.min))

export const km = (v: number) => `${Math.round(v).toLocaleString('en-IN')} km`

export const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`
