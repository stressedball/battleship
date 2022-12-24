// 'use strict';
import {Ship, GameBoard} from './script.js';
// const battleship = {
//     size : 4, 
//     hits : 0,
// }
// const destroyer = {
//     size : 3, 
//     hits : 0,
// }
// const submarine = {
//     size : 3, 
//     hits : 0,
// }
// const patrolBoat = {
//     size : 2, 
//     hits : 0,
// }
let carrier = new Ship(5);
let gameBoard = new GameBoard();

describe('Ship properties ', () => {
    it('Ship class has property hit', () => {
        expect(carrier).toHaveProperty('hits');
    });
    it('Ship class has property coordinates ', () => {
        expect(carrier).toHaveProperty('coords');
    });
    it('ship has coordinates [0, 5]', () => {
        carrier.coords = [0, 5];
        expect(carrier.coords).toEqual(expect.arrayContaining([0, 5]));
    });
    it('Ship has hit counter ', () => {
        carrier.hit();
        expect(carrier.hits).toEqual(1);
    })
    it('Ship has sunk ', () => {
        expect(carrier.isSunk()).toEqual(false);
    });
});
describe('GameBoard ', () => {
    it('game board places ships at specific coordinates', () => {
        gameBoard.place(carrier, [0, 4], [4, 4]);
        expect(carrier.coords).toEqual(expect.arrayContaining([[0, 4], [4, 4]]));
    })
    it('Game board records attacks coordinates', () => {
        gameBoard.receiveAttack([0, 5]);   
        expect(gameBoard.board).toEqual(expect.arrayContaining([[0, 5]]));
        gameBoard.receiveAttack([7,7]);
        expect(gameBoard.board).toEqual(expect.arrayContaining([[0, 5], [7, 7]]));
    });
    it('game board returns square played twice', () => {
        expect(gameBoard.receiveAttack([7,7])).toBe('Square already played.'); 
    });
    it('game board receives attack on a ship', () => {
        gameBoard.receiveAttack([3, 4]);
        expect(carrier.hits).toEqual(1);
    });
    it('fleet sunk', () => {
        for (let array of gameBoard.fleet) {
            let ship = array[0];
            ship.hits = ship.size;
        }
        expect(gameBoard.isSunk()).toBeTruthy();
    });
});