// The SahiCar loader, in plain HTML and CSS so it can show before any JavaScript has loaded. vite.config.ts puts it
// into index.html (the first paint of app-only pages, and of every page while the app starts), and PageLoader shows
// the same markup whenever a page's code is still loading. Never a blank white page.
//
// Phone: the page dims and a white bottom sheet rises to the middle of the screen (the motion of a Material bottom
// sheet); inside the sheet a road runs from the logo to the bottom edge, its lane dashes moving towards you. It drops
// away when the page is ready. Desktop: a card floats where a full-screen road meets the horizon.
// Only transforms and opacity animate (no filters, no repaints), so it stays smooth on low-end phones. It is all
// inline in index.html, so it needs no network at all.
// Nothing shows for the first 160 ms, so a fast load never flickers.

const LOGO = `<svg class="scl-logo" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="15" fill="#0b6b4f"/><g transform="translate(1.16 -2.05)"><path d="M9.69 38.31L27.08 54.86L52.00 14.75L50.00 13.25L25.92 38.14L18.31 29.69Z" fill="#fff" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/><path d="M16.22 37.28L21.22 42.28L22.28 41.22L17.28 36.22ZM29.27 44.00L33.36 38.42L32.38 37.68L28.14 43.15ZM36.43 34.23L39.31 30.29L38.55 29.72L35.56 33.58ZM41.48 27.34L43.53 24.55L42.92 24.09L40.80 26.82ZM45.06 22.46L46.50 20.49L46.00 20.11L44.51 22.04Z" fill="#0b6b4f"/></g><rect class="scl-wipe" x="6" y="8" width="54" height="50" fill="#0b6b4f"/></svg>`

export const LOADER_HTML = `<div class="page-loading scl" role="status" aria-live="polite"><div class="scl-dim"></div><div class="scl-world" aria-hidden="true"><div class="scl-glow"></div><div class="scl-road"><i class="scl-lanes"></i></div></div><div class="scl-card"><div class="scl-sheet-road" aria-hidden="true"><div class="scl-road"><i class="scl-lanes"></i></div></div><div class="scl-float"><span class="scl-grab" aria-hidden="true"></span><div class="scl-brand">${LOGO}<span class="scl-word">Sahi<b>Car</b></span></div><div class="scl-bar" aria-hidden="true"><i></i></div><p class="scl-tag">Finding your right car…</p></div></div></div>`

