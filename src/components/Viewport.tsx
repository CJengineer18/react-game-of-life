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
                <p>Developed by Cristian José Jiménez Diazgranados</p>
                <p>See source <a href='#' target='_blank' rel="noopener noreferrer">Here</a></p>
                <p>About <a href='#' target='_blank' rel="noopener noreferrer">Game of Life</a></p>
            </div>
        );
    }
}
