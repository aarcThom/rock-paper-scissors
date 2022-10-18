function getPlayerChoice() {
    if (!playerChoice){
            waitMsg(1000, itmChoiceMessage, 10);
    commandLine.textContent = 'What will you choose? Rock, paper, or scissors?';
    }
}

function waitMsg(delay, messageArr, repeats) {

    let repeatArray = Array(repeats).fill(messageArr).flat();

    for (let i = 0; i < repeatArray.length; i++) {
        let addDelay = i * delay;
        waitMsgs[i] = setTimeout(() => statusLine.textContent = `${repeatArray[i]}`, addDelay);
    }
}

const gameChoices = ['rock', 'paper', 'scissors']

//the game buttons
const rockBut = document.querySelector('#rockBut');
const paperBut = document.querySelector('#paperBut');
const scissorsBut = document.querySelector('#scissorsBut');

//the command line and statusline
const commandLine = document.querySelector('#commandLine');
const statusLine = document.querySelector('#statusLine');

//the current player choice
let playerChoice;

//are we prompting for player input?
let needInput = true;

//the bank of wait messages
let waitMsgs = [];
let itmChoiceMessage = ['|','/','--','\\']

//the choice selection buttons
const pSelectButtons = document.querySelectorAll('.selectBut');
pSelectButtons.forEach((e) => {
    e.addEventListener('click', () => {
        if (needInput){
            playerChoice = e.textContent;
            for (message in waitMsgs){
                clearTimeout(message);
            };
            waitMsgs = [];
            needInput = false;
            commandLine.textContent = `You chose ${playerChoice}!`;
        }   
    });
});

function mainLoop(){
    if (needInput) {
        getPlayerChoice();
    }
};

mainLoop();