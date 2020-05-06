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
                <div>
                    <p>Generation: {this.props.currentGeneration}</p>
                    <p>Population: {this.props.world.currentPopulation}</p>
                    <button onClick={this.props.stepListener}>Step</button>
                    <button onClick={this.props.clearListener}>Clear</button>
                    <p style={{ textAlign: "left" }}>
                        <input
                            type="checkbox"
                            onChange={this.props.checkboxListener}
                            checked={this.props.grid}
                        />{" "}
                        Grid
                    </p>
                </div>
                <div>
                    <p>Map Type: </p>
                    <select
                        onChange={this.props.mapSelectListener}
                        value={this.props.world.type}>
                        {this.props.maps.map((map, idx) => {
                            return (
                                <option key={`map-opt-${idx}`} value={map}>
                                    {map}
                                </option>
                            );
                        })}
                    </select>
                    &nbsp;
                    <p>Color Pallete: </p>
                    <select
                        onChange={this.props.colorPalleteSelectListener}
                        value={this.props.currentPallete.getCssClassName()}>
                        {this.props.palletes.map((pallete, idx) => {
                            return (
                                <option
                                    key={`pallete-opt-${idx}`}
                                    value={pallete.getCssClassName()}>
                                    {pallete.getPalleteName()}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
        );
    }
}
