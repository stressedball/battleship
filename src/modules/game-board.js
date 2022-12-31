'use strict';
import { Ship } from "./ship.js";
class GameBoard {
    constructor() {
        this.playedSquares = [];
        this.carrier = new Ship(5, 'Carrier');
        this.battleship = new Ship(4, 'BattleShip');
        this.destroyer = new Ship(3, 'Destroyer');
        this.submarine = new Ship(3, 'Submarine');
        this.patrol = new Ship(2, 'Patrol Boat');
        this.fleet = [[this.carrier], [this.battleship], [this.destroyer], [this.submarine], [this.patrol]];
    }
    place(ship, [xS, yS], [xE, yE]) {
        ship.coords = [[xS, yS], [xE, yE]];
    }
    receiveAttack([x, y]) {
        if (checkBoard([x, y], this.playedSquares) === -1) {
            return 'Square already played.';
        } else {
            this.playedSquares.push([x, y]);
        }
        let checkHit = checkFleet([x, y], this.fleet);
        if (checkHit !== null) {
            checkHit.hit();
            return checkHit;
        }
        return [x, y];
    }
    isSunk() {
        for (let array of this.fleet) {
            let ship = array[0];
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }
}
const checkBoard= ([x, y], arr) => {
    for (let i = 0; i < arr.length; i++) {
        let xV = arr[i][0];
        let yV = arr[i][1];
        if (xV === x && yV === y) {
            return -1;
        }
    }
}
const checkFleet = ([x, y], arrFleet) => {
    for (let  i = 0; i < arrFleet.length; i++) {
        let ship = arrFleet[i][0];
        if (ship.coords === null) continue;
        let startPoint = ship.coords[0];
        let endPoint = ship.coords[1];
        let xS = startPoint[0];
        let yS = startPoint[1];
        let xE = endPoint[0];
        let yE = endPoint[1];
        if (xS === xE && x === xS) { // horizontal
            if (yS <= y && y <= yE) {
                return ship;
            }
        }
        if (yS === yE && y === yS) { // vertical
            if (xS <= x && x <= xE) {
                return ship;
            }
        }
    }
    return null;
}
export {GameBoard};