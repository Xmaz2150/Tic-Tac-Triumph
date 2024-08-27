const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const port = 3000;

const server = createServer(app);
const io = new Server(server);

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const rooms = {};

io.on('connection', (socket) => {
    socket.on('joinRoom', (roomData) => {
        if (!rooms[roomData.ID]) {
            rooms[roomData.ID] = [];
        }

        if (rooms[roomData.ID].length < 2) {
            rooms[roomData.ID].push(socket.id);
            socket.join(roomData.ID);

            if (rooms[roomData.ID].length === 2) {
                console.log(rooms[roomData.ID]);
                io.to(roomData.ID).emit('StartGame', rooms[roomData.ID]);
            }
        } else {
            console.log('Room is full');
        }
    });
    socket.on('playerMove', (room, data) => {
        io.to(room.ID).emit('moves', data);
    });
    socket.on('disconnect', () => {
        console.log('player disconnected');
    });
});

server.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});