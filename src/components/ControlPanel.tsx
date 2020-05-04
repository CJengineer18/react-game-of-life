/*
 * ControlPanel.tsx
 * Types: ../types/ControlPanel.ts
 * 
 * Show the available options for the game.
 */

import React from "react";
import { ControlPanelProps, ControlBoardState } from "../types/ControlPanel";
import "../styles/ControlPanel.scss";

export default class ControlPanel extends React.Component<ControlPanelProps, ControlBoardState> {
    constructor(props: ControlPanelProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="control">
                <p>Generation: {this.props.currentGeneration}</p>
                <p>Population: {this.props.world.currentPopulation}</p>
                <button onClick={this.props.stepListener}>Step</button>
                <button onClick={this.props.clearListener}>Clear</button>
                <p>
                    <input
                        type="checkbox"
                        onChange={this.props.checkboxListener}
                        checked={this.props.grid}
                    />{" "}
                    Grid
                </p>
                <p>Map Type: </p>
                <select
                    onChange={this.props.selectListener}
                    value={this.props.world.type}>
                    {this.props.maps.map((map, index) => {
                        return (
                            <option key={`map-opt-${index}`} value={map}>
                                {map}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    }
}
