const puppeteer = require('puppeteer');
const fs = require('fs');

async function startRoom(scriptPath) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });
    const page = await browser.newPage();
    page.on('console', msg => console.log('[' + scriptPath + ']', msg.text()));
    const script = fs.readFileSync(scriptPath, 'utf8');
    await page.goto('https://www.haxball.com/headless', { waitUntil: 'networkidle2', timeout: 60000 });
    await page.evaluate(script);
    console.log(scriptPath + ' started!');
  } catch (err) {
    console.error(scriptPath + ' error:', err.message);
  }
}

startRoom('./room1.js');
setTimeout(() => startRoom('./room2.js'), 5000);
