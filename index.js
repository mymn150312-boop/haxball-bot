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

startRoom("Room 1", "thr1.AAAAAGnU9HuzkX0CdyImKQ.sMgiRdvM8lM");
setTimeout(() => startRoom("Room 2", "thr1.AAAAAGnU9MEaTxoGVcz_lA.uv6C7IrFzgA"), 5000);
