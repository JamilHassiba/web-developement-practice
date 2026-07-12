function getComputerMove() {
    const randomNum = Math.random();
    if (randomNum < 1/3)
        return 'rock';
    else if (randomNum < 2/3)
        return 'paper';
    else
        return 'scissors';
}

function playMove(playerMove) {
    const computerMove = getComputerMove();
    
    if (playerMove === computerMove)
        return 'tie';

    else if (
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    )
        return 'win';
    
    return 'lose';
}

const emojiBtnElements = document.querySelectorAll('.js-emoji-btn');
emojiBtnElements.forEach((btnElement) => {
    btnElement.addEventListener('click', () => {
        const playerMove = btnElement.dataset.emoji;
        playMove(playerMove);
    });
});