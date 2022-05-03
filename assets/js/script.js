/*jshint esversion: 6 */
/*
The gameModal and timesUp objects are similar in that they give block display to modals that are set to none display until called. gameModal also display the amount of time it took to win and sets it to the local storage. timesUp displays a message that the game has ended due to time out. 
*/
const gameModal = {
    isOpen: false,
    showModal: function showModal() {
        this.isOpen = true;
        document.getElementById('game-modal').style.display = 'block';
        const gameTime = document.getElementsByClassName('game-time');
        gameTime[0].innerHTML = state.time;
    },
    hideModal: function hideModal() {
        this.isOpen = false;
        document.getElementById('game-modal').style.display = 'none';
    }
};

function saveScore(playerName) {
    const scoreList = JSON.parse(window.localStorage.getItem('scoreList')) || [];
    scoreList.push({'player-name': playerName, 'time': state.time});
    scoreList.sort(function(a, b) {
        return a.score - b.score;
    });
    window.localStorage.setItem('scoreList', JSON.stringify(scoreList));
}

 function submitScore(event) {
     event.preventDefault();
     const playerName = document.getElementById('score-name').value;
     saveScore(playerName);
     gameModal.hideModal();
 }

window.onclick = function(event) {
    const modal = document.getElementById("game-modal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

/* 
Create state object. State of the game when opening the page is false, or the game has not started. Time is at zero. When setIsPlaying is playing is called, it will flip the state from false to not false. When incrementTime is called, time will increase by 1.
*/
const state = {
    isPlaying: false,
    isLocked: false,
    matchesFound: 0,
    time: 0,
    timer: undefined,
    setIsPlaying: function setIsPlaying(isPlaying) {
        this.isPlaying = isPlaying;
    },
    incrementTime: function incrementTime() {
        this.time++;
    },
    incrementMatches: function incrementMatches() {
        this.matchesFound++;
    },
    toggleIsLocked: function toggleIsLocked() {
        this.isLocked = !this.isLocked;
    },
    startTimer: function startTimer() {
        this.timer = setInterval(function() {
            state.incrementTime();
            document.getElementById('start-button').innerHTML = formatTime();
        }, 1000);
    },
    stopTimer: function stopTimer() {
        clearInterval(this.timer);
    },
    resetGame: function resetGame() {
        this.setIsPlaying(false);
        this.stopTimer();
        this.time = 0;
        this.matchesFound = 0;
    } 
};

/* 
Event listener activates on click and call an event function that will begin game if the button, which is both button node and start-button, is clicked.
*/
window.addEventListener('click', function(event) {
    if (event.target.nodeName === 'BUTTON' && event.target.id === 'start-button') {
        startGame();
    }
    if (event.target.nodeName === 'BUTTON' && event.target.id === 'reset-button') {
        resetGame();
    }
    console.log(event.target);
    if(event.target.classList.contains('card-faces')){
        handleCardFlip(event.target.parentNode.parentNode);
    }
});

const userInput = document.getElementById('score-name');
userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        handleEnter(event)
      document.getElementById("myBtn").click();
    }
});

function handleEnter(event) {
    if (gameModal.isOpen) submitScore(event);
}

function startGame() {
    shuffleCards();
    const startButton = document.getElementById('start-button');
    startButton.disabled = true;
    startButton.style.cursor = "auto";
    state.setIsPlaying(true);
    state.startTimer();
}

function resetGame() {
    const startButton = document.getElementById('start-button');
    const cardCollection = document.getElementsByClassName('column');
    state.resetGame();
    startButton.disabled = false;
    startButton.style.cursor = "pointer";
    startButton.innerHTML = "Start!";
    for (let i = 0; i < cardCollection.length; i++) {
        cardCollection[i].classList.remove('match');
        cardCollection[i].classList.remove('flipped');
      }
}

/* 
formatTime function has been inspired by https://stackoverflow.com/a/6313008. The hours are determined by the time lapsed of the state object divided by ms per hour and rounded by Math.floor. Minutes is time lapsed of the state object minus the product of number of hours lapsed times number of ms per hour. This is then divided by number of minutes per hour and rounded by Math.floor. Seconds is time lapsed of the state object minus the product of number of hours lapsed times number of ms per hour. The number of seconds times minutes is the subtracted from that product. Minutes and seconds less than the number 10 are given the number 0 to display like an analog clock.
*/
function formatTime() { 
    const hours = Math.floor(state.time / 3600);
    let minutes = Math.floor((state.time - (hours * 3600)) / 60);
    let seconds = state.time - (hours * 3600) - (minutes * 60);

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return `${minutes}:${seconds}`;
}

function handleCardFlip(column){ 
    if(!state.isPlaying) return;
    if(column.classList.contains('match')) return;
    if(state.isLocked) return;

    const previousFlippedCard = document.getElementsByClassName('flipped')[0];

    if(column.isSameNode(previousFlippedCard)) return;
    
    column.classList.add('flipped');

    if (!previousFlippedCard) return;

    const previousFlippedCardImage = previousFlippedCard.getElementsByTagName('img')[0].getAttribute('src');
    const cardImage = column.getElementsByTagName('img')[0].getAttribute('src');

    if(previousFlippedCardImage === cardImage){
        column.classList.add('match');
        previousFlippedCard.classList.add('match');
        column.classList.remove('flipped');
        previousFlippedCard.classList.remove('flipped');
        state.incrementMatches();
        if(state.matchesFound === 6){
            state.stopTimer();
            gameModal.showModal();
        }       
        return;
    }
    state.toggleIsLocked();
    setTimeout(function() {
        column.classList.remove('flipped');
        previousFlippedCard.classList.remove('flipped');
        state.toggleIsLocked();
    }, 1000);
}

function generateCardOrder() {
    const cardDeck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    let currentPosition = cardDeck.length, randomPosition;
    while (currentPosition != 0) {
        randomPosition = Math.floor(Math.random() * currentPosition);
        currentPosition--;
        [cardDeck[currentPosition], cardDeck[randomPosition]] = [
            cardDeck[randomPosition], cardDeck[currentPosition]];
        }
        return cardDeck;
    }

function shuffleCards() {
    const cardCollection = document.getElementsByClassName('card');
    const cardOrder = generateCardOrder();
    for (let i = 0; i < cardCollection.length; i++) {
        cardCollection[i].style.order = cardOrder[i];
    }
}