// The weekly update's report, in two forms from the same findings:
//   markdown: the pull request description. GitHub's own email to you carries it, so it reads top to bottom:
//             the week at a glance, your to-do list, then each kind of change in detail.
//   html:     the same report designed as an email (sent only if the Gmail secrets are set). {{PR_URL}} is
//             filled in by the workflow once the pull request exists.

const lakh = (v) => (v == null || !v ? '—' : v >= 1e7 ? `₹${(v / 1e7).toFixed(2)} Cr` : `₹${(v / 1e5).toFixed(2)} L`)
const range = (p) => (!p?.[0] ? 'price not announced' : p[1] && p[1] !== p[0] ? `${lakh(p[0])} – ${lakh(p[1])}` : lakh(p[0]))
const nice = (d) => {
  if (!d) return '—'
  const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?/.exec(d)
  if (!m) return d
  const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Number(m[2]) - 1]
  return m[3] ? `${Number(m[3])} ${mon} ${m[1]}` : `${mon} ${m[1]}`
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

/** Key specs of a new car page, in reading order. */
function specs(e) {
  const pt = e.powertrains?.[0] ?? {}
  const ev = pt.fuel === 'ev'
  return [
    ['Body', { hatchback: 'Hatchback', sedan: 'Sedan', suv: 'SUV', 'compact-suv': 'Compact SUV', mpv: 'MPV', coupe: 'Coupe', pickup: 'Pickup' }[e.body] ?? e.body],
    ['Seats', e.seats?.join(' / ')],
    ['Engine', pt.engine],
    ['Power', pt.powerPs ? `${pt.powerPs} PS${pt.torqueNm ? ` · ${pt.torqueNm} Nm` : ''}` : null],
    [ev ? 'Claimed range' : 'Claimed mileage', pt.efficiency ? (ev ? `${pt.efficiency} km` : `${pt.efficiency} kmpl`) : null],
    ['Variants', e.variants?.length ? `${e.variants.length} (${e.variants.map((v) => v.name).slice(0, 4).join(', ')}${e.variants.length > 4 ? '…' : ''})` : null],
    ['Safety', e.safety?.adult ? `${e.safety.adult}★ ${e.safety.agency ?? ''}` : 'not crash-tested yet'],
  ].map(([k, v]) => [k, v ?? '— (not confirmed)'])
}

