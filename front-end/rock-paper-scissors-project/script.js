function getComputerMove() {
    const randomNum = Math.random();
    if (randomNum < 1/3)
        return 'rock';
    else if (randomNum < 2/3)
        return 'paper';
    else
        return 'scissors';
}

function updateResult(result) {
    const resultElement = document.querySelector('.js-result');
    if (result === 'win')
        resultElement.innerHTML = 'You Win! :)';
    else if (result === 'tie')
        resultElement.innerHTML = 'Tie!';
    else
        resultElement.innerHTML = 'You lose :(';
}

function updateMoves(playerMove, comoputerMove) {
    document.querySelector('.js-moves-container').hidden = false;

    const playerMoveElement = document.querySelector('.js-player-move');
    const computerMoveElement = document.querySelector('.js-computer-move');

    if (playerMove === 'rock') {
        playerMoveElement.src = "rock-emoji.png";
    } else if (playerMove === 'paper') {
        playerMoveElement.src = "paper-emoji.png";
    } else {
        playerMoveElement.src = "scissors-emoji.png";
    }

    if (comoputerMove === 'rock') {
        computerMoveElement.src = "rock-emoji.png";
    } else if (comoputerMove === 'paper') {
        computerMoveElement.src = "paper-emoji.png";
    } else {
        computerMoveElement.src = "scissors-emoji.png";
    }
}

function playMove(playerMove) {
    const computerMove = getComputerMove();
    
    if (playerMove === computerMove)
        updateResult('tie');

    else if (
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    )
        updateResult('win');
    
    else
        updateResult('lose');

    updateMoves(playerMove, computerMove);
}

const emojiBtnElements = document.querySelectorAll('.js-emoji-btn');
emojiBtnElements.forEach((btnElement) => {
    btnElement.addEventListener('click', () => {
        const playerMove = btnElement.dataset.emoji;
        playMove(playerMove);
    });
});