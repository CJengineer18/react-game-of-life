/*
 * Game.tsx
 * Types: ../types/Game.ts
 */

import React from "react";
import { GameProps, GameState } from "../types/Game";
import Board from "./Board";
import Toroid from "../util/Toroid";
import "../styles/Game.scss";

export default class Game extends React.Component<GameProps, GameState> {
    private board = 1000;
    private cell = 20;
    private nCellSide = 0;

    constructor(props: GameProps) {
        super(props);

        this.zeroes = this.zeroes.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
        this.getNeighborhoodState = this.getNeighborhoodState.bind(this);

        this.nCellSide = Math.round(this.board / this.cell);
        this.state = {
            currentBoard: new Toroid(this.zeroes()),
            currentGeneration: 1,
        };
    }

    // React functions

    render() {
        return (
            <div>
                <div className="control">
                    <p>Generation: {this.state.currentGeneration}</p>
                    <button>Pause</button>
                </div>
                <Board
                    boardSize={this.board}
                    cellSize={this.cell}
                    boardMatrix={this.state.currentBoard.getMatrix()}
                />
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            currentGeneration: this.state.currentGeneration + 1,
            currentBoard: this.updateBoard(),
        });
    }

    // Class functions

    zeroes() {
        const arr: number[][] = [];
        const size = this.nCellSide;

        let i; // x
        let j; // y

        for (i = 0; i < size; i++) {
            arr[i] = [];

            for (j = 0; j < size; j++) {
                arr[i][j] = 0;
            }
        }

        return arr;
    }

    updateBoard() {
        const size = this.nCellSide;
        const newBoardState: number[][] = [];
        const currentState = this.state.currentBoard.getMatrix();

        let i; // x
        let j; // y
        let neighborhood;

        for (i = 0; i < size; i++) {
            newBoardState[i] = [];
            for (j = 0; j < size; j++) {
                neighborhood = this.getNeighborhoodState(i, j);

                if (!currentState[i][j] && neighborhood === 3) {
                    newBoardState[i][j] = 1;
                } else if (
                    currentState[i][j] &&
                    (neighborhood < 2 || neighborhood > 3)
                ) {
                    newBoardState[i][j] = 0;
                }
            }
        }

        return new Toroid(newBoardState);
    }

    getNeighborhoodState(x: number, y: number) {
        const size = this.nCellSide;
        const move = [-1, 0, 1];

        let i;
        let j;
        let idxX;
        let idxY;
        let sum = 0;

        // Toroid
        for (i = 0; i < move.length; i++) {
            for (j = 0; j < move.length; j++) {
                idxX = (x + move[i]) % size;
                idxY = (y + move[j]) % size;

                if (move[i] !== 0 || move[j] !== 0) {
                    sum += this.state.currentBoard.getValue(idxX, idxY);
                }
            }
        }

        return sum;
    }
}
