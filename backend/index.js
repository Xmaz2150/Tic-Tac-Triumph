const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

/* helpers */
const Lobby = require("./lobby");

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:2000";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:3000";
console.log(FRONTEND_URL);

// Configure CORS options
const corsOptions = {
  origin: [FRONTEND_URL],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [FRONTEND_URL],
    methods: ["GET", "POST"],
  },
});

/* Serve static files from the 'frontend' directory */
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const lobby = new Lobby();

io.on("connection", (socket) => {
  socket.on("joinRoom", (roomData) => {
    const status = lobby.addPlayer(socket, roomData);
    if (status === 1) {
      const players = lobby.getPlayers();
      console.log(players);
      io.to(roomData.ID).emit("StartGame", players);
    } else if (status === 0) {
      socket.emit("waitingForPlayer");
    } else if (status === -1) {
      console.log("Room is full");
    }
  });

  socket.on("playerMove", (room, data) => {
    let player = lobby.getSockPlayer(socket);
    //   let next_player
    io.to(room.ID).emit("moves", data, player.next);
  });

  socket.on("resetGame", (room) => {
    io.to(room.ID).emit("resetGame");
  });

  socket.on("disconnect", () => {
    const status = lobby.removePlayer(socket);
    if (status === 1) {
      io.to(lobby.roomDataT.ID).emit("playerDisconnected", socket.id);
      io.to(lobby.roomDataT.ID).emit("resetGame");
    } else if (status === -1) {
      console.log(`Could not remove player from this room: ${"?"}`);
    } else if (status === -2) {
      console.log("Invalid room");
    }
  });
});

server.listen(PORT, () => {
  console.log(`app listening at ${SERVER_URL}`);
});
