/*
 * Game.ts
 * Types for ../pages/Game.tsx
 */

import Toroid from "../util/Toroid";

export type GameProps = {
    className?: string;
    children?: React.ReactChild | JSX.Element[];
};

export type GameState = {
    currentBoard: Toroid;
    currentGeneration: number;
};
