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
}

const emojiBtnElements = document.querySelectorAll('.js-emoji-btn');
emojiBtnElements.forEach((btnElement) => {
    btnElement.addEventListener('click', () => {
        const playerMove = btnElement.dataset.emoji;
        playMove(playerMove);
    });
});