export const LOADER_CSS = `
.scl{position:fixed;inset:0;z-index:45;contain:strict;font-family:'Instrument Sans',system-ui,sans-serif;color:#15171b;pointer-events:none;opacity:0;animation:scl-show 1ms linear .16s forwards}
.scl-dim{position:absolute;inset:0;background:rgba(21,23,27,.32);opacity:0;animation:scl-fade .25s cubic-bezier(0,0,.2,1) .16s forwards;will-change:opacity}
.scl-world{display:none}
.scl-road{position:absolute;left:50%;transform-origin:50% 0;overflow:hidden;-webkit-mask-image:linear-gradient(180deg,transparent 0%,#000 24%,#000 76%,transparent 100%);mask-image:linear-gradient(180deg,transparent 0%,#000 24%,#000 76%,transparent 100%);background:linear-gradient(90deg,transparent 0 6%,rgba(11,107,79,.6) 6% 7.8%,rgba(21,23,27,.045) 7.8% 92.2%,rgba(11,107,79,.6) 92.2% 94%,transparent 94%)}
.scl-lanes{position:absolute;left:0;right:0;top:-52px;bottom:0;background:repeating-linear-gradient(180deg,rgba(11,107,79,.55) 0 22px,transparent 22px 52px) 33.5% 0/3px 100% no-repeat,repeating-linear-gradient(180deg,rgba(11,107,79,.55) 0 22px,transparent 22px 52px) 66.5% 0/3px 100% no-repeat;animation:scl-drive .45s linear infinite;will-change:transform}
.scl-card{position:absolute;left:0;right:0;bottom:0;height:50%;overflow:hidden;background:linear-gradient(180deg,#fff 0%,#faf8f4 100%);border-radius:22px 22px 0 0;box-shadow:0 -12px 40px rgba(21,23,27,.16);transform:translateY(100%);animation:scl-up .42s cubic-bezier(.2,.8,.2,1) .16s forwards;will-change:transform}
.scl-sheet-road{position:absolute;inset:0;perspective:340px;perspective-origin:50% 46%;overflow:hidden}
.scl-sheet-road::before{content:"";position:absolute;left:50%;top:46%;width:360px;height:140px;margin:-70px 0 0 -180px;background:radial-gradient(closest-side,rgba(14,135,99,.16),rgba(14,135,99,0))}
.scl-sheet-road .scl-road{top:46%;width:190px;height:250px;margin-left:-95px;transform:rotateX(66deg)}
.scl-float{position:relative;height:100%;display:grid;align-content:start;justify-items:center;gap:12px;padding:30px 24px 0}
.scl-grab{position:absolute;top:10px;left:50%;width:38px;height:4px;margin-left:-19px;border-radius:4px;background:#d3cec3}
.scl-brand{display:flex;align-items:center;gap:12px}
.scl-logo{width:46px;height:46px;border-radius:13px;box-shadow:0 6px 16px rgba(11,107,79,.28)}
.scl-wipe{transform-box:fill-box;transform-origin:100% 50%;animation:scl-wipe .7s cubic-bezier(.65,0,.35,1) .35s forwards}
.scl-word{font-weight:700;font-size:28px;letter-spacing:-.03em}.scl-word b{font-weight:450}
.scl-bar{position:relative;width:min(200px,56vw);height:3px;border-radius:3px;background:#e4e0d7;overflow:hidden}
.scl-bar i{position:absolute;inset:0 auto 0 0;width:40%;border-radius:3px;background:linear-gradient(90deg,#0b6b4f,#0e8763);animation:scl-run 1.1s cubic-bezier(.65,0,.35,1) infinite;will-change:transform}
.scl-tag{margin:0;font-size:14px;color:#5d6168}
@media (min-width:761px){
.scl{background:radial-gradient(120% 90% at 50% 38%,#faf9f6 0%,#f5f3ee 45%,#ebe8e1 100%)}
.scl-dim,.scl-sheet-road,.scl-grab{display:none}
.scl-world{display:block;position:absolute;inset:0;overflow:hidden;perspective:600px;perspective-origin:50% 44%}
.scl-glow{position:absolute;left:50%;top:44%;width:1100px;height:300px;margin:-150px 0 0 -550px;background:radial-gradient(closest-side,rgba(14,135,99,.2),rgba(14,135,99,0));animation:scl-breathe 3.2s ease-in-out infinite;will-change:opacity}
.scl-world .scl-road{top:44%;width:300px;height:440px;margin-left:-150px;transform:rotateX(74deg)}
.scl-card{left:50%;right:auto;top:50%;bottom:auto;height:auto;width:380px;margin-left:-190px;margin-top:-118px;overflow:visible;background:rgba(255,255,255,.92);border:1px solid #fff;border-radius:24px;box-shadow:0 30px 80px -20px rgba(11,60,45,.35);transform:translateY(40px) scale(.96);opacity:0;animation:scl-rise .7s cubic-bezier(.16,1,.3,1) .16s forwards}
.scl-float{height:auto;align-content:center;padding:30px 32px 28px;gap:16px;animation:scl-bob 3.2s ease-in-out .9s infinite;will-change:transform}
.scl-logo{width:52px;height:52px;border-radius:14px}
.scl-word{font-size:30px}
}
.scl-out{opacity:1;animation:none}
.scl-out .scl-dim{opacity:1;animation:scl-unfade .26s cubic-bezier(.4,0,1,1) forwards}
.scl-out .scl-card{transform:none;animation:scl-down .26s cubic-bezier(.4,0,1,1) forwards}
.scl-out .scl-wipe{transform:scaleX(0);animation:none}
@media (min-width:761px){.scl-out{animation:scl-unfade .4s cubic-bezier(.4,0,.2,1) .05s forwards}.scl-out .scl-card{opacity:1;animation:scl-away .4s cubic-bezier(.4,0,.2,1) forwards}}
.scl-still,.scl-still .scl-dim,.scl-still .scl-card{animation:none;opacity:1;transform:none}
.scl-still .scl-wipe{animation:none;transform:scaleX(0)}
@media (prefers-reduced-motion:reduce){.scl,.scl *{animation-duration:1ms!important;animation-iteration-count:1!important}}
@keyframes scl-show{to{opacity:1}}
@keyframes scl-fade{to{opacity:1}}
@keyframes scl-unfade{from{opacity:1}to{opacity:0}}
@keyframes scl-up{to{transform:translateY(0)}}
@keyframes scl-down{from{transform:translateY(0)}to{transform:translateY(100%)}}
@keyframes scl-rise{to{transform:none;opacity:1}}
@keyframes scl-away{from{transform:none;opacity:1}to{transform:translateY(-14px) scale(1.03);opacity:0}}
@keyframes scl-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes scl-wipe{to{transform:scaleX(0)}}
@keyframes scl-run{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}
@keyframes scl-drive{to{transform:translateY(52px)}}
@keyframes scl-breathe{0%,100%{opacity:.7}50%{opacity:1}}
`
