/*
 * Game.tsx
 * Types: ../types/Game.ts
 */

import React from "react";
import { GameProps, GameState, WorldState } from "../types/Game";
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
        this.changeCellState = this.changeCellState.bind(this);
        this.newGeneration = this.newGeneration.bind(this);
        this.asyncUpdateBoard = this.asyncUpdateBoard.bind(this);

        this.nCellSide = Math.round(this.board / this.cell);
        this.state = {
            currentGeneration: 1,
            world: {
                currentBoard: new Toroid(this.zeroes()),
                currentPopulation: 0,
            },
        };
    }

    // React functions

    render() {
        return (
            <div>
                <div className="control">
                    <p>Generation: {this.state.currentGeneration}</p>
                    <p>Population: {this.state.world.currentPopulation}</p>
                    <button onClick={() => this.newGeneration()}>Step</button>
                </div>
                <Board
                    boardSize={this.board}
                    cellSize={this.cell}
                    boardMatrix={this.state.world.currentBoard.getMatrix()}
                    cellListener={this.changeCellState}
                />
            </div>
        );
    }

    // Class functions

    async newGeneration() {
        const newBoard = await this.asyncUpdateBoard();

        this.setState({
            currentGeneration: this.state.currentGeneration + 1,
            world: newBoard,
        });
    }

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

    asyncUpdateBoard() {
        return new Promise<WorldState>((resolve, reject) => {
            resolve(this.updateBoard());
        });
    }

    updateBoard() {
        const size = this.nCellSide;
        const newBoardState: number[][] = this.zeroes();
        const currentState = this.state.world.currentBoard.getMatrix();

        let i; // x
        let j; // y
        let neighborhood;
        let population;

        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                neighborhood = this.getNeighborhoodState(i, j);

                if (!currentState[i][j] && neighborhood === 3) {
                    newBoardState[i][j] = 1;
                } else if (
                    currentState[i][j] &&
                    (neighborhood < 2 || neighborhood > 3)
                ) {
                    newBoardState[i][j] = 0;
                } else {
                    newBoardState[i][j] = currentState[i][j];
                }
            }
        }

        population = this.countPopulation(newBoardState);

        return {
            currentBoard: new Toroid(newBoardState),
            currentPopulation: population,
        };
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
                    sum += this.state.world.currentBoard.getValue(idxX, idxY);
                }
            }
        }

        return sum;
    }

    changeCellState(ev: React.MouseEvent) {
        const id = (ev.target as HTMLElement).id;
        const coords = id.split("-").map((n) => {
            return parseInt(n);
        });
        const board = this.state.world.currentBoard;
        const alive = !!board.getValue(coords[0], coords[1]);

        board.setValue(coords[0], coords[1], alive ? 0 : 1);

        this.setState({
            world: {
                currentBoard: board,
                currentPopulation: alive
                    ? this.state.world.currentPopulation - 1
                    : this.state.world.currentPopulation + 1,
            },
        });
    }

    countPopulation(board: number[][]) {
        let population = 0;

        board.forEach((row) => {
            row.forEach((n) => {
                if (n) {
                    population++;
                }
            });
        });

        return population;
    }
}
