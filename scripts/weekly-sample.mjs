// Sample answers for `weekly-update.mjs --sample`: show what the weekly report and email look like without asking
// Gemini or changing any data. Answers are chosen by what each prompt asks, like the real ones would be.
export function sampleAnswer(prompt) {
  if (prompt.includes('has it been LAUNCHED')) {
    return [
      { id: 'toyota-innova-hycross', launched: true, date: '2026-11-25', priceMin: 1999000, priceMax: 3200000, source: 'https://www.autocarindia.com/car-news/toyota-innova-hycross-facelift-to-launch-on-november-25-441225' },
      { id: 'denza-d9', launched: true, date: '2026-11-13', priceMin: 8500000, priceMax: 9000000, source: 'https://www.autocarpro.in/news/byds-luxury-brand-denza-to-debut-in-india-on-november-13-135455' },
    ]
  }
  if (prompt.includes('Write the Indian-market car entry')) {
    return {
      brand: 'Denza (BYD)', model: 'D9', body: 'mpv', segment: 'luxury', price: { min: 8500000, max: 9000000 }, seats: [7],
      dims: { length: 5250, width: 1960, height: 1920, wheelbase: 3110 },
      safety: { agency: null, adult: null, child: null, year: null, airbagsStd: null, airbagsMax: null, esc: true, adas: 'L2' },
      powertrains: [{ engine: 'Single motor, 103 kWh', cc: null, powerPs: 313, torqueNm: 360, transmissions: ['single-speed'], efficiency: 520, batteryKwh: 103, priceFrom: 8500000, fuel: 'ev' }],
      variants: [{ name: 'Premium', fuel: 'ev', transmission: 'AT', price: 8500000 }, { name: 'Flagship', fuel: 'ev', transmission: 'AT', price: 9000000 }],
      features: ['adas', 'captain-seats'], highlights: ['Luxury electric MPV'], weaknesses: ['Imported, small service network'],
      wiki: 'Denza D9', sources: ['https://www.autocarpro.in/news/byds-luxury-brand-denza-to-debut-in-india-on-november-13-135455'],
    }
  }
  if (prompt.includes('officially announced')) {
    return [
      { id: 'sample-motors-aurora', brand: 'Sample Motors', model: 'Aurora EV', body: 'suv', expected: '2027-03', price: { min: 1500000, max: 2200000 }, fuels: ['ev'], status: 'confirmed', rivals: ['hyundai-creta-electric', 'tata-curvv-ev'], waitAdvice: 'If you are shopping for a Creta Electric, it may be worth seeing this first.', notes: 'A made-up car, to show how a new announcement without photos looks in the report.', wiki: null, sources: ['https://www.carwale.com/upcoming-cars/'] },
    ]
  }
  if (prompt.includes('ex-showroom price range')) {
    const rows = [...prompt.matchAll(/^([a-z0-9-]+): .*\(we have (\d+)–(\d+)\)$/gm)]
    const [a, b, c] = rows
    return [
      { id: a[1], min: Math.round(Number(a[2]) * 1.03), max: Math.round(Number(a[3]) * 1.03), source: 'https://www.cardekho.com/' },
      { id: b[1], min: Math.round(Number(b[2]) * 0.97), max: Number(b[3]), source: 'https://www.carwale.com/' },
      { id: c[1], min: Math.round(Number(c[2]) * 1.6), max: Math.round(Number(c[3]) * 1.6), source: 'https://www.zigwheels.com/' },
    ]
  }
  return []
}
