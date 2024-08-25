/**
 * socket enables real-time, bidirectional and event-based communication to server
 */
const socket = io();

/**
 * canvas enables to draw basic shape on the screen
 */
var ctx;
var canvas;

window.onload = () => {
    socket.emit('test', 'Canvas created');
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 25, 500, 450);
};
