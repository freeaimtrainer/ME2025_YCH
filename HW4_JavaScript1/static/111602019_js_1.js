
document.addEventListener('DOMContentLoaded', function() {

    const guessButton = document.getElementById('guessButton');
    const inputElement = document.getElementById('input_1');

    let randomNumber = Math.floor(Math.random() * 101);
    let guessCount = 0;

    function checkNumber() {
        const guessNumber = parseInt(inputElement.value, 10);

        if (isNaN(guessNumber) || guessNumber < 0 || guessNumber > 100) {
            alert('請輸入一個介於 0 到 100 的隨機整數。');
            return;
        }

        guessCount++;

        if (guessNumber > randomNumber) {
            alert('太大了，請再試一次。');
        } else if (guessNumber < randomNumber) {
            alert('太小了，請再試一次。');
        } else {
            alert(`恭喜你，猜對了！你總共猜了 ${guessCount} 次。`);
            startNewGame();
        }

        inputElement.value = '';
        inputElement.focus(); 
    }

    function startNewGame() {
        secretNumber = Math.floor(Math.random() * 101);
        guessCount = 0;
    }

    guessButton.addEventListener('click', checkNumber);

    inputElement.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkNumber();
        }
    });
});