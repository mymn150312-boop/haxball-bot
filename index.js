const haxball = require('node-haxball');

async function startRoom(roomName, token) {
  const HBInit = await haxball();
  const room = HBInit.Room({
    roomName: roomName,
    maxPlayers: 16,
    public: true,
    token: token
  });
  room.onPlayerJoin = (player) => {
    console.log("[" + roomName + "] " + player.name + " joined!");
  };
  console.log(roomName + " started!");
}

startRoom("Room 1", "thr1.AAAAAGnV3PgovBTgJFW0lg.wYVHQhpE_os");
setTimeout(() => startRoom("Room 2", "thr1.AAAAAGnV3UNwtLW7fRTD9g.BVvbDRMG090"), 5000);
