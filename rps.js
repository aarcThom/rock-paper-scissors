function getPlayerChoice() {
    needInput = true;

    if (!playerChoice){
            waitMsg(waitInterval, itmChoiceMessage, 200, 0);
    commandLine.textContent = 'What will you choose? Rock, paper, or scissors?';
    }
}

function robotChoice() {
    //clearing out any 'wait for input' messages
    for (let i = 0; i<waitMsgs.length; i++){
        clearTimeout(waitMsgs[i]);
    };
    waitMsgs = [];

    let robotChoice = ['rock','paper','scissors'][Math.floor(Math.random() * 3)];
    let outcome = calcWinner(playerChoice, robotChoice);

    let rbtWaitMsg = ['...', 'Calculating robot choice'];
    waitMsg(waitInterval, rbtWaitMsg, 2, 0);
    waitMsgs.push(setTimeout(() => commandLine.textContent = `You chose ${playerChoice}, and the robot chose ${robotChoice}!`, waitInterval * 3));
    waitMsg(waitInterval, ['...', 'Calculating result', '...', outcome], 1, waitInterval * 4);
    waitMsgs.push(setTimeout(() => scoreLine.textContent = `Player Score: ${score[0]} ||| Robot Score: ${score[1]}`, waitInterval * 5));
    waitMsgs.push(setTimeout(() => statusLine.textContent = '...', waitInterval * 6));
    waitMsgs.push(setTimeout(() => statusLine.textContent = outcome, waitInterval * 7));
    waitMsgs.push(setTimeout(() => statusLine.textContent = 'Reloading match', waitInterval * 9));

    waitMsgs.push(setTimeout(function(){
        if (!score.includes(noRounds)){
            playerChoice = undefined;
            getPlayerChoice();
        } else {
            if (score[0] > score[1]){
                commandLine.textContent = 'You beat the robot! Play again?';
            } else {
                commandLine.textContent = 'The robot won! Play again?';
            }
            statusLine.textContent = '-----------------';
        }
    }, waitInterval * 12));
}

function waitMsg(delay, messageArr, repeats, offset) {

    let repeatArray = Array(repeats).fill(messageArr).flat();

    for (let i = 0; i < repeatArray.length; i++) {
        let addDelay = i * delay + offset;
        waitMsgs.push(setTimeout(() => statusLine.textContent = `${repeatArray[i]}`, addDelay));
    }
}

function calcWinner(pChoice, rChoice) {
    if (rChoice === pChoice) {
        return 'It\'s a tie! Play again!';
    } else {

        let match = pChoice+rChoice;

        switch (match) {
            case 'rockscissors':
                score[0] += 1;
                return'Rock beats scissors! You rock!';
            case 'scissorspaper':
                score[0] += 1;
                return 'Scissors beats paper! You\'re a cut above the rest!';
            case 'paperrock':
                score[0] += 1;
                return 'Paper beats rock! You beat the robot to a pulp!';
            case 'scissorsrock':
                score[1] += 1;
                return 'Rock beats scissors! The robot rocked you!';
            case 'paperscissors':
                score[1] += 1;
                return 'Scissors beats paper! The robot cut you down to size!';
            case 'rockpaper':
                score[1] += 1;
                return 'Paper beats rock! The robot beat you to a pulp!';
        }
    }
}

const gameChoices = ['rock', 'paper', 'scissors']

//the game buttons
const rockBut = document.querySelector('#rockBut');
const paperBut = document.querySelector('#paperBut');
const scissorsBut = document.querySelector('#scissorsBut');

//the command line, statusline, and score line
const commandLine = document.querySelector('#commandLine');
const statusLine = document.querySelector('#statusLine');
const scoreLine = document.querySelector('#score');

//the current player choice
let playerChoice;

//are we prompting for player input?
let needInput = true;

//the bank of wait messages
let waitMsgs = [];
let itmChoiceMessage = ['|','/','--','\\']
//the wait interval
let waitInterval = 750;

//the overall score
let score = [0,0];

//the number of rounds
let noRounds = 3;



//the choice selection buttons
const pSelectButtons = document.querySelectorAll('.selectBut');
pSelectButtons.forEach((e) => {
    e.addEventListener('click', () => {
        if (needInput){
            playerChoice = e.textContent;
            needInput = false;
            commandLine.textContent = `You chose ${playerChoice}!`;
            robotChoice();
        }   
    });
});

//the reset button buttons
const resetBut = document.querySelector('#resetBut');
resetBut.addEventListener('click', () => {
    //clearing out any timeout messages
    for (let i = 0; i<waitMsgs.length; i++){
        clearTimeout(waitMsgs[i]);
    };
    waitMsgs = [];


    playerChoice = undefined;
    needInput = true;
    score = [0,0];
    scoreLine.textContent = "Player Score: 0 ||| Robot Score: 0";
    getPlayerChoice();
});

//main program
getPlayerChoice();