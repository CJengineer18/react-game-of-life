/*
 * Board.ts
 * Types for ../components/Board.tsx
 */

import World from "../maps/World";

export type BoardProps = {
    className?: string;
    children?: React.ReactChild | JSX.Element[];
    cellSize: number;
    boardSize: number;
    boardMatrix: World;
    cellListener: (event: React.MouseEvent) => void;
    visibleGrid: boolean;
};

export type BoardState = {};
