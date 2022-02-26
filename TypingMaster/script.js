let string = "APJ Abdul Kalam is a famous name in the whole world. He is counted among the greatest scientists of the 21st century. Even more, he becomes the 11th president of India and served his country. He was the most valued person of the country as his contribution as a scientist and as a president is beyond compare. Why APJ Abdul Kalam is an inspiration? A P J Abdul Kalam, the missile man of India and former president of India, remains an inspiration for many people across all age groups. His dedication and service towards science and technology was what made him the missile man of the country";

let lasttime = 0;
let gamestart = false;
let finalTime = 0;
const settime = document.getElementById('settime');
const times = document.getElementById('time');
const saveBtn = document.getElementById('timesaver');
const msg = document.getElementById('errormsg');
const rdone = document.getElementById('rdone');
const wdone = document.getElementById('wdone');
const rleft = document.getElementById('rleft');

let begintime = 0;
let firstattemp = false;
const ReadingBoard = document.getElementById('board1');
const WritingBoard = document.getElementById('board2');

const totword = document.getElementById('totword');
const wrngword = document.getElementById('wrngword');

function setTimer() {
    if (saveBtn.value == "Edit") {
        saveBtn.value = 'Save';
        settime.disabled = false;
        WritingBoard.contentEditable = false;
    } else {
        saveBtn.value = "Edit";
        WritingBoard.contentEditable = true;
        settime.disabled = true;
        times.textContent = settime.value;
    }
}
saveBtn.addEventListener('click', setTimer);



rleft.textContent = string;

function gameStart() {
    WritingBoard.removeEventListener('keypress', gameStart);
    saveBtn.disabled = true;
    finalTime = JSON.parse(settime.value);
    window.requestAnimationFrame(main, 0);
}

let event = WritingBoard.addEventListener('keypress', gameStart);

function isgameOver() {
    if (Math.floor(lasttime / 1000) == finalTime) {
        return true;
    }
    return false;
}
let corrects = 0;

function gameEngine() {
    times.textContent = Math.floor(lasttime / 1000 - begintime);
    let rl = WritingBoard.textContent.length;
    let len = WritingBoard.textContent.split(' ').length;
    rdone.textContent = string.substring(0, rl);
    rleft.textContent = string.substring(rl);
    let read = rdone.textContent.split(' ');
    let write = WritingBoard.textContent.split(' ');
    corrects = 0;
    for (let i = 0; i < len; i++) {
        if (read[i] == write[i]) {
            corrects++;
        }
    }
}


function main(ctime) {
    if (!firstattemp) {
        firstattemp = true;
        begintime = Math.floor(ctime / 1000);
        finalTime += begintime;
    }
    if (isgameOver()) {
        WritingBoard.contentEditable = false;
        saveBtn.disabled = false;
        let len = WritingBoard.textContent.split(' ').length;
        // console.log(len);
        totword.textContent = len;
        wrngword.textContent = len - corrects;
        msg.textContent = Math.round(corrects * 60 / (finalTime - begintime));
        document.getElementsByClassName('msg')[0].classList.toggle('utility');
        return;
    }
    window.requestAnimationFrame(main);
    if ((ctime - lasttime) / 1000 < 0.01) {
        return;
    }

    lasttime = ctime;
    gameEngine();
}