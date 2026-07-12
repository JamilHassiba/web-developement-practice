function computerMove() {
    const randomNum = Math.random();
    if (randomNum < 1/3) {
        return 'rock';
    } else if (randomNum < 2/3) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

const emojiBtnElements = document.querySelectorAll('.js-emoji-btn');
emojiBtnElements.forEach((btnElement) => {
    btnElement.addEventListener('click', () => {
        const playerMove = btnElement.dataset.emoji;
        console.log(playerMove);
    });
});