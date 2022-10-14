const gameChoices = ['rock', 'paper', 'scissors']

function getCompChoice() {
    let randInt = Math.round(Math.random() * 2);
    return gameChoices[randInt];
}

function getPlayerChoice() {
    return prompt('Do you choose: rock, paper, or scissors?').toLowerCase();
}

function gameRound() {
    let pChoice = getPlayerChoice();
    let cChoice = getCompChoice();
    
    if (!gameChoices.includes(pChoice)) {
        alert('You entered and incorrect value! Please re-enter your choice.');
        return [0 ,0];
    } 

    alert(`The robot chose ${cChoice}!`);

    if (pChoice === cChoice) {
        alert(`You both chose ${pChoice}!`);
        return [0, 0];
    } else {
        let match = pChoice+cChoice;

        switch (match) {
            case 'rockscissors':
                alert('Rock beats scissors! You rock!');
                return [1, 0];
            case 'scissorspaper':
                alert('Scissors beats paper! You\'re a cut above the rest!');
                return [1, 0];
            case 'paperrock':
                alert('Paper beats rock! You beat the robot to a pulp!');
                return [1, 0];
            case 'scissorsrock':
                alert('Rock beats scissors! The robot rocked you!');
                return [0, 1];
            case 'paperscissors':
                alert('Scissors beats paper! The robot cut you down to size!');
                return [0, 1];
            case 'rockpaper':
                alert('Paper beats rock! The robot beat you to a pulp!');
                return [0, 1];
        }
    }

}

function mainLoop() {
    let scoreCard = [0, 0];
    while (!scoreCard.includes(5)){
        let scoreUpdate = gameRound();
        scoreCard = scoreCard.map((a, i) => a + scoreUpdate[i]);

        if (scoreCard[0] === 5) {
            alert(`You beat the robot ${scoreCard[0]} to ${scoreCard[1]}!`)
        } else if (scoreCard[1] === 5) {
            alert(`The robot beat you ${scoreCard[1]} to ${scoreCard[0]}!`)
        } else {
            alert(`The score is ${scoreCard[0]} to ${scoreCard[1]}`);
        }  
    }
}

mainLoop();