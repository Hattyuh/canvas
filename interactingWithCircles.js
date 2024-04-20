const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

class Mouse {
    _x;
    _y;
    
    constructor(x, y) {
        this.setX(x);
        this.setY(y);
    }

    setX(x) {
        this._x = x;
    }

    getX() {
        return this._x;
    }

    setY(y) {
        this._y = y;
    }

    getY() {
        return this._y;
    }
}

const myMouse = new Mouse;

addEventListener("mousemove", (event) => {
    myMouse.setX(event.clientX);
    myMouse.setY(event.clientY);
    console.log(myMouse);
}
);

addEventListener("resize", () => {
    init();
}
);

const MAX_RADIUS = 50;
const AVAILABLE_COLORS = []

class Circle {
    _radius;
    _positionX;
    _positionY;
    _movementX;
    _movementY;
    _color;
    _minRadius;
    _maxRadius;

    constructor(radius, positionX, positionY, movementX, movementY, color){
        this.setRadius(radius);
        this.setPositionX(positionX);
        this.setPositionY(positionY);
        this.setMovementX(movementX);
        this.setMovementY(movementY);
        this.setColor(color);
        this.setMinRadius();
        this._maxRadius = MAX_RADIUS;
    }

    getRadius(){
        return this._radius
    }

    setRadius(radius){
        this._radius = radius;
    }

    getPositionX(){
        return this._positionX;
    }

    setPositionX(positionX){
        this._positionX = positionX;
    }

    getPositionY(){
        return this._positionY;
    }

    setPositionY(positionY){
        this._positionY = positionY;
    }

    getMovementX(){
        return this._movementX;
    }

    setMovementX(movementX){
        this._movementX = movementX;
    }

    getMovementY(){
        return this._movementY;
    }

    setMovementY(movementY){
        this._movementY = movementY;
    }
    getColor(){
        return this._color
    }

    setColor(color){
        this._color = color;
    }

    getMinRadius(){
        return this._minRadius;
    }

    setMinRadius(){
        this._minRadius = Math.floor(Math.random()*5+1);
    }

    draw() {
        context.beginPath();
        context.strokeStyle = this._color;
        context.arc(this._positionX,this._positionY,this._radius, 0, 2 * Math.PI), false;
        context.stroke();
        context.fillStyle = this._color;
        context.fill();
    }

    update(){
        this.draw()
        this.setPositionX(this._positionX+this._movementX);
        this.setPositionY(this._positionY+this._movementY);  
        this.bounce(this._positionX, this._positionY)
        
        if (myMouse.getX() - this._positionX < 50 
            && myMouse.getX() - this._positionX > -50 
            && myMouse.getY() - this._positionY < 50 
            && myMouse.getY() - this._positionY > -50) {
            if (this._radius < this._maxRadius){
                this.grow();
            } 
        } else if (this._radius > this._minRadius) {
            this.shrink();
        }

    }

    bounce(positionX, positionY){
        if (positionX+this._radius > innerWidth || positionX-this._radius < 0) {
            this.setMovementX(this._movementX *= -1);
            this.setColor(randomColor());
            
        }
        if (positionY+this._radius > innerHeight || positionY-this._radius < 0) {
            this.setMovementY(this._movementY *= -1);
            this.setColor(randomColor());
        }
    } 

    grow(){
        this._radius += 1;    
    }

    shrink(){
        this._radius -= 1;    
    }

}

function randomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function randomPosition(lastNum) {
    let randomNum = Math.random()*lastNum;
    if (randomNum < MAX_RADIUS){
        randomNum += MAX_RADIUS;
    }
    if (randomNum > innerWidth-MAX_RADIUS || randomNum > innerHeight-MAX_RADIUS ){
        randomNum -= MAX_RADIUS;
    }
    return randomNum;
}

function randomDirection(){
    return (Math.random()-0.5)*2 ;
}

const numOfCircles = 5000;
const size = Math.floor(Math.random()*5+1);
let circleArr = [];
function init(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    circleArr = [];
    for (let i = 0; i < numOfCircles; i++){
        const posX = randomPosition(innerWidth);
        const posY = randomPosition(innerHeight);
        const movX = randomDirection();
        const movY = randomDirection();
        const color = randomColor();
        circleArr.push(new Circle(size, posX, posY, movX, movY, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArr.length; i++){
        circleArr[i].update();
    }
}

init();
animate();