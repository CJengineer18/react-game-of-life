/*
 * ControlBoard.ts
 * Types for ../components/ControlBoard.tsx
 */

import { WorldState } from "./Game";
import ColorPallete from "../util/ColorPallete";

export type ControlPanelProps = {
    className?: string;
    children?: React.ReactChild | JSX.Element[];
    world: WorldState;
    grid: boolean;
    currentGeneration: number;
    currentPallete: ColorPallete;
    maps: string[];
    palletes: ColorPallete[];
    mapSelectListener: (ev: React.ChangeEvent) => void;
    colorPalleteSelectListener: (ev: React.ChangeEvent) => void;
    checkboxListener: (ev: React.ChangeEvent) => void;
    stepListener: (ev: React.MouseEvent) => void;
    clearListener: (ev: React.MouseEvent) => void;
};

export type ControlBoardState = {};
