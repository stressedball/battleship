'use strict';
class Ship {
    constructor(n) {
        this.size = n;
        this.hits = 0;
        this.coords = null;
    }
    hit() {
        this.hits += 1;
    }
    isSunk() {
        return (this.hits >= this.size ? true : false);
    }
}
class GameBoard {
    constructor() {
        this.board = [];
        this.carrier = new Ship(5);
        this.battleship = new Ship(4);
        this.destroyer = new Ship(3);
        this.submarine = new Ship(3);
        this.patrol = new Ship(2);
        this.fleet = [[this.carrier], [this.battleship], [this.destroyer], [this.submarine], [this.patrol]];
    }
    place(ship, [xS, yS], [xE, yE]) {
        // if (rangeHandler([xS, yS], [xE, yE]) === - 1) return 'Max value : 9, min value : 0.';
        ship.coords = [[xS, yS], [xE, yE]];
    }
    receiveAttack([x, y]) {
        // if (rangeHandler([x, y]) === - 1) return 'Max value : 9, min value : 0.';
        if (checkBoard([x, y], this.board) === -1) {
            return 'Square already played.';
        } else {
            this.board.push([x, y]);
        }
        let checkHit = checkFleet([x, y], this.fleet);
        if (checkHit !== null) {
            checkHit.hit();
        }
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
    for (let i=0; i<arr.length; i++) {
        let xV = arr[i][0];
        let yV = arr[i][1];
        if (xV === x && yV === y) {
            return -1;
        }
    }
}
// const rangeHandler = (...args) => {
//     for (let i = 0; i < args.length; i++) {
//         let arr = args[i];
//         let x = arr[0][0];
//         let y = arr[0][1];
//         if (x < 0 || x > 9 || y < 0 || y > 9) return -1;
//     }
// }
const checkFleet = ([x, y], arrFleet) => {
    for (let  i = 0; i < arrFleet.length; i++) {
        let ship = arrFleet[i][0];
        if (ship.coords === null) continue;
        let startPoint = ship.coord[0];
        let endPoint = ship.coords[1];
        // x or y should be same in both start and end points
        // ie vertical or horizontal
        // will need to check on how to implement this in DOM
        if (startPoint[0] <= x && x <= endPoint[0]) {
            return arrFleet[i];
        }
        if (startPoint[1] <= y && y <= endPoint[1]) {
            return ship;
        }
    }
    return null;
}

export {Ship, GameBoard};


// export {testShip};
