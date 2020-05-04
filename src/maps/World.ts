/**
 * Defines the World Map for the game. The map must be a number matrix.
 */
export default abstract class World {
    protected matrix: number[][];

    constructor(matrix: number[][]) {
        this.matrix = matrix;
    }

    protected abstract validateX(x: number): number;
    protected abstract validateY(y: number): number;

    public getValue(x: number, y: number) {
        const realX = this.validateX(x);
        const realY = this.validateY(y);

        return this.matrix[realX][realY];
    }

    public setValue(x: number, y: number, newValue: number) {
        const realX = this.validateX(x);
        const realY = this.validateY(y);

        this.matrix[realX][realY] = newValue;
    }

    public getMatrix() {
        return this.matrix;
    }
}
