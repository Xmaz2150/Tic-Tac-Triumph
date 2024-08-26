
const socket = io();

var canvas;
var ctx;
var squareSize = 100;
var rows = 3;
var cols = 3;
var board = Array(rows).fill(null).map(() => Array(cols).fill(null));
var currentPlayer = 'X';

const room = {ID: 1};

window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    drawGrid();

    socket.emit('joinRoom', {ID: 1});
    socket.on('StartGame', (players) => {
        console.log(players);
    
        canvas.addEventListener('click', (event) => {        
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            const data = {
                rect: rect,
                point: {x: x, y: y}
            }
            socket.emit('playerMove', room, data);
        });
    });
    socket.on('moves', (data) => {
        console.log(`received event from server`);
        handleCanvasClick(data.rect, data.point.x, data.point.y);
    });
};

function drawGrid() {
    ctx.fillStyle = 'blue';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
        }
    }

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    for (let row = 0; row <= rows; row++) {
        ctx.beginPath();
        ctx.moveTo(0, row * squareSize);
        ctx.lineTo(cols * squareSize, row * squareSize);
        ctx.stroke();
    }
    for (let col = 0; col <= cols; col++) {
        ctx.beginPath();
        ctx.moveTo(col * squareSize, 0);
        ctx.lineTo(col * squareSize, rows * squareSize);
        ctx.stroke();
    }
}

function handleCanvasClick(rect, x, y) {

    const clickedCol = Math.floor(x / squareSize);
    const clickedRow = Math.floor(y / squareSize);

    if (clickedCol >= 0 && clickedCol < cols && clickedRow >= 0 && clickedRow < rows) {
        if (board[clickedRow][clickedCol] === null) {
            board[clickedRow][clickedCol] = currentPlayer;
            drawMark(clickedRow, clickedCol, currentPlayer);
            if (checkWin(clickedRow, clickedCol)) {
                setTimeout(() => {
                    alert(`${currentPlayer} wins!`);
                    resetGame();
                }, 100);
            } else if (checkDraw()) {
                setTimeout(() => {
                    alert("It's a draw!");
                    resetGame();
                }, 100);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }
}

function drawMark(row, col, player) {
    ctx.fillStyle = 'white';
    ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(col * squareSize, row * squareSize, squareSize, squareSize);

    ctx.fillStyle = 'black';
    ctx.font = '80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(player, col * squareSize + squareSize / 2, row * squareSize + squareSize / 2);
}

function checkWin(row, col) {
    const player = board[row][col];

    // Check row
    if (board[row].every(cell => cell === player)) return true;

    // Check column
    if (board.every(row => row[col] === player)) return true;

    // Check diagonal
    if (row === col && board.every((row, idx) => row[idx] === player)) return true;

    // Check anti-diagonal
    if (row + col === cols - 1 && board.every((row, idx) => row[cols - 1 - idx] === player)) return true;

    return false;
}

function checkDraw() {
    return board.flat().every(cell => cell !== null);
}

function resetGame() {
    board = Array(rows).fill(null).map(() => Array(cols).fill(null));
    currentPlayer = 'X';
    drawGrid();
}
