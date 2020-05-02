/*
 * Board.tsx
 * Types: ../types/Board.ts
 */

import React from "react";
import "../styles/Board.scss";
import { BoardProps, BoardState } from "../types/Board";

export default class Board extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);
        this.state = {};

        this.printCells = this.printCells.bind(this);
    }

    render() {
        const size = this.props.boardSize;
        const wCells = Math.round(size / this.props.cellSize);
        const hCells = Math.round(size / this.props.cellSize);
        const cSize = this.props.visibleGrid
            ? this.props.cellSize - 2
            : this.props.cellSize;

        return (
            <div className="board" style={{ width: size, height: size }}>
                {this.printCells(wCells, hCells, cSize)}
            </div>
        );
    }

    printCells(wCells: number, hCells: number, size: number) {
        const cells = [];
        const matrix = this.props.boardMatrix;

        let i;
        let j;

        for (i = 0; i < hCells; i++) {
            for (j = 0; j < wCells; j++) {
                cells.push(
                    <div
                        key={`cell_${i}-${j}`}
                        id={`${i}-${j}`}
                        style={{ width: size, height: size }}
                        className={[
                            "boardCell",
                            matrix.getValue(i, j) ? "alive" : "dead",
                            this.props.visibleGrid ? "grid" : "",
                        ].join(" ")}
                        onClick={this.props.cellListener}
                    />
                );
            }
        }

        return cells;
    }
}
