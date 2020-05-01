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
                <p>sjkajsjas9a</p>
                <Game />
            </div>
        );
    }
}
