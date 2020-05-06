/*
 * Board.ts
 * Types for ../components/Board.tsx
 */

import World from "../maps/World";
import ColorPallete from "../util/ColorPallete";

export type BoardProps = {
    className?: string;
    children?: React.ReactChild | JSX.Element[];
    cellSize: number;
    boardSize: number;
    boardMatrix: World;
    cellListener: (event: React.MouseEvent) => void;
    visibleGrid: boolean;
    pallete: ColorPallete;
};

export type BoardState = {};
