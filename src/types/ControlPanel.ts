/*
 * ControlBoard.ts
 * Types for ../components/ControlBoard.tsx
 */

import { WorldState } from "./Game";

export type ControlPanelProps = {
    className?: string;
    children?: React.ReactChild | JSX.Element[];
    world: WorldState;
    grid: boolean;
    currentGeneration: number;
    maps: string[];
    selectListener: (ev: React.ChangeEvent) => void;
    checkboxListener: (ev: React.ChangeEvent) => void;
    stepListener: (ev: React.MouseEvent) => void;
    clearListener: (ev: React.MouseEvent) => void;
};

export type ControlBoardState = {};
