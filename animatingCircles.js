const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


class Circle {
    _radius;
    _positionX;
    _positionY;
    _movementX;
    _movementY;
    _color;

    constructor(radius, positionX, positionY, movementX, movementY, color){
        this.setRadius(radius);
        this.setPositionX(positionX);
        this.setPositionY(positionY);
        this.setMovementX(movementX);
        this.setMovementY(movementY);
        this.setColor(color);
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

    draw() {
        context.beginPath();
        context.strokeStyle = this._color;
        context.arc(this._positionX,this._positionY,this._radius, 0, 2 * Math.PI), false;
        context.stroke();
        
    }

    update(){
        this.draw()
        this.setPositionX(this._positionX+this._movementX);
        this.setPositionY(this._positionY+this._movementY);  
        this.bounce(this._positionX, this._positionY)
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

    
}

function randomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function randomPosition(lastNum) {
    let randomNum = Math.random()*lastNum;
    if (randomNum < size){
        randomNum += size;
    }
    if (randomNum > innerWidth-size || randomNum > innerHeight-size ){
        randomNum -= size;
    }
    return randomNum;
}

function randomDirection(){
    return (Math.random()-0.5)*2 ;
}

const size = 50;
// const circle1 = new Circle(size,randomPosition(innerWidth),randomPosition(innerHeight),5,5,randomColor());
const circleArr = [];
for (let i = 0; i < 100; i++){
    const posX = randomPosition(innerWidth);
    const posY = randomPosition(innerHeight);
    const movX = randomDirection();
    const movY = randomDirection();
    const color = randomColor();
    circleArr.push(new Circle(size, posX, posY, movX, movY, color));
}
function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArr.length; i++){
        circleArr[i].update();
    }
}

animate();