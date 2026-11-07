// The QR code on the "Get the app" sheet for desktop visitors: it opens the site on a phone with the install sheet ready.
// Usage: npm run app:qr [url]   (default: the live site)
import { writeFile } from 'node:fs/promises'
import QRCode from 'qrcode'

const url = process.argv[2] ?? 'https://sahicar-in.web.app/?app=1'
const svg = await QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'H', margin: 0, color: { dark: '#15171b', light: '#0000' } })
await writeFile('public/app-qr.svg', svg)
console.log('public/app-qr.svg →', url)
