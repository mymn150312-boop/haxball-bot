const HBInit = require('node-haxball');

const room1 = HBInit({
  roomName: "Room 1",
  maxPlayers: 16,
  public: true,
  token: "thr1.AAAAAGnV3PgovBTgJFW0lg.wYVHQhpE_os"
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
    token: "thr1.AAAAAGnV3UNwtLW7fRTD9g.BVvbDRMG090"
  });

  room2.onPlayerJoin = function(player) {
    console.log("Room 2: " + player.name + " joined!");
  };

  console.log("Room 2 started!");
}, 5000);
