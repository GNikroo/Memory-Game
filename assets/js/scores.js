/*jshint esversion: 6 */
function showAddedScores() {
    let scoreList = JSON.parse(window.localStorage.getItem('scoreList')) || [];
    let scoreboard = document.getElementById('scoreboard');
    const length = Math.min(scoreList.length, 10);
    for (let i = 0; i < length; i++) {
        const playerName = document.createTextNode(scoreList[i]['player-name']);
        const time = document.createTextNode(scoreList[i].time);
        const li = document.createElement('li');
        const pinkSpan = document.createElement('span');
        const blueSpan = document.createElement('span');
        pinkSpan.appendChild(playerName);
        li.appendChild(pinkSpan);
        blueSpan.appendChild(time);
        li.appendChild(blueSpan);
        scoreboard.appendChild(li);    
    }
}
showAddedScores();