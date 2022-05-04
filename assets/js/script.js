/*jshint esversion: 6 */
/*
Create initial state for game. 
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
gameModal can be shown or hidden depending on the condition of the function
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

/*
The saved user input (stringified in submitScore below) is stringified before set to localstorage and then parsed when retrieving so that it can be sorted. If no array exists yet then one will be created to display the scoreList.
*/
function saveScore(playerName) {
    const scoreList = JSON.parse(window.localStorage.getItem('scoreList')) || [];
    scoreList.push({'player-name': playerName, 'time': state.time});
    scoreList.sort(function(a, b) {
        return a.time - b.time;
    });
    window.localStorage.setItem('scoreList', JSON.stringify(scoreList));
}

/*
The user inputs a required name which is saved to playerName or they can exit modal by clicking outside of the div.
*/
function submitScore() {
    const playerName = document.getElementById('score-name').value;
    saveScore(playerName);
    gameModal.hideModal();
 }

window.onclick = function(event) {
    const modal = document.getElementById('game-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

/*
Event listeners: On click
Start game if start button is clicked.
Reset game if reset button is clicked.
Execute handleCardFlip (flips card) if class card-face is clicked.
*/
window.addEventListener('click', function(event) {
    if (event.target.nodeName === 'BUTTON' && event.target.id === 'start-button') {
        startGame();
    }
    if (event.target.nodeName === 'BUTTON' && event.target.id === 'reset-button') {
        resetGame();
    }
    if(event.target.classList.contains('card-faces')){
        handleCardFlip(event.target.parentNode.parentNode);
    }
});

/*
Event listeners: Submit
Execute handleEnter() if Enter is pressed.
*/
document.getElementById('scoreboard-form').addEventListener('submit', function(event) {
    handleEnter(event);
    event.preventDefault();
});

/*
Submits score and associated name if Enter is pressed on scoreboard-form.
*/
function handleEnter(event) {
    if (gameModal.isOpen) submitScore(event);
}

/*
Start game by shuffling cards, setting isPlaying (defined in initial game state), starting timer, and changing cursor styles.
*/
function startGame() {
    shuffleCards();
    const startButton = document.getElementById('start-button');
    const cardGrid = document.getElementById('card-grid');
    startButton.disabled = true;
    startButton.style.cursor = 'auto';
    cardGrid.style.cursor = 'pointer';
    state.setIsPlaying(true);
    state.startTimer();
}

/*
Reset game by reversing startGame() properties and removing classes added during gameplay (in handleCardFlip function).
*/
function resetGame() {
    const startButton = document.getElementById('start-button');
    const cardGrid = document.getElementById('card-grid');
    const cardCollection = document.getElementsByClassName('card');
    state.resetGame();
    startButton.disabled = false;
    startButton.style.cursor = 'pointer';
    cardGrid.style.cursor = 'auto';
    startButton.innerHTML = 'Start!';
    for (let i = 0; i < cardCollection.length; i++) {
        cardCollection[i].classList.remove('match');
        cardCollection[i].classList.remove('flipped');
      }
}

/*
Timer looks like a digital clock with minutes and seconds.
*/
function formatTime() {
    const hours = Math.floor(state.time / 3600);
    let minutes = Math.floor((state.time - (hours * 3600)) / 60);
    let seconds = state.time - (hours * 3600) - (minutes * 60);

    if (minutes < 10) {minutes = '0'+minutes;}
    if (seconds < 10) {seconds = '0'+seconds;}
    return `${minutes}:${seconds}`;
}

/*
When the card is flipped, the class 'flipped' is added. If it is a match, the 'match' class is added. The function compares the img src to determine if the card is a match. Once 6 matches are found, the timer stops and the game modal opens up. If two cards are not a match, isLocked is toggled (defined in the initial game state) and the timeout function flips the cards back in a second.  
*/
function handleCardFlip(card){
    if(!state.isPlaying) return;
    if(card.classList.contains('match')) return;
    if(state.isLocked) return;

    const previousFlippedCard = document.getElementsByClassName('flipped')[0];

    if(card.isSameNode(previousFlippedCard)) return;

    card.classList.add('flipped');

    if (!previousFlippedCard) return;

    const previousFlippedCardImage = previousFlippedCard.getElementsByTagName('img')[0].getAttribute('src');
    const cardImage = card.getElementsByTagName('img')[0].getAttribute('src');

    if(previousFlippedCardImage === cardImage){
        card.classList.add('match');
        previousFlippedCard.classList.add('match');
        card.classList.remove('flipped');
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
        card.classList.remove('flipped');
        previousFlippedCard.classList.remove('flipped');
        state.toggleIsLocked();
    }, 1000);
}

/*
The card order is set upon initialization of startGame() which calls on shuffleCards() below. The cards are given a random card order depending on the equation randomPosition.
*/
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

/*
The card column is assigned a random card position by executing (applying syle.order) generateCardOrder above. This is then iterated through the array until all cards are assigned a random position. 
*/
function shuffleCards() {
    const cardCollection = document.getElementsByClassName('column');
    const cardOrder = generateCardOrder();
    for (let i = 0; i < cardCollection.length; i++) {
        cardCollection[i].style.order = cardOrder[i];
    }
}