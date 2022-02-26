let ting = new Audio('ting.mp3');
let gameover = new Audio('gameover.mp3');
let turn = 0;
let res = 0;
let grid = document.querySelectorAll('.box');

let tab = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function resetGrid() {
    let gif = document.getElementById('exicetd-gif');
    gif.classList.add('utility');

    grid.forEach(x => {
        x.innerHTML = '';
    });
    candidate = document.getElementById('candidate');
    document.getElementById('turn-container').innerHTML = 'This is a Turn of <span id="candidate">&nbsp; O </span>';
    turn = 0;
    res = 0;

    for (let i = 0; i < 9; i++)
        tab[i] = 0;
}

function isGameOver() {
    res = 1; // wins
    for (let i = 0; i < 3; i++) {
        if (grid[0 + (3 * i)].textContent == grid[1 + (3 * i)].textContent && grid[1 + (3 * i)].textContent == grid[2 + (3 * i)].textContent &&
            grid[3 * i].textContent != '') {
            return true;
        }
        if (grid[0 + i].textContent == grid[3 + i].textContent && grid[0 + i].textContent == grid[6 + i].textContent && grid[i].textContent != '') {
            return true;
        }
    }
    if (grid[0].textContent == grid[4].textContent && grid[0].textContent == grid[8].textContent && grid[0].textContent != '') {
        return true;
    }
    if (grid[2].textContent == grid[4].textContent && grid[2].textContent == grid[6].textContent && grid[2].textContent != '') {
        return true;
    }
    let check = false;
    for (let i = 0; i < 9; i++) {
        if (grid[i].textContent == '') {
            res = 0; // countinue
            return false;
        }
    }
    res = -1; // draw
    return true;
}


function makeTurn(val) {
    if (turn % 2) {
        grid[val - 1].innerHTML = 'X';
    } else {
        grid[val - 1].innerHTML = 'O';
    }
    turn++;
}

function gameOver() {
    gameover.currentTime = 0;
    gameover.play();

    if (res == -1) {
        document.getElementById('turn-container').innerHTML = 'Match Draw Between <span id="candidate">&nbsp; X & Y </span>';
        turn = 0;
        return;
    }

    for (let i = 0; i < 9; i++)
        tab[i] = 1;

    let gif = document.getElementById('exicetd-gif');
    gif.classList.toggle('utility');

    if (turn % 2 == 0) {
        document.getElementById('turn-container').innerHTML = 'Winner is <span id="candidate">&nbsp; X </span>';
        turn = 0;
    } else {
        document.getElementById('turn-container').innerHTML = 'Winner is <span id="candidate">&nbsp; O </span>';
        turn = 0;
    }
}

function tabclick(val) {
    // tab is already visited.
    if (tab[val - 1] == 1) {
        return;
    }

    tab[val - 1] = 1; // marking tab as marked.
    ting.currentTime = 0;
    ting.play();
    makeTurn(val);
    if (isGameOver()) {
        gameOver();
    } else {
        let candidate = document.getElementById('candidate');
        if (turn % 2 == 0) {
            candidate.innerHTML = '&nbsp;O';
        } else {
            candidate.innerHTML = '&nbsp;X';
        }
    }
}

// ading events to each tab.
for (let i = 0; i < 9; i++) {
    grid[i].addEventListener('click', () => {
        tabclick(i + 1);
    });
}