/*
 * Viewport.tsx
 * Types: ../types/Viewport.ts
 */

import React from 'react';
import { ViewportProps, ViewportState } from '../types/Viewport';

export default class Viewport extends React.Component<ViewportProps, ViewportState> {

    constructor(props: ViewportProps) {
        super(props);
        this.state = {};
    }

    render() {
        return <div></div>;
    }

}
