const HBInit = require('node-haxball');
const puppeteer = require('puppeteer');

async function getToken() {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ],
    headless: true
  });

  const page = await browser.newPage();
  await page.goto('https://www.haxball.com/headlesstoken');
  const tokenEl = await page.waitForSelector('.token', { timeout: 60000 });
  const tokenText = await tokenEl.evaluate(el => el.textContent);
  await browser.close();
  return tokenText.trim();
}

async function startRoom(roomName) {
  try {
    const token = await getToken();
    console.log(`${roomName} got token: ${token}`);

    const room = HBInit({
      roomName: roomName,
      maxPlayers: 16,
      public: true,
      token: token
    });

    room.onPlayerJoin = function(player) {
      console.log(`${roomName}: ${player.name} joined!`);
    };

    console.log(`${roomName} started!`);
  } catch (err) {
    console.error(`${roomName} failed:`, err);
  }
}

async function main() {
  await startRoom("Room 1");
  await new Promise(r => setTimeout(r, 15000)); // chờ 15s
  await startRoom("Room 2");
}

main();
