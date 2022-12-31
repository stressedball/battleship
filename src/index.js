'use strict';
import './style.css'
import { firstPage, secondPage, paintShips } from "./modules/DOM.js";
import {gameLoop} from './modules/gameLoop.js';
import { Player } from "./modules/player.js";
import { Ship } from "./modules/ship.js";
import {shipPlacementVisual} from "./modules/ships-placements-visual.js"
// SCRIPT ACTS AS CONTROLLER BETWEEN PAGE RENDER AND EVENT LISTENERS 
// THEN PASSES INPUTS TO GAME LOOP FUNCTION
let playerOne = new Player();
let playerTwo = new Player();
let fleet = ['Carrier', 'BattleShip', 'Destroyer', 'Submarine', 'Patrol Boat'];
let shipHandle = null;
let playerHandle = null;
firstPage(); // firstPage function in the DOM script
getSecondPage().then(() => {
    document.addEventListener('keydown', rotateShip);
    nextShip(); // take the fleet array and shifts array to handle
    // I tried to go through the object entries in a loop but the loop doesn't stop after a click
    helpMessageShip(); // quick DOM manipulation
    playerHandle = playerOne; // easier for later generating AI?
    document.querySelector('.board.defense').addEventListener('click', getCoords);
    document.querySelector('.board.defense').addEventListener('mouseover', shipPlacementVisual);
});
function getSecondPage() {
    return new Promise((resolve) => {
        document.querySelector('.new-game').addEventListener('click', () => {
            secondPage();
            resolve();
        })
    })
}
const getCoords = (event) => {
    let coords = event.target.dataset.coords;
    let rotation = document.querySelector('button').className;
    let x = Number(coords.charAt(0));
    let y = Number(coords.charAt(coords.length - 1));
    shipsPlacement(x, y, rotation);
}
function shipsPlacement(x, y, rotation) {
    let ship = getShip(shipHandle);
    if (ship.coords === null) {
        const validCoords = checkRotation([x, y], ship.size, rotation);
        const validFleetCoords = checkFleetCoords([x, y], ship.size, rotation);
        if (validCoords !== -1 && validFleetCoords !== -1) {
            ship.rotation = rotation;
            playerHandle.board.place(ship, validCoords[0], validCoords[1]); 
            // occupied.push([x, y]);
            if (playerHandle === playerOne) paintShips(validCoords, ship.size);
            if (fleet.length === 0 && playerHandle === playerOne) {
                fleet = ['Carrier', 'BattleShip', 'Destroyer', 'Submarine', 'Patrol Boat'];
                document.querySelector('.message-help').textContent = 'LETS GET READY TO RUMBLE';
                playerHandle = playerTwo;
                document.querySelector('#content').removeChild(document.querySelector('.rotate-help'));
                document.removeEventListener('keydown', rotateShip);
                document.querySelector('.board.defense').removeEventListener('mouseover', shipPlacementVisual);
                document.querySelector('.board.defense').removeEventListener('click', getCoords);
            }
            if (fleet.length === 0 && playerHandle === playerTwo) {
                gameLoop(playerOne, playerTwo);
                return;
            }
            nextShip();
            if (playerHandle === playerOne) helpMessageShip();
        }
        if (playerHandle === playerTwo) placeShipsAI();
    } 
}
function checkFleetCoords([x, y], shipSize, rotation) {
    for (const [key, ship] of Object.entries(playerHandle.board)) { 
        if (ship instanceof Ship && ship.name !== shipHandle) {
            if (ship.coords === null) continue;
            let start = ship.coords[0];
            let end = ship.coords[1];
            let xS = start[0];
            let yS = start[1];
            let xE = end[0];
            let yE = end[1];
            let shipRotation = ship.rotation;
            if (shipRotation === 'hor') {
                if (rotation === 'hor') {
                    if (x === xS && (yS <= y && y <= yE + shipSize - 1)) return -1;
                }
                if (rotation === 'ver') {
                    if ((yS <= y && y <= yE) && (x >= xS) && (x < xS + shipSize)) {
                        return -1;  
                    }
                }
            }
            if (shipRotation === 'ver') {
                if (rotation === 'hor') {
                    if ((xS <= x && x <= xE )&& (y >= yS) && y - shipSize + 1 <= yS)  {
                        return -1;
                    }
                }
                if (rotation === 'ver') {
                    if (y === yS && (xS <= x && x <= xE + shipSize - 1)) return -1;
                }
            }
        }
    }
}
const checkRotation = ([x, y], n, rotation) => { // this only checks game board boundaries
    if (rotation === 'hor') {
        if (y + 1 < n) return -1;
        else return [[x, y - n + 1], [x, y], 'hor'];
    }
    if (rotation === 'ver') {
        if (x + 1 < n) return - 1;
        else return [[x - n + 1, y], [x, y], 'ver'];
    } 
}
const helpMessageShip = () => {
    let messageHelp = document.querySelector('.message-help');
    messageHelp.textContent = `Place your ${shipHandle}`;
    let messageHelpClasses = messageHelp.classList;
    for (let val of messageHelpClasses) {
        if (val !== 'message-help') messageHelp.classList.remove(`${val}`);
    }
    if (shipHandle === 'Patrol Boat') {
        messageHelp.classList.add('Patrol');
        messageHelp.classList.add('Boat');
        return;
    }
    messageHelp.classList.add(`${shipHandle}`);
}
const nextShip = () => {
    shipHandle = fleet.shift();
}
const getShip = (handle) => {
    for (const [key, ship] of Object.entries(playerHandle.board)) { 
        if (ship instanceof Ship && ship.name === handle) {
            return ship;
        }
    }
}
function placeShipsAI() { // player two ie AI ships placements
    let choices = makeCoords();
    shipsPlacement(choices.coords[0], choices.coords[1], choices.rotation);
}
const makeCoords = () => {
    let x = Math.trunc(Math.random() * 10);
    let y = Math.trunc(Math.random() * 10);
    let rotation = ['hor', 'ver'];
    let i = (Math.random() > 0.5) ? 0 : 1;
    return {coords : [x, y], rotation : rotation[i]};
}
function rotateShip(event) {
    if (event.key === 'r' || event.key === 'R') {
        let button = document.querySelector('button');
        if (button.classList.contains('hor')) {
            button.classList.remove('hor');
            button.classList.add('ver');
            button.textContent = 'Vertical placement';
        } else if (button.classList.contains('ver')) {
            button.classList.remove('ver');
            button.classList.add('hor');
            button.textContent = 'Horizontal placement';
        } 
    }
}

export {shipsPlacement, checkFleetCoords, checkRotation, playerOne, playerTwo};