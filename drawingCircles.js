const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


const radius = 25;
let x = 100;
let y = 100;

function randomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function randomPosition(lastNum) {
    return Math.floor(Math.random()*lastNum)
}

function drawCircle(x,y, color) {
    context.beginPath();
    context.strokeStyle = color;
    context.arc(x,y,radius, 0, 2 * Math.PI), false;
    context.stroke();
}

function randomCircles(numOfCircles) {
    for (let i = 0; i < numOfCircles; i++) {
        drawCircle(randomPosition(canvas.width), randomPosition(canvas.height), randomColor())
    }
}

randomCircles(1000);
