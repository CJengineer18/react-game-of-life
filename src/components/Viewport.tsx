/*
 * Viewport.tsx
 * Types: ../types/Viewport.ts
 */

import React from "react";
import { ViewportProps, ViewportState } from "../types/Viewport";
import Game from "./Game";
import '../styles/Viewport.css';

export default class Viewport extends React.Component<ViewportProps, ViewportState> {

    constructor(props: ViewportProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='viewport'>
                <p>Conway's Game of Life in React</p>
                <Game />
                <p>Developed by <a href='https://github.com/CJengineer18' target='_blank' rel="noopener noreferrer">Cristian José Jiménez Diazgranados</a></p>
                <p>See source code <a href='https://github.com/CJengineer18/react-game-of-life/' target='_blank' rel="noopener noreferrer">here</a></p>
                <p>About <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life' target='_blank' rel="noopener noreferrer">Game of Life</a> in Wikipedia</p>
                <p>License: MIT</p>
            </div>
        );
    }
}
