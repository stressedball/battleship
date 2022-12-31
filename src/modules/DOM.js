'use strict';
let content = document.querySelector('#content');   
// get choice between vs IA or vs human
function firstPage()    {
    let title = document.createElement('h1');
    title.textContent = 'BATTLESHIP';
    document.querySelector('body').prepend(title);

    let startGame = document.createElement('button');
    startGame.classList.add('new-game');
    content.appendChild(startGame);
    startGame.textContent = 'START NEW GAME';
}
 function secondPage() {
    // remove all content childs
    let contentChild = document.querySelectorAll('#content *');
    for (let child of contentChild) {
        content.removeChild(child);
    }
    // if (choice.classList.contains('human')) {
    //     // add class?
    // } else {
    //     // same?
    // }
    let boardsContainer = document.createElement('div');
    boardsContainer.classList.add('boards-container');
    let playerBoard = document.createElement('div');
    playerBoard.classList.add('board');
    playerBoard.classList.add('defense');
    let playerMoves = document.createElement('div');
    playerMoves.classList.add('board');
    playerMoves.classList.add('attack');
    content.appendChild(boardsContainer);
    boardsContainer.appendChild(playerBoard);
    boardsContainer.appendChild(playerMoves);
    // content.classList.add('horizontal');
    makeBoard(playerBoard);
    makeBoard(playerMoves);
    messages();
}
const makeBoard = (board) => {
    for (let i = 9; i >= 0; i--) {
        for (let j = 0; j < 10; j++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('data-coords', [i, j]);
            board.append(square);
        }
    }
}
function messages() {
    let messageHelp = document.createElement('div');
    messageHelp.classList.add('message-help');  
    let rotateContainer = document.createElement('div');
    rotateContainer.classList.add('rotate-help');
    let rotateHelp = document.createElement('div');
    rotateHelp.textContent = 'Press R to rotate your ship.';
    let rotateIcon = document.createElement('button');
    rotateIcon.textContent = 'Horizontal placement';
    rotateIcon.classList.add('hor')
    content.appendChild(messageHelp);
    content.appendChild(rotateContainer);
    rotateContainer.appendChild(rotateHelp);
    rotateContainer.appendChild(rotateIcon);
}
function scoreDisplay() {
    let boardsContainer = document.querySelector('.boards-container');

    let playerOneScore = document.createElement('div');
    boardsContainer.prepend(playerOneScore);
    playerOneScore.classList.add('score');
    playerOneScore.classList.add('one');
    let labelScoreOne = document.createElement('div');
    labelScoreOne.textContent = 'Friendly ships lost in battle';
    labelScoreOne.classList.add('label');
    playerOneScore.append(labelScoreOne);

    let playerTwoScore = document.createElement('div');
    boardsContainer.append(playerTwoScore);
    playerTwoScore.classList.add('score');
    playerTwoScore.classList.add('two');
    let labelScoreTwo = document.createElement('div');
    labelScoreTwo.textContent = 'Defeated enemy ships';
    labelScoreTwo.classList.add('label');
    playerTwoScore.append(labelScoreTwo);
}
function displaySunk(ship, str) {
    document.querySelector('.message-help').textContent = `${ship.name} has sunk!`;
    let el = document.createElement('h3');
    el.classList.add('.sunken');
    el.textContent = `${ship.name}`;
    document.querySelector(`.score.${str}`).append(el);
}
function displayWinner(winner) {
    removeChild(document.querySelector('#content'));
    const result = document.createElement('div');
    content.append(result);
    result.classList.add('result');
    const label = document.createElement('div');
    label.classList.add('label');
    label.classList.add('result');
    label.textContent = 'Game Over';
    result.append(label);
    const message = document.createElement('div');
    message.classList.add('message');
    if (winner === 'playerOne') {
        message.textContent = `You won!`;
    } else {
        message.textContent = 'You lost.'
    }
    result.append(message)
}
const paintShips = ([[x, y], [x1, y1], dir], shipLength) => {
    document.querySelector(`.board.defense .square[data-coords = "${x},${y}"`).classList.add('ship')
    if (dir === 'hor') {
        for (let i = 0; i < shipLength; i++) {
            let square = document.querySelector(`.board.defense .square[data-coords = "${x},${y1 - i}"]`);
            square.classList.add('ship');
        }
    }
    if (dir === 'ver') {
        for (let i = 0; i < shipLength; i++) {
            let square = document.querySelector(`.board.defense .square[data-coords = "${x1 - i},${y}"]`);
            square.classList.add('ship');
        }
    }
}
const removeChild = (element) => {
    let parent = null;
    let toBeRemoved = element;
    while (toBeRemoved.lastChild !== null) {
        parent = toBeRemoved;
        toBeRemoved = toBeRemoved.lastChild;
    }
    parent.removeChild(toBeRemoved)
    if (element.lastChild !== null) {
        removeChild(element);
    }
}


export {firstPage, secondPage, paintShips, displaySunk, scoreDisplay, displayWinner};