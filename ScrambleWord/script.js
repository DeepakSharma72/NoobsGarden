let arr = ["alpha", "bravo", "circle", "dummy", "dream", "elegant", "emerge", "furious", "font", "groom", "guilt", "guide"];
let gameword;
let swordpos = document.getElementById('s-word-space');
const hint = document.getElementById('hint');
let inputword = document.getElementById('r-word-space');
let submit_btn = document.getElementById('submit-btn');
let final_msg = document.getElementById('final-msg');

let clickSound = new Audio('click.wav');
let winSound = new Audio('wining.wav');
let wrongAnswerSound = new Audio('wrongAnswer.mp3');

submit_btn.addEventListener('click', () => {
    clickSound.play();
    if (submit_btn.value == "Guess") {
        final_msg.classList.remove('utility');
        hint.classList.add('utility');
        if (inputword.value == gameword) {
            final_msg.textContent = 'Hurre! Your Guess is right :)';
            submit_btn.value = "Try Next";
            winSound.play();
        } else {
            if (inputword.value == '') {
                final_msg.textContent = 'Empty Field!';
            } else {
                final_msg.textContent = 'Wrong Guess! Try Again';
            }
            wrongAnswerSound.play();
            submit_btn.value = "Retry";
        }
    } else if (submit_btn.value == "Retry") {
        final_msg.classList.add('utility');
        hint.classList.remove('utility');
        submit_btn.value = "Guess";
    } else if (submit_btn.value == 'Try Next') {
        final_msg.classList.add('utility');
        hint.classList.remove('utility');
        submit_btn.value = "Guess";
        inputword.value = "";
        hint.innerHTML = 'Press Here for Hint';
        renewWord();
    }
});


hint.addEventListener('click', () => {
    hint.innerHTML = `word start with '<em>${gameword[0]}</em>' and end with '<em>${gameword[gameword.length-1]}</em>'`;
});

let scrambleWord = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let j = Math.floor(Math.random() * arr.length);
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    swordpos.textContent = arr.join('');
};


function renewWord() {
    let ind = Math.floor(Math.random() * arr.length);
    scrambleWord(arr[ind].split(''));
    gameword = arr[ind];
}

window.addEventListener('load', renewWord);