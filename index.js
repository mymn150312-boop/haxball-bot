const puppeteer = require('puppeteer');

(async () => {
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

  await page.evaluate((token) => {
    window.HBInit({
      roomName: "My Room VN",
      maxPlayers: 10,
      public: true,
      token: token
    });
  }, "thr1.AAAAAGnUlc4chqABzzuDUg.gREvl4sddr4");

  console.log("Room started!");
})();
