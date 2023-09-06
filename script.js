/*
 * Name: Nobel Menghis
 * Date: July 13, 2023
 * SECTION: AD
 * TA: Taura Wueger
 * This is the JS file for the game.html in which to implement the UI for
 * for the user to try to find nNaruto by fliping cards within a certain amount
 * of attempts based on the how many time they click on a card and based on the
 * level they chose in which will be shown top right of the screen.
 */

'use strict';

/**
 * Initializes the game by setting up variables and event listeners.
 * This function is also calling it self to run all of the code
 */
(function() {
  let cards = document.querySelectorAll(".overall-card");
  let clickTracker = document.getElementById("click-tracker");
  let isPopupOpen = false;
  let cardClickCount = 0;

  let totalAttempts = 6;
  window.addEventListener("load", init);

  /**
   * Initializes the game by setting up level selection, event listeners, and shuffling the cards.
   * When the page loads this function will be called.
   */
  function init() {
    choosingLevel();
    document.addEventListener("DOMContentLoaded", choosingLevel);
    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener("click", function() {
        winLoseGame(i);
      });
    }
    shuffle();
  }

  /**
   * This function is determines what the user choosing for the level
   * then adjusting the attempt count based on the level they chose.
   */
  function choosingLevel() {
    let selectedLevel = localStorage.getItem("selectedLevel");
    if (selectedLevel === "medium") {
      totalAttempts = 5;
    } else if (selectedLevel === "hard") {
      totalAttempts = 4;
    }
    document.getElementById("total-attempts").textContent = totalAttempts;
  }

  /**
   * Handles the game logic when a card is clicked.
   * @param {number} i - The index of the clicked card.
   * @returns {void}
   */
  function winLoseGame(i) {
    if (isPopupOpen) {
      return;
    }
    cards[i].classList.toggle("is-flipped");
    cardClickCount++;
    clickTracker.textContent = cardClickCount;

    if (cardClickCount >= totalAttempts) {
      showPopup("You lost the game!");
    }
    const isNarutoCard = cards[i]
      .querySelector(".card-back img")
      .src.includes("img/naruto.jpeg");
    if (isNarutoCard) {
      showPopup("Congratulations! You found Naruto!");
    } else {
      setTimeout(function() {
        cards[i].classList.toggle("is-flipped");
        cards[i].style.pointerEvents = "auto";
      }, 1000);
    }
  }

  /**
   * Displays a popup with the specified message.
   * @param {string} message - The message to be displayed in the popup.
   * @returns {void}
   */
  function showPopup(message) {
    let popup = document.createElement("div");
    popup.classList.add("popup");

    let popupMessage = document.createElement("p");
    popupMessage.textContent = message;

    let replayButton = document.createElement("button");
    replayButton.textContent = "Replay";
    replayButton.addEventListener("click", replayGame);

    let homeButton = document.createElement("button");
    homeButton.textContent = "Home";
    homeButton.addEventListener("click", goHome);

    popup.appendChild(popupMessage);
    popup.appendChild(replayButton);
    popup.appendChild(homeButton);

    document.body.appendChild(popup);
    isPopupOpen = true;

    document.body.classList.add("popup-open");
  }

  /**
   * This funcion replays the game by reloading the page and
   * clearing the popup message and reseting the click count.
   */
  function replayGame() {
    cardClickCount = 0;
    clickTracker.textContent = cardClickCount;
    closePopup();
    location.reload();
    shuffle();
  }

  /** This fucntion take the user to the homepage. */
  function goHome() {
    window.location.href = "index.html";
  }

  /** This function closes the popup message when called. */
  function closePopup() {
    let popup = document.querySelector(".popup");
    if (popup) {
      document.body.removeChild(popup);
      isPopupOpen = false;
      cards.forEach((card) => card.addEventListener("click", cards));
      document.body.classList.remove("popup-open");
    }
  }

  /**
   * Shuffles the elements of an array.
   * @param {Array} arr - The array to be shuffled.
   * @returns {Array} - The shuffled array.
   */
  function shuffleArray(arr) {
    let shuffled = [];
    let randomIndex = 0;
    for (let i = 0; i < arr.length; i++) {
      randomIndex = Math.floor(Math.random() * arr.length);
      while (shuffled.indexOf(arr[randomIndex]) !== -1) {
        randomIndex = Math.floor(Math.random() * arr.length);
      }
      shuffled.push(arr[randomIndex]);
    }

    return shuffled;
  }

  /** Shufffles the images of the back of the cards */
  function shuffle() {
    let cardBackImages = document.querySelectorAll(".card-back img");
    let shuffledImages = shuffleArray(Array.from(cardBackImages)).map(
      (image) => image.src
    );
    shuffledImages.forEach(function(src, index) {
      cardBackImages[index].src = src;
    });
  }
})();
