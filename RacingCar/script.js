const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const gamemusic = new Audio('music.mp3');
const govermusic = new Audio('gameover.mp3');

var keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
let player = { speed: 8, score: 0 };
startScreen.addEventListener('click', start);


function moveLines() {
    let roadlines = document.getElementsByClassName('lines');
    let roadspecs = gameArea.getBoundingClientRect();
    for (x = 0; x < 4; x++) {
        // console.log(roadlines[x].y);
        if (roadlines[x].y + player.speed >= roadspecs.height) {
            roadlines[x].y = -100;
        }
        roadlines[x].style.top = (roadlines[x].y + player.speed) % roadspecs.height + "px";
        roadlines[x].y = (roadlines[x].y + player.speed) % roadspecs.height;
    }
}


function gameOver() {
    govermusic.play();
    gamemusic.pause();
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = `Your Score is:${Math.round(player.score)}<br> Press Here to Restart the game<br> Use Arrow Keys to move car`;
}

function moveEnemyCars(car) {
    let roadspecs = gameArea.getBoundingClientRect();
    let enemyCars = document.getElementsByClassName('enemy');
    for (x = 0; x < 3; x++) {
        if (Iscollid(car, enemyCars[x])) {
            gameOver();
        }
        if (enemyCars[x].y + player.speed >= roadspecs.height) {
            enemyCars[x].y = -300;
            enemyCars[x].style.left = Math.floor(Math.random() * (roadspecs.width - 71)) + "px";
        }
        enemyCars[x].style.top = (enemyCars[x].y + player.speed) + "px";
        enemyCars[x].y = (enemyCars[x].y + player.speed);
    }

}

function gamePlay(ctime) {
    car = document.querySelector('.car');
    let roadspecs = gameArea.getBoundingClientRect();
    let carspecs = car.getBoundingClientRect();
    if (player.start) {
        gamemusic.play();
        window.requestAnimationFrame(gamePlay);
        player.score += 0.03;
        score.innerText = `Your Score:${Math.round(player.score)}`;
        if (keys['ArrowUp'] && player.y > carspecs.height + 20) {
            player.y -= player.speed;
        } else if (keys['ArrowDown'] && player.y < roadspecs.height - carspecs.height) {
            player.y += player.speed;
        } else if (keys['ArrowLeft'] && player.x > 0) {
            player.x -= player.speed;
        } else if (keys['ArrowRight'] && player.x < roadspecs.width - carspecs.width - 21) {
            player.x += player.speed;
        }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        moveLines();
        moveEnemyCars(car);

    }
}

function Iscollid(a, b) {
    let cara = a.getBoundingClientRect(); // actual car
    let carb = b.getBoundingClientRect(); // enemy car
    return !(cara.bottom < carb.top || cara.top > carb.bottom || cara.right < carb.left || cara.left > carb.right);
}

function start() {
    gameArea.innerHTML = '';
    player.score = 0;
    startScreen.classList.add('hide');
    window.requestAnimationFrame(gamePlay);
    player.start = true;
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    // car.innerText = 'Hey I am car';
    gameArea.appendChild(car);

    for (x = 0; x < 4; x++) {
        let roadlines = document.createElement('div');
        roadlines.classList.add('lines');
        roadlines.y = x * 190;
        roadlines.style.top = roadlines.y + "px";
        gameArea.appendChild(roadlines);
    }

    for (x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.classList.add('enemy');
        enemyCar.y = (x + 1) * 350 * -1;
        enemyCar.style.top = enemyCar.y + "px";
        let roadspecs = gameArea.getBoundingClientRect();
        let carspecs = car.getBoundingClientRect();
        enemyCar.style.left = Math.floor(Math.random() * (roadspecs.width - carspecs.width)) + "px";
        gameArea.appendChild(enemyCar);
    }


    player.x = car.offsetLeft;
    player.y = car.offsetTop;
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(keys);
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}