let direction = { x: 0, y: 0 };
let foodSound = new Audio('music/food.mp3');
let gameOver = new Audio('music/gameover.mp3');
let move = new Audio('music/move.mp3');
let gameMusic = new Audio('music/music.mp3');

let food = { x: 6, y: 3 };

let snakebody = [{ x: 16, y: 13 }];
let lastPaintTime = 0;

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

let r1 = 2,
    r2 = 19;
let c1 = 2,
    c2 = 23;
let score = 0;

function gameEngine() {
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

    if (snakebody[0].x === food.x && snakebody[0].y == food.y) {
        foodSound.play();
        if (score % 40 == 0 && score != 0) {
            score += 20;
        } else {
            score += 5;
        }
        document.getElementById('scoreRecord').innerHTML = `${score}`;
        snakebody.unshift({ x: food.x + direction.x, y: food.y + direction.y });
        food = { x: Math.round(c1 + (c2 - c1) * Math.random()), y: Math.round(r1 + (r2 - r1) * Math.random()) };
    }

    // 1. update the snake and food.
    let n = snakebody.length;
    for (let i = n - 1; i > 0; i--) {
        let temp = snakebody[i - 1];
        snakebody[i] = snakebody[i - 1];
    }
    snakebody[0] = { x: snakebody[0].x + direction.x, y: snakebody[0].y + direction.y };


    // 2. display the snake and food.

    // -> displaying snake
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

    // -> displaying food
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
    if ((ctime - lastPaintTime) / 1000 < 0.2) {
        return;
    }
    // console.log(ctime / 1000);
    lastPaintTime = ctime;
    gameEngine();
}

window.requestAnimationFrame(main);



window.addEventListener('keydown', (e) => {
    direction.x = 0, direction.y = 1;
    move.play();
    if (gameMusic.play()) {
        gameMusic.play();
        gameMusic.volume = 0.2;
    }
    console.log(e.key);
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