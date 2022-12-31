'use strict';
import { Ship } from "./ship.js";
import {displaySunk, scoreDisplay, displayWinner} from "./DOM.js";
let playerOne = null;
let playerTwo = null;
const possibleMoves = [[1, 0], [-1, 0], [0, 1], [0, -1]];
function gameLoop(one, two) {
    playerOne = one;
    playerTwo = two;
    scoreDisplay();
    document.querySelector('.message-help').textContent = 'Open fire on enemy ships.';
    document.querySelector('.board.attack').addEventListener('click', playerMove);
    document.querySelector('.board.attack').classList.add('hoverable');
}
function playerMove(event) {
    let target = event.target.dataset.coords;
    let x = Number(target.charAt(0));
    let y = Number(target.charAt(target.length - 1));
    let hit = playerOne.attack([x, y], playerTwo);
    if (hit === undefined) {
        return;
    }
    if (Array.isArray(hit)) {
        document.querySelector('.message-help').textContent = 'It\'s a miss.';
        event.target.classList.add('miss');
    }
    if (hit instanceof Ship) {
        document.querySelector('.message-help').textContent = 'It\'s a hit!';
        event.target.classList.add('hit');
        if (hit.isSunk()) displaySunk(hit, 'two'); 
        if (playerTwo.board.isSunk()) {
            document.querySelector('.board.attack').removeEventListener('click', playerMove);
            displayWinner('playerOne');
            return;
        }
    }
    makeAIPlay(playerOne, playerTwo);
}
let pointer = 0;
let shipCoords = [];
function makeAIPlay(playerOne, playerTwo) {
    let coords = getPlay(playerTwo.playerMoves);
    let hit = playerTwo.attack([coords[0], coords[1]], playerOne);
    if (Array.isArray(hit)) {
        document.querySelector(`.board.defense .square[data-coords = "${coords[0]},${coords[1]}"]`).classList.add('miss');
    }
    if (hit instanceof Ship) {
        shipCoords.push([coords[0], coords[1]])
        document.querySelector(`.board.defense .square[data-coords = "${coords[0]},${coords[1]}"]`).classList.add('hit');
        if (hit.isSunk()) {
            displaySunk(hit, 'one');
        }
        if (playerOne.board.isSunk()) {
            document.querySelector('.board.attack').removeEventListener('click', playerMove);
            displayWinner('playerTwo');
            return;
        }
    }
    document.querySelector('.message-help').textContent = 'Open fire on enemy ships.';
}
function getPlay(plays) {
    if (shipCoords.length === 0) return getNotSoRandomMove(plays);
    let x = shipCoords[0][0];
    let y = shipCoords[0][1];
    let next = checkNext([x, y], plays);
    if (next === null) {
        pointer = 0;
        shipCoords.shift();
        return getPlay(plays);
    }
    return next;
}
const checkNext = (hitHandle, arr) => {
    if (pointer > 3) return null;
    let x = Number(hitHandle[0]) + Number(possibleMoves[pointer][0]);
    let y = Number(hitHandle[1]) + Number(possibleMoves[pointer][1]);
    if (x > 9 || y > 9 || x < 0 || y < 0) {
        pointer++;
        return checkNext(hitHandle, arr);
    }
    if (arr.filter(el => el[0] === x && el[1] === y).length > 0) {
        pointer++;
        return checkNext(hitHandle, arr);
    }
    return [x, y];
}
const getNotSoRandomMove = (arr) => {
    let x = Math.trunc(Math.random() * 10);
    let y = Math.trunc(Math.random() * 10);
    for (let i = 0; i < arr.length; i++) {
        if (x === arr[i][0] && y === arr[i][1]) {
            return getNotSoRandomMove(arr);
        }
        if ((arr.filter(el => el[0] === x + 2 && el[1] === y).length > 0
            && arr.filter(el => el[0] === x - 2 && el[1] === y).length > 0
            && arr.filter(el => el[0] === x && el[1] === y + 2).length > 0
            && arr.filter(el => el[0] === x && el[1] === y - 2))) continue;
    }
    return [x, y];
}
export {gameLoop}
