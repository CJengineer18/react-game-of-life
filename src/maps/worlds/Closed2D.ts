// 2D world with limits

import World from "../World";

export default class Closed2D extends World {
    protected validateX(x: number): number {
        if (x >= this.matrix.length) {
            x = this.matrix.length - 1;
        } else if (x < 0) {
            x = 0;
        }

        return x;
    }

    protected validateY(y: number): number {
        if (y >= this.matrix[0].length) {
            y = this.matrix[0].length - 1;
        } else if (y < 0) {
            y = 0;
        }

        return y;
    }
}
