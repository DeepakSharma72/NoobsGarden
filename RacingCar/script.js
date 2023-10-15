const score = document.querySelector('.score');  // score block to display the score.
const startScreen = document.querySelector('.startScreen');  // game menu display in the begining and ending of the game.
const gameArea = document.querySelector('.gameArea');  // gameArea block is displaying highway


// music files used in the game
const gamemusic = new Audio('music.mp3');
const govermusic = new Audio('gameover.mp3');


// this objects set the it's corrosponding property to true based on the key pressed by user
var keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

document.addEventListener('keydown', keyDown); // key press event
document.addEventListener('keyup', keyUp); // key realse event

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}

// player objects stores it's score and speed
let player = { speed: 8, score: 0 };

// onClick game will start
startScreen.addEventListener('click', start);

function start() {
    // erase the game area and draw again
    gameArea.innerHTML = '';

    // reset score 
    player.score = 0;

    // hide the game menu(starting screen)
    startScreen.classList.add('hide');

    // call the gameplay function
    window.requestAnimationFrame(gamePlay);

    // set start to true
    player.start = true;

    // draw the players car in game area
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    // draw the highway line in the game area 
    for (x = 0; x < 4; x++) {
        let roadlines = document.createElement('div');
        roadlines.classList.add('lines');
        roadlines.y = x * 190;
        roadlines.style.top = roadlines.y + "px";
        gameArea.appendChild(roadlines);
    }

    // draw the enemycars in the game area
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

    // set the players location 
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
}


// gameplay function
function gamePlay(ctime) {
    car = document.querySelector('.car');
    let roadspecs = gameArea.getBoundingClientRect();
    let carspecs = car.getBoundingClientRect();
    if (player.start) {
        gamemusic.play();
        window.requestAnimationFrame(gamePlay);
        player.score += 0.03;
        score.innerText = `Your Score:${Math.round(player.score)}`;

        // based on the key pressed by user update the location of player's car
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

        // movelines and enemycars 
        moveLines();
        moveEnemyCars(car);
    }
}


// moves lines function
function moveLines() {
    let roadlines = document.getElementsByClassName('lines');
    let roadspecs = gameArea.getBoundingClientRect();
    for (x = 0; x < 4; x++) {
        // console.log(roadlines[x].y);
        if (roadlines[x].y + player.speed >= roadspecs.height) {
            roadlines[x].y = -100;
        }
        roadlines[x].y = (roadlines[x].y + player.speed);
        roadlines[x].style.top = roadlines[x].y + "px";
    }
}

// moves enemycars function
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
        enemyCars[x].y = (enemyCars[x].y + player.speed);
        enemyCars[x].style.top = enemyCars[x].y + "px";
    }
}

// condition for collision of two cars
function Iscollid(a, b) {
    let cara = a.getBoundingClientRect(); // actual car
    let carb = b.getBoundingClientRect(); // enemy car
    return !(cara.bottom < carb.top || cara.top > carb.bottom || cara.right < carb.left || cara.left > carb.right);
}

// gameover function
function gameOver() {
    govermusic.play();
    gamemusic.pause();
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = `Your Score is:${Math.round(player.score)}<br> Press Here to Restart the game<br> Use Arrow Keys to move car`;
}





