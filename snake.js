
// board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

let snakeX;
let snakeY;
let velocityX ;
let velocityY;
var snakeBody = [];
let foodX;
let foodY;

let gameOver = false;

window.onload = function() {
    init();
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    // used to draw onto board
    context = board.getContext("2d");

    document.addEventListener('keydown', input);
    setInterval(update, 1000/10); // 100 milliseconds
}


function update() {
    if (gameOver) {
        context.fillStyle = "white";
        context.textAlign = "center";
        context.font = "30px Helvetica, sans-serif";
        context.fillText("Press [Space] to play again!",board.width/2,board.height/2);
        return;
    }
    // background
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // update body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX,snakeY];
    }

    // move snake
    snakeX += velocityX;
    snakeY += velocityY;

    // handle game over
    if (snakeX < 0 || snakeX >= cols || snakeY < 0 || snakeY >= rows) {
        gameOver = true;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i][0] == snakeX && snakeY == snakeBody[i][1]) {
            gameOver = true;
        }
    }

    // eating apple
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([snakeX, snakeY])
        placeFood();
    }

    // draw snake
    context.fillStyle = "lime";
    context.fillRect(snakeX * blockSize, snakeY * blockSize, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0] * blockSize, snakeBody[i][1] * blockSize, blockSize, blockSize);
    }

    // draw apple
    context.fillStyle = "red";
    context.fillRect(foodX * blockSize, foodY * blockSize, blockSize, blockSize);
}


function input(e) {
    if (gameOver && e.code == "Space") {
        init();
        return;
    }
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols);
    foodY = Math.floor(Math.random() * rows);
}


function init() {
    // snake head
    snakeX = 6;
    snakeY = 10;

    velocityX = 0;
    velocityY = 0;

    // snake body
    snakeBody = [];

    // food
    foodX = 12;
    foodY = 10;

    gameOver = false;
}