var scores, rounScore, activPlayer, gameplaying;
init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gameplaying) {
    //1.random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2.display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "img/dice-" + dice + ".png";

    //3.Update the round score If the rolled number was NOT a 1
    if (dice !== 1) {
      //add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activPlayer
      ).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gameplaying) {
    //Add Current Score to GloBal score
    scores[activPlayer] += roundScore;
    //Update the UI
    document.querySelector("#score-" + activPlayer).textContent =
      scores[activPlayer];
    //Check if player won the game
    if (scores[activPlayer] >= 50) {
      document.querySelector("#name-" + activPlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activPlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activPlayer + "-panel")
        .classList.remove("active");
      gameplaying = false;
    } else {
      nextPlayer();
    }
    //Next player
  }
});

function nextPlayer() {
  activPlayer === 0 ? (activPlayer = 1) : (activPlayer = 0);
  console.log(activPlayer);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}
document.querySelector(".btn-new").addEventListener("click", function() {
  init();
});

function init() {
  scores = [0, 0];
  roundScore = 0;
  activPlayer = 0;
  gameplaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "player 1";
  document.getElementById("name-1").textContent = "player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
