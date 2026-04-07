const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');
const fs = require('fs');

async function startRoom(scriptPath) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true
  });
  const page = await browser.newPage();
  const script = fs.readFileSync(scriptPath, 'utf8');
  await page.goto('https://www.haxball.com/headless');
  await page.evaluate(script);
  console.log(scriptPath + " started!");
}

startRoom('./room1.js');
setTimeout(() => startRoom('./room2.js'), 3000);
