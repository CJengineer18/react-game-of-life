/*
 * Board.tsx
 * Types: ../types/Board.ts
 */

import React from 'react';
import '../styles/Board.scss';
import { BoardProps, BoardState } from '../types/Board';

export default class Board extends React.Component<BoardProps, BoardState> {

    constructor(props: BoardProps) {
        super(props);
        this.state = {};
    }

    render() {
        return <div></div>;
    }

}
