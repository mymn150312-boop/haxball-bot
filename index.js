const puppeteer = require('puppeteer');

async function startRoom(scriptContent) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  });
  const page = await browser.newPage();
  await page.goto('https://www.haxball.com/headless');
  await page.evaluate(scriptContent);
  console.log("Room started!");
}

const script1 = `
${require('fs').readFileSync('./room1.js', 'utf8')}
`;

const script2 = `
${require('fs').readFileSync('./room2.js', 'utf8')}
`;

startRoom(script1);
setTimeout(() => startRoom(script2), 3000);
