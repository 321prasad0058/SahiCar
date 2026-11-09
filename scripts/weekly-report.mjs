// The weekly update's report, in two forms from the same findings, in SahiCar's own look (warm off-white, ink,
// one green accent, quiet cards; no emojis):
//   markdown: the pull request description. GitHub's email to you carries it, so it reads top to bottom:
//             the week in numbers, what to check before merging, then each kind of change in detail.
//   html:     the same report as a designed email (sent only if the Gmail secrets are set). {{PR_URL}} is filled
//             in by the workflow once the pull request exists.

const T = {
  bg: '#f5f3ee',
  surface: '#ffffff',
  surface2: '#faf9f6',
  ink: '#15171b',
  muted: '#5d6168',
  dim: '#8c8f95',
  line: '#e4e0d7',
  line2: '#d3cec3',
  accent: '#0b6b4f',
  accentSoft: '#e4f1eb',
  up: '#b3261e',
  font: "'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
}
const LOGO = 'https://sahicar-in.web.app/icon-192.png'

const lakh = (v) => (v == null || !v ? '—' : v >= 1e7 ? `₹${(v / 1e7).toFixed(2)} Cr` : `₹${(v / 1e5).toFixed(2)} L`)
const range = (p) => (!p?.[0] ? 'Not announced' : p[1] && p[1] !== p[0] ? `${lakh(p[0])} – ${lakh(p[1])}` : lakh(p[0]))
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const nice = (d, long = false) => {
  const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?/.exec(d ?? '')
  if (!m) return d || '—'
  const mon = MONTHS[Number(m[2]) - 1]
  const name = long ? mon : mon.slice(0, 3)
  return m[3] ? `${Number(m[3])} ${name} ${m[1]}` : `${name} ${m[1]}`
}
const host = (u) => {
  try {
    return new URL(u).hostname.replace(/^www\./, '')
  } catch {
    return 'source'
  }
}
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const pct = (from, to) => (from ? ((to - from) / from) * 100 : 0)
/** A price range's change: whichever end moved more (a new top variant can leave the starting price untouched). */
const rangePct = (from, to) => {
  const lo = pct(from[0], to[0])
  const hi = pct(from[1], to[1])
  return Math.abs(hi) > Math.abs(lo) ? hi : lo
}
const signed = (d) => `${d > 0 ? '+' : d < 0 ? '−' : ''}${Math.abs(d).toFixed(1)}%`
const BODY = { hatchback: 'Hatchback', sedan: 'Sedan', suv: 'SUV', 'compact-suv': 'Compact SUV', mpv: 'MPV', coupe: 'Coupe', pickup: 'Pickup' }
const STATUS = { confirmed: 'Confirmed', testing: 'Testing', rumoured: 'Rumoured' }

/** Key specs of a new car page, in reading order; anything unconfirmed says so. */
function specs(e) {
  const pt = e.powertrains?.[0] ?? {}
  const ev = pt.fuel === 'ev'
  return [
    ['Body', BODY[e.body] ?? e.body],
    ['Seats', e.seats?.join(' / ')],
    ['Powertrain', pt.engine],
    ['Power', pt.powerPs ? `${pt.powerPs} PS${pt.torqueNm ? ` · ${pt.torqueNm} Nm` : ''}` : null],
    [ev ? 'Claimed range' : 'Claimed mileage', pt.efficiency ? (ev ? `${pt.efficiency} km` : `${pt.efficiency} kmpl`) : null],
    ['Variants', e.variants?.length ? e.variants.map((v) => v.name).join(', ') : null],
    ['Safety', e.safety?.adult ? `${e.safety.adult}-star ${e.safety.agency ?? ''}`.trim() : 'Not crash-tested yet'],
  ].map(([k, v]) => [k, v ?? 'Not confirmed'])
}

