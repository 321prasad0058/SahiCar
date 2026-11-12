// Close-up renders of a model at named shots in a 2-column sheet. usage: PORT=5181 node scripts/trace/shots.cjs <car-id> <out.jpg> f34 front r34 rear side
const pp=require('puppeteer-core'),sharp=require('sharp');
const [car,out,...shots]=process.argv.slice(2);
(async()=>{const b=await pp.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new',args:['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist']});const p=await b.newPage();await p.setViewport({width:1400,height:800,deviceScaleFactor:1.5});const t=[];const errs=[];p.on('pageerror',e=>errs.push(e.message));
for(const [i,s] of shots.entries()){await p.goto(`http://localhost:${process.env.PORT || 5181}/dev/cars?car=${car}&shot=${s}&fov=8`,{waitUntil:'networkidle2'});await new Promise(r=>setTimeout(r,2500));t.push({input:await sharp(await p.screenshot({clip:{x:200,y:60,width:1000,height:680}})).resize(700).toBuffer(),left:(i%2)*705,top:Math.floor(i/2)*481})}
await sharp({create:{width:1410,height:Math.ceil(shots.length/2)*481,channels:3,background:'#777'}}).composite(t).jpeg({quality:85}).toFile(out);console.log(errs[0]||'ok');await b.close()})()
