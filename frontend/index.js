import { LEVEL, OBJECT_TYPE } from './pacman-setup';
import { randomMovement } from './ghost-moves';
// Classes
import GameBoard from './game-board';
import Pacman from './pacman';
import Ghost from './ghost';
import $ from "jquery";
// Sounds
import soundDot from './sounds/munch.wav';
import soundPill from './sounds/pill.wav';
import soundGameStart from './sounds/game_start.wav';
import soundGameOver from './sounds/death.wav';
import soundGhost from './sounds/eat_ghost.wav';
// Dom Elements
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');

// Game constants
const POWER_PILL_TIME = 10000; // ms
const GLOBAL_SPEED = 80; // ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);
// Initial setup
let status = "highscore"
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;
let pacman = null;
let ghosts = null;
let userName = "";

// --- AUDIO --- //
function playAudio(audio) {
  const soundEffect = new Audio(audio);
  soundEffect.play();
}

// --- GAME CONTROLLER --- //
function gameOver() {
  status = 'gameOver';
  playAudio(soundGameOver);

  clearInterval(timer);
  document.removeEventListener('keydown', (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
  );

  $('#gameOverScreen').addClass('is-active');
  $("#gameOverTitle").html(gameWin ? "You won!!!!" : "Game OVer");
  $("#gameOverScore").html(score);

  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/highscore',
    data: JSON.stringify({ user: userName, score: score }),
    contentType: "application/json",
    dataType: 'json',
    complete: function () {
      $.ajax({
        url: "http://localhost:8080/highscore/" + userName
      }).then(function (data) {
        $("#gameOverBestScore").html(score);
        $("#gameOverBestDate").html(data.formattedDateTime);
      });
    }
  });
}

function checkCollision() {
  const collidedGhost = ghosts.find((ghost) => pacman.pos === ghost.pos);

  if (collidedGhost) {
    if (pacman.powerPill) {
      playAudio(soundGhost);
      gameBoard.removeObject(collidedGhost.pos, [
        OBJECT_TYPE.GHOST,
        OBJECT_TYPE.SCARED,
        collidedGhost.name
      ]);
      collidedGhost.pos = collidedGhost.startPos;
      score += 100;
    } else {
      gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
      gameBoard.rotateDiv(pacman.pos, 0);
      gameOver(gameGrid);
    }
  }
}

function gameLoop() {
  // 1. Move Pacman
  gameBoard.moveCharacter(pacman);
  // 2. Check Ghost collision on the old positions
  checkCollision();
  // 3. Move ghosts
  ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
  // 4. Do a new ghost collision check on the new positions
  checkCollision();
  // 5. Check if Pacman eats a dot
  if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
    playAudio(soundDot);

    gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
    // Remove a dot
    gameBoard.dotCount--;
    // Add Score
    score += 10;
  }
  // 6. Check if Pacman eats a power pill
  if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
    playAudio(soundPill);

    gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);

    pacman.powerPill = true;
    score += 50;

    clearTimeout(powerPillTimer);
    powerPillTimer = setTimeout(
      () => (pacman.powerPill = false),
      POWER_PILL_TIME
    );
  }
  // 7. Change ghost scare mode depending on powerpill
  if (pacman.powerPill !== powerPillActive) {
    powerPillActive = pacman.powerPill;
    ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));
  }
  // 8. Check if all dots have been eaten
  if (gameBoard.dotCount === 0) {
    gameWin = true;
    gameOver(gameGrid);
  }
  // 9. Show new score
  scoreTable.innerHTML = score;
}

function startGame() {
  $('#userNameScreen').removeClass('is-active');

  playAudio(soundGameStart);

  gameWin = false;
  powerPillActive = false;
  score = 0;
  status = "running";

  pacman = new Pacman(2, 287);
  gameBoard.createGrid(LEVEL);

  gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
  document.addEventListener('keydown', (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
  );

  ghosts = [
    new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
    new Ghost(10, 209, randomMovement, OBJECT_TYPE.PINKY),
    new Ghost(3, 230, randomMovement, OBJECT_TYPE.INKY),
    new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE)
  ];

  // Gameloop
  timer = setInterval(() => gameLoop(), GLOBAL_SPEED);
}

function highscore() {
  status = 'highscore';
  $('#startScreen').addClass('is-active');
  $('#gameOverScreen').removeClass('is-active');

  $.ajax({
    url: "http://localhost:8080/highscore"
  }).then(function (data) {
    if (data.length == 0) {
      $('#highscoreValues').html(`<p class="has-text-centered mt-6 mb-6 is-size-4" style="color: darkslateblue; font-family: 'Joystix'">no highscore available</p>`);
    } else {
      let highscoreColumns = "";
      for (var i = 0; i < data.length; i++) {
        highscoreColumns += `<div class="columns">
        <div class="column is-4" style="color: darkslateblue; font-family: 'Joystix'">
        ${i + 1}.&nbsp;${data[i].user}
        </div>
        <div class="column is-2" style="color: darkslateblue; font-family: 'Joystix'">
          ${('000' + data[i].score).slice(-5)}
        </div>
        <div class="column is-6 has-text-right" style="color: darkslateblue; font-family: 'Joystix'">
          ${data[i].formattedDateTime}
        </div>
      </div>`
      }
      $('#highscoreValues').html(highscoreColumns);
    }
  });
}

function pauseGame() {
  status = 'paused';
  $('#pauseScreen').addClass('is-active');
  document.removeEventListener('keydown', (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
  );

  clearInterval(timer);
}

function resumeGame() {
  status = 'running';
  $('#pauseScreen').removeClass('is-active');
  document.addEventListener('keydown', (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
  );
  timer = setInterval(() => gameLoop(), GLOBAL_SPEED);
}

function enterName() {
  status = 'username';
  $('#startScreen').removeClass('is-active');
  $('#userNameScreen').addClass('is-active');
  $("#userName").focus();

  $("#userName").on("keydown", function search(e) {
    if (e.key == 'Enter') {
      userName = $("#userName").val().toLowerCase();;
      startGame();
    }
  });
}

window.addEventListener('keyup', function (e) {

  if (e.key === 's' && status == 'highscore') {
    enterName();
  }

  if (e.key === 'q' && status == 'running') {
    gameOver()
  }

  if (e.key == 'Enter' && status == 'gameOver') {
    highscore()
  }

  if (e.key === 'p' && status == 'running') {
    pauseGame()
  }

  if (e.key === 'r' && status == 'paused') {
    resumeGame()
  }
}, true);

$(function () {
  highscore();
});