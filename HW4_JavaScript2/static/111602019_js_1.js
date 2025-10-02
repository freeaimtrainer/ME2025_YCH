document.addEventListener('DOMContentLoaded', function() {

    const guessButton = document.getElementById('guessButton');
    const inputElement = document.getElementById('input_1');
    const timerDisplay = document.getElementById('timerDisplay');

    let randomNumber = Math.floor(Math.random() * 101);
    let guessCount = 0;
    let startTime;
    let timerInterval;

    function checkNumber() {
        const guessNumber = parseInt(inputElement.value, 10);

        if (isNaN(guessNumber) || guessNumber < 0 || guessNumber > 100) {
            alert('請輸入一個介於 0 到 100 的隨機整數。');
            return;
        }

        guessCount++;

        if (guessCount == 1) {
            startTime = new Date().getTime();
            timerInterval = setInterval(updateTimer, 10); 
        }

        if (guessNumber > randomNumber) {
            alert('太大了，請再試一次。');
        } else if (guessNumber < randomNumber) {
            alert('太小了，請再試一次。');
        } else {
            clearInterval(timerInterval);
            alert(`恭喜你，猜對了！你總共猜了 ${guessCount} 次。`);
            startNewGame();
        }

        inputElement.value = '';
        inputElement.focus();
    }

    function updateTimer() {
        const elapsedTime = ((new Date().getTime() - startTime) / 1000).toFixed(2);
        timerDisplay.textContent = `時間：${elapsedTime} 秒`;
    }

    function startNewGame() {
        randomNumber = Math.floor(Math.random() * 101);
        guessCount = 0;
        clearInterval(timerInterval);
        timerDisplay.textContent = '時間: 0.00 秒';
    }

    guessButton.addEventListener('click', checkNumber);

    inputElement.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkNumber();
        }
    });
});