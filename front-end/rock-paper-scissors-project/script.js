const score = JSON.parse(localStorage.getItem('score'));
if (!score){
    localStorage.setItem('score', JSON.stringify({
        wins: 0,
        ties: 0,
        losses: 0
    }));
}
updateScoreElement();

function playMove(playerMove) {
    const computerMove = getComputerMove();
    
    if (playerMove === computerMove) {
        updateResultElement('tie');
        updateScore('tie');
    } else if (
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        updateResultElement('win');
        updateScore('win');
    } else {
        updateResultElement('loss');
        updateScore('loss');
    }

    updateMovesElement(playerMove, computerMove);
}

document.querySelectorAll('.js-emoji-btn').forEach((btnElement) => {
    btnElement.addEventListener('click', () => {
        const playerMove = btnElement.dataset.emoji;
        playMove(playerMove);
    });
});

document.querySelector('.js-reset-btn').addEventListener('click', () => {
    localStorage.setItem('score', JSON.stringify({
        wins: 0,
        ties: 0,
        losses: 0
    }));
    updateScoreElement();
});

function getComputerMove() {
    const randomNum = Math.random();
    if (randomNum < 1/3)
        return 'rock';
    else if (randomNum < 2/3)
        return 'paper';
    else
        return 'scissors';
}

function updateResultElement(result) {
    const resultElement = document.querySelector('.js-result');
    if (result === 'win')
        resultElement.innerHTML = 'You Win! :)';
    else if (result === 'tie')
        resultElement.innerHTML = 'Tie!';
    else
        resultElement.innerHTML = 'You lose :(';
}

function updateMovesElement(playerMove, comoputerMove) {
    document.querySelector('.js-moves-container').hidden = false;

    const playerMoveElement = document.querySelector('.js-player-move');
    const computerMoveElement = document.querySelector('.js-computer-move');

    if (playerMove === 'rock') {
        playerMoveElement.src = "assets/rock-emoji.png";
    } else if (playerMove === 'paper') {
        playerMoveElement.src = "assets/paper-emoji.png";
    } else {
        playerMoveElement.src = "assets/scissors-emoji.png";
    }

    if (comoputerMove === 'rock') {
        computerMoveElement.src = "assets/rock-emoji.png";
    } else if (comoputerMove === 'paper') {
        computerMoveElement.src = "assets/paper-emoji.png";
    } else {
        computerMoveElement.src = "assets/scissors-emoji.png";
    }
}

function updateScoreElement() {
    const score = JSON.parse(localStorage.getItem('score'));
    const scoreElement = document.querySelector('.js-score');
    scoreElement.textContent = `Wins: ${score.wins}, ties: ${score.ties}, Losses: ${score.losses}`;
}

function updateScore(result) {
    const score = JSON.parse(localStorage.getItem('score'));

    if (result === 'win')
        score.wins++;
    else if (result === 'tie')
        score.ties++;
    else
        score.losses++;

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();
}
