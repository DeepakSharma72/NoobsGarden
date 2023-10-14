// direction objects tells the direction of snake
let direction = { x: 0, y: 0 };

// sounds used in the the games
let foodSound = new Audio('music/food.mp3');
let gameOver = new Audio('music/gameover.mp3');
let move = new Audio('music/move.mp3');
let gameMusic = new Audio('music/music.mp3');

// location of the food in the snake board
let food = { x: 6, y: 3 };

// this array contains the board locations in which snake body is present
let snakebody = [{ x: 16, y: 13 }];


let lastPaintTime = 0, paintIntervalTime = 100;

// snake board
let board = document.getElementsByClassName('board');



function isCollid() {
    if (snakebody[0].x == 0 || snakebody[0].x == 25 || snakebody[0].y == 0 || snakebody[0].y == 20) {
        return true;
    }
    let n = snakebody.length;
    for (let i = 1; i < n; i++) {
        if ((snakebody[i].x === snakebody[0].x && snakebody[i].y === snakebody[0].y)) {
            return true;
        }
    }
    return false;
}

// snake board dimension
let r1 = 2,
    r2 = 19;
let c1 = 2,
    c2 = 23;

// stores the game score
let score = 0;

function gameEngine() {

    //case1:  game is over
    if (isCollid()) {
        gameOver.play();
        gameMusic.pause();
        direction = { x: 0, y: 0 };
        alert('Game is over! You Scored: ' + score);
        snakebody = [{ x: 16, y: 13 }];
        food = { x: 6, y: 3 };
        score = 0;
        document.getElementById('scoreRecord').innerHTML = '0';
        return;
    }

    //case2: snake head is at food location 
    if (snakebody[0].x === food.x && snakebody[0].y == food.y) {

        foodSound.play();

        // increase the score
        if (score % 40 == 0 && score != 0) {
            score += 20;
        } else {
            score += 5;
        }

        // display the updated score
        document.getElementById('scoreRecord').innerHTML = `${score}`;

        // append the one more block to snake body array in the starting and in the direction in which snake is moving 
        snakebody.unshift({ x: food.x + direction.x, y: food.y + direction.y });

        // generate new food at random location
        food = { x: Math.round(c1 + (c2 - c1) * Math.random()), y: Math.round(r1 + (r2 - r1) * Math.random()) };
    }

    // => moves the snake body.
    let n = snakebody.length;
    for (let i = n - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1];
    }
    snakebody[0] = { x: snakebody[0].x + direction.x, y: snakebody[0].y + direction.y };


    // -> displaying snake on snake board
    board[0].innerHTML = '';
    snakebody.forEach((ele, ind) => {
        let snakeEle = document.createElement('div');
        snakeEle.style.gridRowStart = ele.y;
        snakeEle.style.gridColumnStart = ele.x;
        if (ind == 0) {
            snakeEle.classList.add('head');
        } else {
            snakeEle.classList.add('snake');
        }
        board[0].appendChild(snakeEle);
    });

    // -> displaying food on snake board
    let foodEle = document.createElement('div');
    foodEle.style.gridRowStart = food.y;
    foodEle.style.gridColumnStart = food.x;
    if (score % 40 == 0 && score != 0) {
        foodEle.classList.add('special-food');
    } else {
        foodEle.classList.add('food');
    }
    board[0].appendChild(foodEle);
}

function main(ctime) {
    window.requestAnimationFrame(main);

    // if interval is less than paintIntervalTime then do nothing
    if ((ctime - lastPaintTime) < paintIntervalTime) {
        return;
    }

    lastPaintTime = ctime;
    gameEngine();
}
window.requestAnimationFrame(main);



// handling key press events and accordingly changing the direction
window.addEventListener('keydown', (e) => {
    direction.x = 0, direction.y = 1;
    move.play();
    if (gameMusic.play()) {
        gameMusic.play();
        gameMusic.volume = 0.2;
    }
    // console.log(e.key);
    switch (e.key) {
        case "ArrowDown":
            direction.x = 0, direction.y = 1;
            break;
        case "ArrowUp":
            direction.x = 0, direction.y = -1;
            break;
        case "ArrowLeft":
            direction.x = -1, direction.y = 0;
            break;
        case "ArrowRight":
            direction.x = 1, direction.y = 0;
            break;
        default:
            break;
    }
});