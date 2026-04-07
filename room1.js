// ⚽ FUTSAL VN - NO PASSWORD AT ALL ⚽

var roomConfig = {
  roomName: "⚽ Futsal VN Scrim 1 🇻🇳",
  maxPlayers: 30,
  public: true,
  geo: {
    code: "VN",
    lat: 16.46,
    lon: 107.59
  },
  scoreLimit: 0,
  timeLimit: 0,
  autoStart: true
};

var room = HBInit(roomConfig);

if (!room) {
  console.error("❌ Room init failed!");
} else {
  console.log("✅ Room created successfully!");
  console.log("📍 Geo: VN, Lat: 16.46, Lon: 107.59");
}

setTimeout(function() {
  room.sendAnnouncement("⚽ Futsal VN Scrim 1 - Việt Nam 🇻🇳", -1, 0x00FF00);
}, 500);

setTimeout(function() {
  room.sendAnnouncement("💬 Type !help for commands", -1, 0x00FF00);
}, 1000);

room.onPlayerJoin = function(player) {
  room.sendAnnouncement("👋 " + player.name + " joined!", -1, 0x00FF00);
  
  var playerNameLower = player.name.toLowerCase();
  if (playerNameLower.includes("sj") || playerNameLower.includes("ap")) {
    setTimeout(function() {
      var p = room.getPlayer(player.id);
      if (p && !p.admin) {
        room.setPlayerAdmin(player.id, true);
        room.sendAnnouncement("👑✨ " + player.name + " is AUTO ADMIN!", -1, 0xFF1493);
      }
    }, 300);
  }
};

room.onPlayerLeave = function(player) {
  room.sendAnnouncement("👋 " + player.name + " left", -1, 0xFF6347);
};

room.onPlayerChat = function(player, message) {
  if (!message) return true;
  
  var cmd = message.toLowerCase().trim();
  
  if (cmd === "!help") {
    room.sendAnnouncement("❓ === COMMANDS ===", player.id, 0x00BFFF);
    setTimeout(function() { 
      room.sendAnnouncement("ℹ️ !info - Room info", player.id, 0xFFD700); 
    }, 100);
    setTimeout(function() { 
      room.sendAnnouncement("👮 !admin - Get admin", player.id, 0xFFD700); 
    }, 200);
    setTimeout(function() { 
      room.sendAnnouncement("👑 !super pronhat - Super admin", player.id, 0xFFD700); 
    }, 300);
    return false;
  }
  
  if (cmd === "!info") {
    var players = room.getPlayers();
    room.sendAnnouncement("👥 Players: " + players.length + "/" + roomConfig.maxPlayers, player.id, 0xFFD700);
    return false;
  }
  
  if (cmd === "!admin") {
    var p = room.getPlayer(player.id);
    if (p && !p.admin) {
      room.setPlayerAdmin(player.id, true);
      room.sendAnnouncement("👑 " + player.name + " is now ADMIN!", -1, 0xFFD700);
    }
    return false;
  }
  
  if (cmd.startsWith("!super ")) {
    var parts = message.trim().split(" ");
    var password = parts[1];
    var correctPassword = "pronhat";
    
    if (password && password === correctPassword) {
      var p = room.getPlayer(player.id);
      if (p) {
        room.setPlayerAdmin(player.id, true);
        room.sendAnnouncement("👑💫 " + player.name + " is now SUPER ADMIN! 🔥", -1, 0xFF1493);
      }
    } else {
      room.sendAnnouncement("❌ Wrong password! Use: !super pronhat", player.id, 0xFF6347);
    }
    return false;
  }
  
  return true;
};

room.onGoal = function(player) {
  if (player) {
    room.sendAnnouncement("⚽🎯 GOAL! " + player.name, -1, 0xFFD700);
  } else {
    room.sendAnnouncement("⚽🤦 OWN GOAL!", -1, 0xFF6347);
  }
};

room.onGameStart = function() {
  room.sendAnnouncement("🟢 GAME STARTED! Let's go! 💪", -1, 0x00FF00);
};

room.onGameStop = function() {
  room.sendAnnouncement("🔴 GAME FINISHED! GG WP 👏", -1, 0x00BFFF);
};

console.log("✅ Futsal VN Scrim Room Loaded!");
console.log("🇻🇳 Ready to play!");
