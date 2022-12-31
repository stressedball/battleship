'use strict';
import { GameBoard } from "./game-board.js";
class Player {
    constructor() {
        this.board = new GameBoard();
        this.turn = false;
        this.playerMoves = [];
    }
    attack([x, y], enemy) {
        // let attackCoords = getMoves(this.playerMoves);
        if (getMoves([x, y], this.playerMoves) === -1) return;
        return enemy.board.receiveAttack([x, y]);
    }
}
const getMoves = ([x, y], arr) => {
    // let x = Math.trunc((Math.random()) * 10);
    // let y = Math.trunc((Math.random()) * 10);
    for (let i = 0; i < arr.length; i++) {
        if (x === arr[i][0] &&  y === arr[i][1]) {
            return -1;
        }
    }
    arr.push([x, y]);
    return 0;
}
export {Player};