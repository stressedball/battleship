'use strict';
class Ship {
    constructor(n, string) {
        this.size = n;
        this.hits = 0;
        this.coords = null;
        this.name = string;
        this.rotation = null;
    }
    hit() {
        this.hits += 1;
    }
    isSunk() {
        return (this.hits >= this.size ? true : false);
    }
}
export {Ship};