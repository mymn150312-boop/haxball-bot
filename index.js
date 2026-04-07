const puppeteer = require('puppeteer');

async function startRoom(roomName, maxPlayers) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  await page.goto('https://www.haxball.com/headless');
  await page.evaluate((name, max, token) => {
    window.HBInit({
      roomName: name,
      maxPlayers: max,
      public: true,
      token: token
    });
  }, roomName, maxPlayers, "thr1.AAAAAGnUlc4chqABzzuDUg.gREvl4sddr4");
  console.log(`${roomName} started!`);
}

startRoom("Phong 1 VN", 10);
startRoom("Phong 2 VN", 10);
