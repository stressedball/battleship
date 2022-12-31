'use strict';
let rotationHandle = null;
let shipSize = null;
function shipPlacementVisual(event) {
    cleanBoard(); // this should be useful anyhow
    let currentCoords = event.target.dataset.coords; // these are the actual ones, the one we're entering
    let xCur = Number(currentCoords.charAt(0));
    let yCur = Number(currentCoords.charAt(currentCoords.length - 1));

    shipSize = getShipSize();
    rotationHandle = document.querySelector('button').className;

    if (rotationHandle === 'hor') {
        let positionedShips = document.querySelectorAll(`.board.defense .square.ship[data-coords ^= "${xCur}"`);
        if (positionedShips.length > 0) { // if there are ships placed at the current mouse event
            let arr = [];                                               // we get all the coordinates
            for (let i = 0; i < positionedShips.length; i++) {          //
                let coords = positionedShips[i].dataset.coords;         //
                let y = Number(coords.charAt(coords.length - 1));       //
                arr.push(y);                                            //
            }                                                           //
            let yMax = -1;                                              // we then take both max and min populated values
            let yMin = 100;                                             //
            for (let i = 0; i < arr.length; i++) {                      //
                let y = arr[i];                                         // catch those values here
                if (y > yMax) yMax = y;                                 //
                if (y < yMin) yMin = y;                                 //  
            }                                                           //
            if ((yCur - shipSize < yMin) && (yMin <= yCur) ||
                ((yCur - shipSize < yMax) && (yMax <= yCur))) {               // if current coordinates are between min populated and (current coords + needed space)
                for (let i = 0; i < shipSize; i++) {                    //
                    document.querySelector(`.board.defense .square[data-coords = "${xCur},${yCur - i}"]`).classList.add('incorrect');
                }
                return;
            }
        } 
        if (yCur + 1 - shipSize < 0) {
            for (let i = 0; i < shipSize; i++) {
                if (yCur - i < 0) continue;
                document.querySelector(`.board.defense .square[data-coords = "${xCur},${yCur - i}"]`).classList.add('incorrect');
            }
            return;
        } 
        for (let i = 0; i < shipSize; i++) {
            document.querySelector(`.board.defense .square[data-coords = "${xCur},${yCur - i}"]`).classList.add('correct');
        }
    } else { // if rotation = vertical
        let positionedShips = document.querySelectorAll(`.board.defense .square.ship[data-coords $= "${yCur}"`);
        if (positionedShips.length > 0) {
            let arr = [];
            for (let i = 0; i < positionedShips.length; i++) {
                let coords = positionedShips[i].dataset.coords;
                let x = Number(coords.charAt(0));
                arr.push(x);
            }
            let xMax = -1;
            let xMin = 100;
            for (let i = 0; i < arr.length; i++) {
                let x = arr[i];
                if (x > xMax) xMax = x;
                if (x < xMin) xMin = x;
            }
            if (((xCur - shipSize < xMin) && (xMin <= xCur)) ||
                ((xCur - shipSize < xMax) && (xMax <= xCur))) {
                for (let i = 0; i < shipSize; i++) {
                    document.querySelector(`.board.defense .square[data-coords = "${xCur - i},${yCur}"]`).classList.add('incorrect');
                }
                return;
            }
        } 
        if (xCur + 1 - shipSize < 0) {
            for (let i = 0; i < shipSize; i++) {
                if (xCur - i < 0) continue;
                document.querySelector(`.board.defense .square[data-coords = "${xCur - i},${yCur}"]`).classList.add('incorrect');
            }
            return;
        } 
        for (let i = 0; i < shipSize; i++) {
            document.querySelector(`.board.defense .square[data-coords = "${xCur - i},${yCur}"]`).classList.add('correct');
        }
    }
}
const getShipSize = () => {
    let ship = document.querySelector('.message-help');
    if (ship.classList.contains('Carrier')) return 5;
    if (ship.classList.contains('BattleShip')) return 4;
    if (ship.classList.contains('Destroyer')) return 3;
    if (ship.classList.contains('Submarine')) return 3;
    if (ship.classList.contains('Patrol')) return 2;
}
const cleanBoard = () => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let target = document.querySelector(`.board.defense .square[data-coords = "${i},${j}"]`);
            if (target.classList.contains('incorrect')) target.classList.remove('incorrect');
            if (target.classList.contains('correct')) target.classList.remove('correct');               
        }
    }
}
export { shipPlacementVisual}