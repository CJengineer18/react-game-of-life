/*
 * Game.ts
 * Types for ../pages/Game.tsx
 */

import World from "../maps/World";

export type GameProps = {
    className?: string;
    children?: React.ReactChild | JSX.Element[];
};

export type GameState = {
    currentGeneration: number;
    grid: boolean;
    world: WorldState;
};

export type WorldState = {
    currentBoard: World;
    currentPopulation: number;
    type: string;
};
