const canvas = document.getElementById("chessCanvas");
const context = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const a = 50;
const b = 50;
const darkSquareColor = "#769656";
const lightSquareColor = "#eeeed2";

canvas.height = 9*a;
canvas.width = 9*b;

function drawSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, a, b);
}

function drawRowA(startingX, startingY) {
    for (let i = 0; i < 8; i++) {
        if (i % 2 === 0) {
            drawSquare(a*i+startingX,startingY,darkSquareColor);
        } else {
            drawSquare(a*i+startingX,startingY,lightSquareColor);
        }
    }
}

function drawRowB(startingX, startingY) {
    for (let i = 0; i < 8; i++) {
        if (i % 2 === 1) {
            drawSquare(a*i+startingX,startingY,darkSquareColor);
        } else {
            drawSquare(a*i+startingX,startingY,lightSquareColor);
        }
    }
}

function drawChessboard(startingX, startingY) {
    for (let i = 0; i < 8; i++) {
        if (i % 2 === 1) {
            drawRowA(startingX,a*i+startingY,darkSquareColor);
        } else {
            drawRowB(startingX,a*i+startingY,lightSquareColor);
        }
    } 
}
drawChessboard(a/2,b/2);
