// Toroid matrix

export default class Toroid {
    private matrix: number[][];

    constructor(matrix: number[][]) {
        this.matrix = matrix;
    }

    public getValue(x: number, y: number) {
        x = this.validateX(x);
        y = this.validateY(y);

        return this.matrix[x][y];
    }

    public setValue(x: number, y: number, value: number) {
        x = this.validateX(x);
        y = this.validateY(y);

        this.matrix[x][y] = value;
    }

    public getMatrix() {
        return this.matrix;
    }

    private validateX(x: number) {
        if (x < 0) {
            x = this.matrix.length - Math.abs(x);
        }

        if (x >= this.matrix.length) {
            x = 0;
        }

        return x;
    }

    private validateY(y: number) {
        if (y < 0) {
            y = this.matrix[0].length - Math.abs(y);
        }

        if (y >= this.matrix.length) {
            y = 0;
        }

        return y;
    }
}
