'use strict';
// import {Ship} from './ship.js';
// import {GameBoard} from './gameboard.js';
import {Player} from './player.js';
// let carrier = new Ship(5);
// let battleship = new Ship(4);
// let destroyer = new Ship(3);
// let submarine = new Ship(3);
// let patrol = new Ship(2);
// let gameBoard = new GameBoard();
let player1 = new Player();
let player2 = new Player();
// describe('Ship properties ', () => {
//     it('Ship class has property hit', () => {
//         expect(carrier).toHaveProperty('hits');
//     });
//     it('Ship class has property coordinates ', () => {
//         expect(carrier).toHaveProperty('coords');
//     });
//     it('ship has coordinates [0, 5]', () => {
//         carrier.coords = [0, 5];
//         expect(carrier.coords).toEqual(expect.arrayContaining([0, 5]));
//     });
//     it('Ship has hit counter ', () => {
//         carrier.hit();
//         expect(carrier.hits).toEqual(1);
//     })
//     it('Ship has sunk ', () => {
//         expect(carrier.isSunk()).toEqual(false);
//     });
// });
// describe('GameBoard ', () => {
//     it('game playedSquares places ships at specific coordinates', () => {
//         gameBoard.place(gameBoard.carrier, [0, 4], [5, 4]);
//         expect(gameBoard.carrier.coords).toEqual(expect.arrayContaining([[0, 4], [5, 4]]));
//     })
//     it('Game playedSquares records attacks coordinates', () => {
//         gameBoard.receiveAttack([0, 8]);   
//         expect(gameBoard.playedSquares).toEqual(expect.arrayContaining([[0, 8]]));
//         gameBoard.receiveAttack([7,7]);
//         expect(gameBoard.playedSquares).toEqual(expect.arrayContaining([[0, 8], [7, 7]]));
//     });
//     it('game playedSquares returns square played twice', () => {
//         expect(gameBoard.receiveAttack([7,7])).toBe('Square already played.'); 
//     });
//     it('game playedSquares receives attack on a ship', () => {
//         gameBoard.receiveAttack([3, 4]);
//         expect(gameBoard.carrier.hits).toEqual(1);
//     });
//     it('fleet not sunk', () => {
//         expect(gameBoard.isSunk()).toBeFalsy();
// });
//     it('fleet sunk', () => {
//         for (let array of gameBoard.fleet) {
//             let ship = array[0];
//             ship.hits = ship.size;
//         }
//         expect(gameBoard.isSunk()).toBeTruthy();
//     });
// });
describe('Player ', () => {
    it('Player has board', () => {
        expect(player1.board).toBeTruthy();
    });
    // it('player 1 attacks player 2', () => {
    //     player1.attack([0, 5], player2)
    //     expect(player2.board.playedSquares).toEqual(expect.arrayContaining([[0, 5]]));
    // });
    it('IA makes a move', () => {
        player1.attack(player2);
        expect(player2.board.playedSquares).toHaveLength(1);
    });
});