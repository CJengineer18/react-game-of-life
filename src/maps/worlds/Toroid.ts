// Toroid world

import World from "../World";

export default class Toroid extends World {
    protected validateX(x: number) {
        if (x < 0) {
            x = this.matrix.length - Math.abs(x);
        } else if (x >= this.matrix.length) {
            x = Math.abs(x - this.matrix.length);
        }

        return x;
    }

    protected validateY(y: number) {
        if (y < 0) {
            y = this.matrix[0].length - Math.abs(y);
        } else if (y >= this.matrix[0].length) {
            y = Math.abs(y - this.matrix[0].length);
        }

        return y;
    }
}
