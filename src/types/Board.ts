/*
 * Board.ts
 * Types for ../components/Board.tsx
 */

export type BoardProps = {
    className?: string;
    children?: React.ReactChild | JSX.Element[];
    cellSize: number;
    boardSize: number;
    boardMatrix: number[][];
};

export type BoardState = {};