export function report({ date, summary: s, checked, changed, sample = false }) {
  // every car that needs a studio render, and why
  const renders = [
    ...s.newCars.filter((n) => n.photo.kind === 'none').map((n) => ({ name: n.name, why: 'New car page; no free photo exists.' })),
    ...s.launched.filter((l) => l.photo.kind !== 'render').map((l) => ({ name: l.name, why: l.photo.kind === 'wiki' ? 'Just launched; the current photo may show the previous design.' : 'No photo at all.' })),
    ...s.announced.filter((a) => a.photo.kind === 'none').map((a) => ({ name: a.name, why: 'Upcoming; render once official pictures are released.', later: true })),
  ]
  const wikiToCheck = [...s.newCars, ...s.announced].filter((x) => x.photo.kind === 'wiki')
  const total = s.launched.length + s.newCars.length + s.announced.length + s.prices.length
  const stats = [
    ['Launched', s.launched.length + s.newCars.length],
    ['Announced', s.announced.length],
    ['Price changes', s.prices.length],
    ['Renders needed', renders.length],
    ['To review', s.review.length],
  ]
  const checks = []
  if (changed) checks.push({ text: 'Open each source and confirm it says what this report says.' })
  for (const n of s.newCars) checks.push({ text: `Check every spec on the new ${n.name} page.`, strong: n.name })
  for (const x of wikiToCheck) checks.push({ text: `Confirm the Wikipedia photo of ${x.name} shows the current model.`, strong: x.name })
  for (const r of renders.filter((r) => !r.later)) checks.push({ text: `Make a studio render for ${r.name}.`, strong: r.name })
  if (s.prices.length) checks.push({ text: 'Update variant prices for the cars whose price range changed.' })
  for (const r of s.review) checks.push({ text: r })
  const lead = sample
    ? 'A test of the weekly email, with sample updates. Nothing was researched or changed.'
    : total
      ? `${total} ${total === 1 ? 'change is' : 'changes are'} ready for your approval.`
      : 'Everything checked, nothing changed. Launches, announcements and this week\'s prices are all up to date, so there is nothing to approve.'

  // ── markdown (GitHub's email)

  const md = []
  const srcMd = (list) => list.map((u) => `[${host(u)}](${u})`).join(', ')
  const photoMd = (p, alt) =>
    p.kind === 'none'
      ? '> **Photo:** none available. A studio render is needed.'
      : `<img src="${p.src}" alt="${esc(alt)}" width="360"><br><sub>${p.kind === 'render' ? 'SahiCar studio render' : `Photo: [Wikipedia](${p.page}). Confirm it shows the current model.`}</sub>`

  md.push(`## SahiCar weekly update`, `**${nice(date, true)}**${sample ? ' · Test' : ''}`, '', lead, '')
  md.push(`| ${stats.map(([k]) => k).join(' | ')} |`, `|${stats.map(() => ':---:').join('|')}|`, `| ${stats.map(([, v]) => `**${v}**`).join(' | ')} |`, '')

  if (checks.length) {
    md.push('### Before you merge', '')
    for (const c of checks) md.push(`- [ ] ${c.strong ? c.text.replace(c.strong, `**${c.strong}**`) : c.text}`)
    md.push('')
  }

  if (s.newCars.length || s.launched.length) {
    md.push('---', '', '### Launched', '_These leave Upcoming and become car pages._', '')
    for (const n of s.newCars) {
      md.push(`#### ${n.name} · New car page`, '', photoMd(n.photo, n.name), '', '| | |', '|---|---|', `| Launched | ${nice(n.date)} |`, `| Price | **${range(n.price)}** |`)
      for (const [k, v] of specs(n.entry)) md.push(`| ${k} | ${v} |`)
      md.push(`| Sources | ${srcMd(n.sources)} |`, '')
    }
    for (const l of s.launched) {
      md.push(`#### ${l.name}`, '', photoMd(l.photo, l.name), '', '| | |', '|---|---|', `| Launched | ${nice(l.date)} |`, `| Price | **${range(l.price)}** |`, '| Car page | Already listed; marked as updated |', `| Source | ${srcMd([l.source])} |`, '')
    }
  }

  if (s.announced.length) {
    md.push('---', '', '### Announced', '_Added to Upcoming._', '')
    for (const a of s.announced) {
      md.push(`#### ${a.name} · ${STATUS[a.status] ?? a.status}`, '')
      md.push(a.photo.kind === 'none' ? '> **Photo:** none yet. Render once official pictures are released.' : photoMd(a.photo, a.name), '')
      md.push('| | |', '|---|---|', `| Expected | ${nice(a.expected)} |`, `| Price | ${a.price?.min ? `${range([a.price.min, a.price.max])} (estimate)` : 'Not announced'} |`)
      if (a.notes) md.push(`| What's known | ${a.notes.replace(/\|/g, '/')} |`)
      if (a.advice) md.push(`| For buyers | ${a.advice.replace(/\|/g, '/')} |`)
      md.push(`| Sources | ${srcMd(a.sources)} |`, '')
    }
  }

  if (s.prices.length) {
    md.push('---', '', '### Price changes', '_Ex-showroom range, lowest to highest variant._', '', '| Car | Was | Now | Change | Source |', '|---|---|---|---:|---|')
    for (const p of s.prices) md.push(`| ${p.name} | ${range(p.from)} | **${range(p.to)}** | ${signed(rangePct(p.from, p.to))} | [${host(p.source)}](${p.source}) |`)
    md.push('')
  }

  if (renders.length) {
    md.push('---', '', '### Renders needed', '', '| Car | Reason |', '|---|---|')
    for (const r of renders) md.push(`| ${r.name} | ${r.why} |`)
    md.push('')
  }

  if (s.review.length) {
    md.push('---', '', '### For your review', '_Not applied. These need a decision from you._', '')
    for (const r of s.review) md.push(`- ${r}`)
    md.push('')
  }

  md.push('---', '', `<details><summary>Prices checked this week (${checked.length})</summary>`, '', checked.join(', '), '', '</details>', '')
  md.push(`<sub>Merge to publish, close to discard. Updates are found with Gemini and Google Search; every change links to its source.</sub>`, '')

  // ── html (designed email)

  const eyebrow = (t) => `<div style="font-size:13px;font-weight:600;color:${T.accent};margin:0 0 4px">${t}</div>`
  const section = (label, title, note) =>
    `<div style="margin:32px 0 12px">${eyebrow(label)}<div style="font-size:20px;font-weight:700;color:${T.ink};letter-spacing:-0.01em">${title}</div>${note ? `<div style="font-size:13px;color:${T.muted};margin-top:2px">${note}</div>` : ''}</div>`
  const card = (inner, pad = 20) => `<div style="background:${T.surface};border:1px solid ${T.line};border-radius:16px;padding:${pad}px;margin:0 0 12px">${inner}</div>`
  const pill = (t, soft = true) => `<span style="display:inline-block;vertical-align:middle;margin-left:8px;background:${soft ? T.accentSoft : T.surface2};color:${soft ? T.accent : T.muted};border:1px solid ${soft ? 'transparent' : T.line};border-radius:999px;padding:2px 10px;font-size:12px;font-weight:600">${t}</span>`
  const details = (rows) =>
    `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:14px;border-collapse:collapse;font-size:14px">${rows
      .map(([k, v], i) => `<tr><td style="padding:9px 12px 9px 0;color:${T.muted};width:38%;vertical-align:top;${i ? `border-top:1px solid ${T.line}` : ''}">${k}</td><td style="padding:9px 0;color:${T.ink};vertical-align:top;${i ? `border-top:1px solid ${T.line}` : ''}">${v}</td></tr>`)
      .join('')}</table>`
  const links = (list) => list.map((u) => `<a href="${esc(u)}" style="color:${T.accent};text-decoration:underline">${esc(host(u))}</a>`).join(', ')
  const photo = (p, alt, later = false) =>
    p.kind === 'none'
      ? `<div style="background:${T.surface2};border:1px dashed ${T.line2};border-radius:12px;padding:22px 16px;text-align:center"><div style="font-size:14px;font-weight:600;color:${T.ink}">${later ? 'No official pictures yet' : 'No free photo available'}</div><div style="font-size:13px;color:${T.muted};margin-top:2px">${later ? 'Make a studio render once pictures are released.' : 'A studio render is needed for this car.'}</div></div>`
      : `<img src="${esc(p.src)}" alt="${esc(alt)}" width="100%" style="display:block;width:100%;max-width:100%;border-radius:12px;background:${T.bg}"><div style="font-size:12px;color:${T.dim};margin-top:8px">${p.kind === 'render' ? 'SahiCar studio render' : `Photo: <a href="${esc(p.page)}" style="color:${T.dim}">Wikipedia</a>. Confirm it shows the current model.`}</div>`
  const button = (label) =>
    `<a href="{{PR_URL}}" style="display:inline-block;background:${T.ink};color:#ffffff;border:1px solid ${T.ink};text-decoration:none;font-weight:600;font-size:15px;border-radius:999px;padding:12px 22px">${label}</a>`
  const carCard = (name, tag, ph, rows) => card(`<div style="font-size:17px;font-weight:700;color:${T.ink};margin-bottom:12px">${esc(name)}${tag}</div>${ph}${details(rows)}`)

  const h = []
  h.push(`<div style="background:${T.bg};padding:28px 14px;font-family:${T.font};font-size:15px;line-height:1.55;color:${T.ink}">`)
  h.push(`<div style="max-width:600px;margin:0 auto">`)

  // header: logo, date, the one decision to make
  h.push(`<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="vertical-align:middle"><img src="${LOGO}" width="30" height="30" alt="" style="vertical-align:middle;border-radius:8px"><span style="vertical-align:middle;font-size:18px;font-weight:700;margin-left:8px;letter-spacing:-0.01em">SahiCar</span></td><td style="text-align:right;vertical-align:middle;font-size:13px;color:${T.muted}">${sample ? 'Test · ' : ''}Weekly update</td></tr></table>`)
  h.push(`<div style="margin:26px 0 6px;font-size:30px;font-weight:700;letter-spacing:-0.02em;line-height:1.15">${nice(date, true)}</div>`)
  h.push(`<div style="font-size:16px;color:${T.muted};margin-bottom:20px">${esc(lead)}</div>`)
  if (total || sample) h.push(`<div style="margin-bottom:8px">${button('Review on GitHub')}</div>`)

  // the week in numbers
  h.push(
    `<div style="margin-top:24px">${card(
      `<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>${stats
        .map(([k, v], i) => `<td style="width:20%;text-align:center;padding:4px 2px;${i ? `border-left:1px solid ${T.line}` : ''}"><div style="font-size:26px;font-weight:700;color:${v ? T.ink : T.dim};line-height:1.1">${v}</div><div style="font-size:12px;color:${T.muted};margin-top:4px">${k}</div></td>`)
        .join('')}</tr></table>`,
      16,
    )}</div>`,
  )

  if (checks.length) {
    h.push(section('Your checklist', 'Before you merge'))
    h.push(card(`<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">${checks.map((c, i) => `<tr><td style="width:26px;padding:8px 0;vertical-align:top;${i ? `border-top:1px solid ${T.line}` : ''}"><div style="width:16px;height:16px;border:1.5px solid ${T.line2};border-radius:5px;margin-top:3px"></div></td><td style="padding:8px 0;font-size:14px;${i ? `border-top:1px solid ${T.line}` : ''}">${c.strong ? esc(c.text).replace(esc(c.strong), `<b>${esc(c.strong)}</b>`) : esc(c.text)}</td></tr>`).join('')}</table>`))
  }

  if (s.newCars.length || s.launched.length) {
    h.push(section('Launched', 'New on sale', 'These leave Upcoming and become car pages.'))
    for (const n of s.newCars) h.push(carCard(n.name, pill('New car page'), photo(n.photo, n.name), [['Launched', nice(n.date)], ['Price', `<b>${range(n.price)}</b>`], ...specs(n.entry).map(([k, v]) => [k, esc(v)]), ['Sources', links(n.sources)]]))
    for (const l of s.launched) h.push(carCard(l.name, pill('Updated', false), photo(l.photo, l.name), [['Launched', nice(l.date)], ['Price', `<b>${range(l.price)}</b>`], ['Car page', 'Already listed; marked as updated'], ['Source', links([l.source])]]))
  }

  if (s.announced.length) {
    h.push(section('Announced', 'Coming to India', 'Added to Upcoming.'))
    for (const a of s.announced)
      h.push(carCard(a.name, pill(STATUS[a.status] ?? a.status, false), photo(a.photo, a.name, true), [['Expected', nice(a.expected)], ['Price', a.price?.min ? `${range([a.price.min, a.price.max])} <span style="color:${T.dim}">(estimate)</span>` : 'Not announced'], ...(a.notes ? [["What's known", esc(a.notes)]] : []), ...(a.advice ? [['For buyers', esc(a.advice)]] : []), ['Sources', links(a.sources)]]))
  }

  if (s.prices.length) {
    h.push(section('Prices', 'Price changes', 'Ex-showroom range, lowest to highest variant.'))
    h.push(
      card(
        `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:14px"><tr><td style="padding:0 0 8px;font-size:12px;color:${T.dim}">Car</td><td style="padding:0 0 8px;font-size:12px;color:${T.dim}">Now</td><td style="padding:0 0 8px;font-size:12px;color:${T.dim};text-align:right">Change</td></tr>${s.prices
          .map((p) => {
            const d = rangePct(p.from, p.to)
            return `<tr><td style="padding:11px 8px 11px 0;border-top:1px solid ${T.line};vertical-align:top"><b>${esc(p.name)}</b><div style="font-size:12px;color:${T.dim}">Was ${range(p.from)} · <a href="${esc(p.source)}" style="color:${T.dim}">${esc(host(p.source))}</a></div></td><td style="padding:11px 8px 11px 0;border-top:1px solid ${T.line};vertical-align:top;white-space:nowrap"><b>${range(p.to)}</b></td><td style="padding:11px 0;border-top:1px solid ${T.line};vertical-align:top;text-align:right;font-weight:600;white-space:nowrap;color:${d > 0 ? T.up : T.accent}">${signed(d)}</td></tr>`
          })
          .join('')}</table>`,
      ),
    )
  }

  if (renders.length) {
    h.push(section('Photos', 'Renders needed'))
    h.push(card(`<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:14px">${renders.map((r, i) => `<tr><td style="padding:9px 12px 9px 0;font-weight:600;width:42%;vertical-align:top;${i ? `border-top:1px solid ${T.line}` : ''}">${esc(r.name)}</td><td style="padding:9px 0;color:${T.muted};vertical-align:top;${i ? `border-top:1px solid ${T.line}` : ''}">${esc(r.why)}</td></tr>`).join('')}</table><div style="font-size:13px;color:${T.dim};margin-top:10px">Ask Claude for render packs, as with the earlier batches.</div>`))
  }

  if (s.review.length) {
    h.push(section('Needs a decision', 'For your review', 'Not applied. The update leaves these to you.'))
    h.push(card(s.review.map((r, i) => `<div style="font-size:14px;padding:8px 0;${i ? `border-top:1px solid ${T.line}` : ''}">${esc(r)}</div>`).join('')))
  }

  h.push(section('Coverage', 'Prices checked this week'))
  h.push(card(`<div style="font-size:14px;color:${T.muted}">${checked.map(esc).join(', ')}</div>`))

  if (total || sample) h.push(`<div style="text-align:center;margin:30px 0 10px">${button('Review on GitHub')}</div>`)
  h.push(`<div style="text-align:center;font-size:12px;color:${T.dim};margin-top:14px;line-height:1.6">${total || sample ? 'Merge to publish, close to discard.<br>' : ''}Updates are found with Gemini and Google Search; every change links to its source.<br>SahiCar · India's free, unbiased car advisor</div>`)
  h.push('</div></div>')

  return { markdown: md.join('\n') + '\n', html: h.join('\n') }
}
