/*
 * Name: Nobel Menghis
 * Date: July 4, 2023
 * SECTION: AD
 * TA: Taura Wueger
 * This is the JS to implement the UI for when the user is choosing
 * the level they want to play in in which directs them to game.html
 */
'use strict';

window.addEventListener("load", init);

document.getElementById('easyBtn').addEventListener('click', function() {
  selectLevel('easy');
});

document.getElementById('mediumBtn').addEventListener('click', function() {
  selectLevel('medium');
});

document.getElementById('hardBtn').addEventListener('click', function() {
  selectLevel('hard');
});

/**
 * Selects a level.
 * @param {any} level - The level to select.
 * @returns {void}
 */
function selectLevel(level) {
  localStorage.setItem('selectedLevel', level);
  window.location.href = 'game.html';
}

/**
 * Initializes the game by turning on the buttons these buttons are
 *  easy-bt, medium-bt, hard-bt in which the user can choose the difficulty of level
 */
function init() {
  document.getElementById('easy-bt').disabled = false;
  document.getElementById('medium-bt').disabled = false;
  document.getElementById('hard-bt').disabled = false;
}
