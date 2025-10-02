document.addEventListener('DOMContentLoaded', function() {

    const guessButton = document.getElementById('guessButton');
    const inputElement = document.getElementById('input_1');
    const timerDisplay = document.getElementById('timerDisplay');
    const messageArea = document.getElementById('messageArea');
    const logContainer = document.getElementById('logContainer');

    let randomNumber;
    let guessCount;
    let startTime;
    let timerInterval;
    let gameRound = 1;

    startNewGame();

    function startNewGame() {
        randomNumber = Math.floor(Math.random() * 101);
        guessCount = 0;
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        timerDisplay.textContent = '時間：0.00 秒';
        messageArea.textContent = '';
    }

    function checkNumber() {
        const guessNumber = parseInt(inputElement.value, 10);

        if (isNaN(guessNumber) || guessNumber < 0 || guessNumber > 100) {
            messageArea.textContent = '請輸入一個介於 0 到 100 的有效整數。';
            inputElement.value = '';
            inputElement.focus();
            return;
        }

        messageArea.textContent = '';
        guessCount++;

        if (guessCount === 1) {
            startTime = new Date().getTime();
            timerInterval = setInterval(updateTimer, 10);
        }

        if (guessNumber > randomNumber) {
            messageArea.textContent = '太大了，請再試一次。';
        } else if (guessNumber < randomNumber) {
            messageArea.textContent = '太小了，請再試一次。';
        } else {
            clearInterval(timerInterval);
            const timeTaken = ((new Date().getTime() - startTime) / 1000).toFixed(2);
            alert(`猜中了！共猜了 ${guessCount} 次，花了 ${timeTaken} 秒。`);

            const logEntry = document.createElement('p');
            const completionTime = new Date().toLocaleTimeString();
            logEntry.textContent = `${gameRound}. 猜了 ${guessCount} 次，耗時 ${timeTaken} 秒，${completionTime}`;
            logContainer.appendChild(logEntry);
            gameRound++;

            startNewGame();
        }

        inputElement.value = '';
        inputElement.focus();

    }

    function updateTimer() {
        const elapsedTime = ((new Date().getTime() - startTime) / 1000).toFixed(2);
        timerDisplay.textContent = `時間: ${elapsedTime} 秒`;
    }

    guessButton.addEventListener('click', checkNumber);

    inputElement.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkNumber();
        }
    });
});