export function report({ date, summary: s, checked, changed, sample = false }) {
  // every car that needs a studio render, and why
  const renders = [
    ...s.newCars.filter((n) => n.photo.kind === 'none').map((n) => ({ name: n.name, why: 'new car page, no free photo found' })),
    ...s.launched.filter((l) => l.photo.kind !== 'render').map((l) => ({ name: l.name, why: l.photo.kind === 'wiki' ? 'just launched (facelift?): the current photo may show the old design' : 'no photo at all' })),
    ...s.announced.filter((a) => a.photo.kind === 'none').map((a) => ({ name: a.name, why: 'upcoming, no free photo yet: render once official pictures are out', later: true })),
  ]
  const wikiToCheck = [...s.newCars, ...s.announced].filter((x) => x.photo.kind === 'wiki')
  const counts = [
    ['🚀', 'Launched', s.launched.length + s.newCars.length],
    ['🆕', 'New car pages', s.newCars.length],
    ['📣', 'Newly announced', s.announced.length],
    ['💰', 'Price changes', s.prices.length],
    ['🎨', 'Need a render', renders.length],
    ['⚠️', 'Need you', s.review.length],
  ]

  // ── markdown

  const md = []
  const photoMd = (p, alt) => (p.kind === 'none' ? '🎨 **No free photo found — please make a render**' : `<img src="${p.src}" alt="${esc(alt)}" width="300"><br><sub>${p.kind === 'render' ? 'SahiCar studio render' : `Photo from [Wikipedia](${p.page}) · **check it shows the current model**`}</sub>`)
  const srcMd = (list) => list.map((u) => `[${host(u)}](${u})`).join(' · ')

  md.push(`# ${sample ? '🧪 TEST — ' : ''}🚗 SahiCar weekly update — ${nice(date)}`, '')
  if (sample) md.push('> **This is a test email with sample updates.** Nothing was researched or changed. Close this when you\'ve seen it.', '')
  md.push('> Researched by Gemini with Google Search. **Nothing is live until you merge.** Merge = deploy · Close = discard.', '')
  md.push('## 📊 At a glance', '', '| | | |', '|---|---|---:|')
  for (const [i, k, v] of counts) md.push(`| ${i} | ${k} | **${v}** |`)
  md.push('')

  md.push('## ✅ Your to-do before merging', '')
  if (changed) md.push('- [ ] Open each **source** link and check it says what this report says')
  for (const n of s.newCars) md.push(`- [ ] Check every spec of the new **${n.name}** page`)
  for (const x of wikiToCheck) md.push(`- [ ] Check the Wikipedia photo of **${x.name}** shows the current model`)
  for (const r of renders.filter((r) => !r.later)) md.push(`- [ ] 🎨 Make a render for **${r.name}** — ${r.why}`)
  if (s.prices.length) md.push('- [ ] Update **variant** prices of the cars below (only the from–to range was changed)')
  for (const r of s.review) md.push(`- [ ] ⚠️ ${r}`)
  if (!changed && !s.review.length) md.push('Nothing to do: no changes this week. You can close this pull request.')
  md.push('')

  if (s.launched.length || s.newCars.length) {
    md.push('## 🚀 Launched this week', '_Moved out of Upcoming._', '')
    for (const n of s.newCars) {
      md.push(`### ${n.name} · 🆕 new car page`, '', photoMd(n.photo, n.name), '')
      md.push('| | |', '|---|---|', `| **Launched** | ${nice(n.date)} |`, `| **Price** | ${range(n.price)} |`)
      for (const [k, v] of specs(n.entry)) md.push(`| ${k} | ${v} |`)
      md.push(`| **Sources** | ${srcMd(n.sources)} |`, '')
    }
    for (const l of s.launched) {
      md.push(`### ${l.name}`, '', photoMd(l.photo, l.name), '')
      md.push('| | |', '|---|---|', `| **Launched** | ${nice(l.date)} |`, `| **Price** | ${range(l.price)} |`, '| **Car page** | already existed; marked as updated |', `| **Source** | ${srcMd([l.source])} |`, '')
    }
  }

  if (s.announced.length) {
    md.push('## 📣 Newly announced', '_Added to Upcoming._', '')
    for (const a of s.announced) {
      md.push(`### ${a.name} · \`${a.status}\``, '', a.photo.kind === 'none' ? '🎨 _No free photo yet — render once official pictures are out._' : photoMd(a.photo, a.name), '')
      md.push('| | |', '|---|---|', `| **Expected** | ${nice(a.expected)} |`, `| **Price** | ${a.price?.min ? `${range([a.price.min, a.price.max])} (estimate)` : 'not announced'} |`)
      if (a.notes) md.push(`| **What's known** | ${a.notes.replace(/\|/g, '/')} |`)
      if (a.advice) md.push(`| **Buyer tip** | ${a.advice.replace(/\|/g, '/')} |`)
      md.push(`| **Sources** | ${srcMd(a.sources)} |`, '')
    }
  }

  if (s.prices.length) {
    md.push('## 💰 Price changes', '', '| Car | Was | Now | Change | Source |', '|---|---|---|---:|---|')
    for (const p of s.prices) {
      const d = pct(p.from[0], p.to[0])
      md.push(`| **${p.name}** | ${range(p.from)} | **${range(p.to)}** | ${d > 0 ? '🔺' : d < 0 ? '🔻' : '•'} ${Math.abs(d).toFixed(1)}% | [${host(p.source)}](${p.source}) |`)
    }
    md.push('')
  }

  if (renders.length) {
    md.push('## 🎨 Renders needed', '', '| Car | Why |', '|---|---|')
    for (const r of renders) md.push(`| **${r.name}** | ${r.why} |`)
    md.push('', '_Ask Claude for render packs, as with the earlier batches._', '')
  }

  if (s.review.length) {
    md.push('## ⚠️ Needs you', '_Not applied — the script won\'t decide these on its own._', '')
    for (const r of s.review) md.push(`- ${r}`)
    md.push('')
  }

  md.push('<details><summary>🔎 Prices checked this week</summary>', '', checked.join(' · '), '', '</details>', '')

  // ── html email

  const card = (inner) => `<div style="background:#fff;border:1px solid #e6e2d9;border-radius:14px;padding:18px;margin:0 0 14px">${inner}</div>`
  const h2 = (t) => `<h2 style="font-size:17px;margin:26px 0 10px;color:#15171b">${t}</h2>`
  const row = (k, v) => `<tr><td style="padding:5px 12px 5px 0;color:#6b6f76;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:5px 0;color:#15171b">${v}</td></tr>`
  const srcHtml = (list) => list.map((u) => `<a href="${esc(u)}" style="color:#0b6b4f">${esc(host(u))}</a>`).join(' · ')
  const photoHtml = (p, alt) =>
    p.kind === 'none'
      ? `<div style="background:#fff4e5;border:1px dashed #e0a24a;border-radius:10px;padding:14px;color:#8a5a12;font-weight:600">🎨 No free photo found — please make a render</div>`
      : `<img src="${esc(p.src)}" alt="${esc(alt)}" width="100%" style="display:block;max-width:100%;border-radius:10px"><div style="font-size:12px;color:#6b6f76;margin-top:6px">${p.kind === 'render' ? 'SahiCar studio render' : `Photo from <a href="${esc(p.page)}" style="color:#0b6b4f">Wikipedia</a> · <b>check it shows the current model</b>`}</div>`
  const badge = (t, bg, fg) => `<span style="display:inline-block;background:${bg};color:${fg};border-radius:999px;padding:2px 9px;font-size:12px;font-weight:600">${t}</span>`

  const h = []
  h.push(`<div style="background:#f5f3ee;padding:24px 12px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5">`)
  h.push(`<div style="max-width:640px;margin:0 auto">`)
  h.push(`<div style="background:#0b6b4f;color:#fff;border-radius:16px;padding:22px 22px 18px"><div style="font-size:13px;opacity:.85">${sample ? '🧪 TEST · sample updates · ' : ''}SahiCar weekly update</div><div style="font-size:24px;font-weight:700;margin:2px 0 6px">${nice(date)}</div><div style="font-size:13px;opacity:.9">Researched by Gemini with Google Search. Nothing is live until you merge.</div>`)
  h.push(`<a href="{{PR_URL}}" style="display:inline-block;margin-top:14px;background:#fff;color:#0b6b4f;text-decoration:none;font-weight:700;border-radius:10px;padding:10px 16px">Review &amp; approve on GitHub →</a></div>`)

  h.push(h2('📊 At a glance'))
  // two rows of three: roomy on a computer, still readable on a phone (emails can't rely on media queries)
  const tile = ([i, k, v]) => `<td style="width:33.3%;padding:4px"><div style="background:#fff;border:1px solid #e6e2d9;border-radius:12px;padding:10px 6px;text-align:center"><div style="font-size:18px">${i}</div><div style="font-size:22px;font-weight:700;color:#15171b">${v}</div><div style="font-size:12px;color:#6b6f76">${k}</div></div></td>`
  h.push(`<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>${counts.slice(0, 3).map(tile).join('')}</tr><tr>${counts.slice(3).map(tile).join('')}</tr></table>`)

  const todo = []
  if (changed) todo.push('Open each source link and check it says what this report says')
  for (const n of s.newCars) todo.push(`Check every spec of the new <b>${esc(n.name)}</b> page`)
  for (const x of wikiToCheck) todo.push(`Check the Wikipedia photo of <b>${esc(x.name)}</b> shows the current model`)
  for (const r of renders.filter((r) => !r.later)) todo.push(`🎨 Make a render for <b>${esc(r.name)}</b> — ${esc(r.why)}`)
  if (s.prices.length) todo.push('Update variant prices of the changed cars (only the from–to range was changed)')
  for (const r of s.review) todo.push(`⚠️ ${esc(r)}`)
  h.push(h2('✅ Your to-do before merging'))
  h.push(card(todo.length ? `<ol style="margin:0;padding-left:20px">${todo.map((t) => `<li style="margin:4px 0">${t}</li>`).join('')}</ol>` : 'Nothing to do: no changes this week. You can close the pull request.'))

  if (s.launched.length || s.newCars.length) {
    h.push(h2('🚀 Launched this week'))
    for (const n of s.newCars) h.push(card(`<div style="margin-bottom:10px"><b style="font-size:16px">${esc(n.name)}</b> ${badge('NEW CAR PAGE', '#e3f2ec', '#0b6b4f')}</div>${photoHtml(n.photo, n.name)}<table style="margin-top:12px;border-collapse:collapse">${row('Launched', nice(n.date))}${row('Price', `<b>${range(n.price)}</b>`)}${specs(n.entry).map(([k, v]) => row(k, esc(v))).join('')}${row('Sources', srcHtml(n.sources))}</table>`))
    for (const l of s.launched) h.push(card(`<div style="margin-bottom:10px"><b style="font-size:16px">${esc(l.name)}</b> ${badge('LAUNCHED', '#e8eefc', '#2b4cb3')}</div>${photoHtml(l.photo, l.name)}<table style="margin-top:12px;border-collapse:collapse">${row('Launched', nice(l.date))}${row('Price', `<b>${range(l.price)}</b>`)}${row('Car page', 'already existed; marked as updated')}${row('Source', srcHtml([l.source]))}</table>`))
  }
  if (s.announced.length) {
    h.push(h2('📣 Newly announced'))
    for (const a of s.announced) h.push(card(`<div style="margin-bottom:10px"><b style="font-size:16px">${esc(a.name)}</b> ${badge(a.status.toUpperCase(), '#f1efe9', '#4a4d52')}</div>${a.photo.kind === 'none' ? `<div style="color:#8a5a12;font-size:13px">🎨 No free photo yet — render once official pictures are out.</div>` : photoHtml(a.photo, a.name)}<table style="margin-top:12px;border-collapse:collapse">${row('Expected', nice(a.expected))}${row('Price', a.price?.min ? `${range([a.price.min, a.price.max])} (estimate)` : 'not announced')}${a.notes ? row("What's known", esc(a.notes)) : ''}${a.advice ? row('Buyer tip', esc(a.advice)) : ''}${row('Sources', srcHtml(a.sources))}</table>`))
  }
  if (s.prices.length) {
    h.push(h2('💰 Price changes'))
    h.push(card(`<table width="100%" style="border-collapse:collapse;font-size:13px"><tr style="color:#6b6f76;text-align:left"><th style="padding:6px 4px">Car</th><th style="padding:6px 4px">Was</th><th style="padding:6px 4px">Now</th><th style="padding:6px 4px;text-align:right">Change</th></tr>${s.prices
      .map((p) => {
        const d = pct(p.from[0], p.to[0])
        return `<tr style="border-top:1px solid #eee"><td style="padding:8px 4px"><b>${esc(p.name)}</b><br><a href="${esc(p.source)}" style="color:#0b6b4f;font-size:12px">${esc(host(p.source))}</a></td><td style="padding:8px 4px;color:#6b6f76">${range(p.from)}</td><td style="padding:8px 4px"><b>${range(p.to)}</b></td><td style="padding:8px 4px;text-align:right;color:${d > 0 ? '#b3261e' : '#0b6b4f'};font-weight:700">${d > 0 ? '▲' : d < 0 ? '▼' : '•'} ${Math.abs(d).toFixed(1)}%</td></tr>`
      })
      .join('')}</table>`))
  }
  if (renders.length) {
    h.push(h2('🎨 Renders needed'))
    h.push(card(`<ul style="margin:0;padding-left:18px">${renders.map((r) => `<li style="margin:4px 0"><b>${esc(r.name)}</b> — ${esc(r.why)}</li>`).join('')}</ul><div style="font-size:12px;color:#6b6f76;margin-top:8px">Ask Claude for render packs, as with the earlier batches.</div>`))
  }
  if (s.review.length) {
    h.push(h2('⚠️ Needs you'))
    h.push(card(`<div style="font-size:12px;color:#6b6f76;margin-bottom:6px">Not applied — the script won't decide these on its own.</div><ul style="margin:0;padding-left:18px">${s.review.map((r) => `<li style="margin:4px 0">${esc(r)}</li>`).join('')}</ul>`))
  }
  h.push(h2('🔎 Prices checked this week'))
  h.push(card(`<div style="color:#4a4d52;font-size:13px">${checked.map(esc).join(' · ')}</div>`))
  h.push(`<div style="text-align:center;margin:20px 0 6px"><a href="{{PR_URL}}" style="display:inline-block;background:#0b6b4f;color:#fff;text-decoration:none;font-weight:700;border-radius:10px;padding:12px 20px">Review &amp; approve on GitHub →</a></div>`)
  h.push(`<div style="text-align:center;font-size:12px;color:#8a8d93">Merge to put it live · Close to discard · Sent by the SahiCar weekly update</div>`)
  h.push('</div></div>')

  return { markdown: md.join('\n') + '\n', html: h.join('\n') }
}
