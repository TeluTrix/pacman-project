import { LEVEL_RASTER, OBJECT_TYPE } from './setup'

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

//DOM Elements
const GameRaster = document.querySelector('#game');
const ScoreTable = document.querySelector('#score');
const StartButton = document.querySelector('#start-button');

// Game Constants
const POWER_PILL_TIME = 10000; //In Millisekunden
const GLOBAL_SPEED = 80; //In Millisekunden

//Initial Setup
let score = 0; //Punkte Zähler
let timer = null; //Zählt die Zeit
let gameWin = false; //Game noch nicht gewonnen daher auf false
let powerPillActive = false;
let powerPillTimer = null;

//Wenn Spiel vorbei / Game Over
function gameOver (pacman, grid) {

}
//Schauen ob sich PacMan und ein Gegner begegnen
function checkCollision (pacman, ghosts) {

}
//Während des Games
function gameLoop(pacman, ghosts){

}
//Spiel starten
function startGame(){

}
