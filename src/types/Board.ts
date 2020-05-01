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
    cellListener: (event: React.MouseEvent) => void;
};

export type BoardState = {};
