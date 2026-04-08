const HBInit = require('node-haxball');

const room1 = HBInit({
  roomName: "Room 1",
  maxPlayers: 16,
  public: true,
  token: "thr1.AAAAAGnV4KtbnKxVggPpqA.v4s2His-9RI"
});

room1.onPlayerJoin = function(player) {
  console.log("Room 1: " + player.name + " joined!");
};

console.log("Room 1 started!");

setTimeout(function() {
  const room2 = HBInit({
    roomName: "Room 2",
    maxPlayers: 16,
    public: true,
    token: "thr1.AAAAAGnV4Q3luUaTl3U3hw.1dYQW52mtxk"
  });

  room2.onPlayerJoin = function(player) {
    console.log("Room 2: " + player.name + " joined!");
  };

  console.log("Room 2 started!");
}, 5000);
