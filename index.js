const puppeteer = require('puppeteer');

async function startRoom(roomName, token) {
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
  await page.evaluate((name, tok) => {
    window.HBInit({
      roomName: name,
      maxPlayers: 10,
      public: true,
      token: tok
    });
  }, roomName, token);
  console.log(`${roomName} started!`);
}

startRoom("Phong 1 VN", "thr1.AAAAAGnUlc4chqABzzuDUg.gREvl4sddr4");
startRoom("Phong 2 VN", "thr1.AAAAAGnUmVlpOxhk5RLtQw.2EkqBv1vD9s");
