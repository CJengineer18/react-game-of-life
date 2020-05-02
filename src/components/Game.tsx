/*
 * Game.tsx
 * Types: ../types/Game.ts
 */

import React from "react";
import { GameProps, GameState, WorldState } from "../types/Game";
import Board from "./Board";
import World from "../maps/World";
import Closed2D from "../maps/worlds/Closed2D";
import Toroid from "../maps/worlds/Toroid";
import ControlPanel from "./ControlPanel";

export default class Game extends React.Component<GameProps, GameState> {
    private board = 1000;
    private cell = 20;
    private nCellSide = 0;

    constructor(props: GameProps) {
        super(props);

        this.changeCellState = this.changeCellState.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.showGrid = this.showGrid.bind(this);
        this.changeMapType = this.changeMapType.bind(this);

        this.nCellSide = Math.round(this.board / this.cell);
        this.state = {
            currentGeneration: 1,
            grid: true,
            world: {
                currentBoard: new Toroid(this.zeroes()),
                currentPopulation: 0,
                type: "Toroid",
            },
        };
    }

    // React functions

    render() {
        const maps = ["Toroid", "Closed2D"];

        return (
            <div className="game">
                <ControlPanel
                    maps={maps}
                    world={this.state.world}
                    grid={this.state.grid}
                    currentGeneration={this.state.currentGeneration}
                    stepListener={() => this.newGeneration()}
                    clearListener={() => this.clearBoard()}
                    selectListener={this.changeMapType}
                    checkboxListener={() => this.showGrid()}
                />
                <Board
                    boardSize={this.board}
                    cellSize={this.cell}
                    boardMatrix={this.state.world.currentBoard}
                    cellListener={this.changeCellState}
                    visibleGrid={this.state.grid}
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
        const currentState = this.state.world.currentBoard;

        let i; // x
        let j; // y
        let neighborhood;
        let population;

        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                neighborhood = this.getNeighborhoodState(i, j);

                if (!currentState.getValue(i, j) && neighborhood === 3) {
                    newBoardState[i][j] = 1;
                } else if (
                    currentState.getValue(i, j) &&
                    (neighborhood < 2 || neighborhood > 3)
                ) {
                    newBoardState[i][j] = 0;
                } else {
                    newBoardState[i][j] = currentState.getValue(i, j);
                }
            }
        }

        population = this.countPopulation(newBoardState);

        return {
            currentBoard: this.createNewWorld(newBoardState),
            currentPopulation: population,
            type: this.state.world.type,
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
                type: this.state.world.type,
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

    clearBoard() {
        debugger;
        this.setState({
            currentGeneration: 1,
            world: {
                currentBoard: this.createNewWorld(this.zeroes()),
                currentPopulation: 0,
                type: this.state.world.type,
            },
        });
    }

    showGrid() {
        debugger;
        this.setState({
            grid: !this.state.grid,
        });
    }

    createNewWorld(matrix: number[][], mapType?: string) {
        const map = mapType || this.state.world.type;

        let newWorld: World;

        switch (map) {
            case "Closed2D":
                newWorld = new Closed2D(matrix);
                break;
            case "Toroid":
                newWorld = new Toroid(matrix);
                break;
            default:
                newWorld = this.state.world.currentBoard;
                break;
        }

        return newWorld;
    }

    changeMapType(ev: React.ChangeEvent) {
        debugger;
        const newMap = (ev.target as HTMLSelectElement).selectedOptions[0]
            .value;
        const currentMapState = this.state.world.currentBoard.getMatrix();

        this.setState({
            world: {
                currentBoard: this.createNewWorld(currentMapState, newMap),
                currentPopulation: this.countPopulation(currentMapState),
                type: newMap,
            },
        });
    }
}
