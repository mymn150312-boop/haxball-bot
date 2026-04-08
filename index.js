const HBInit = require('node-haxball');
const puppeteer = require('puppeteer');

async function getToken() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://www.haxball.com/headlesstoken');
  const token = await page.waitForSelector('.token', { timeout: 30000 });
  const tokenText = await token.evaluate(el => el.textContent);
  await browser.close();
  return tokenText.trim();
}

async function startRoom(roomName) {
  const token = await getToken();
  console.log(roomName + " got token: " + token);
  const room = HBInit({
    roomName: roomName,
    maxPlayers: 16,
    public: true,
    token: token
  });
  room.onPlayerJoin = function(player) {
    console.log(roomName + ": " + player.name + " joined!");
  };
  console.log(roomName + " started!");
}

startRoom("Room 1");
setTimeout(() => startRoom("Room 2"), 10000);
