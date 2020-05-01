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
    currentGeneration: number;
    world: WorldState;
};

export type WorldState = {
    currentBoard: Toroid;
    currentPopulation: number;
};
