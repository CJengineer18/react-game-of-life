/*
 * Game.ts
 * Types for ../pages/Game.tsx
 */

import World from "../maps/World";
import ColorPallete from "../util/ColorPallete";

export type GameProps = {
    className?: string;
    children?: React.ReactChild | JSX.Element[];
};

export type GameState = {
    currentGeneration: number;
    currentPallete: ColorPallete;
    grid: boolean;
    world: WorldState;
};

export type WorldState = {
    currentBoard: World;
    currentPopulation: number;
    type: string;
};
