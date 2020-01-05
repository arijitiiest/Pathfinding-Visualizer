import React from 'react';

import './Node.css';

const Node = props => {
    const {row, col, isWall, isStart, isEnd} = props;

    const node_status = isStart ? 'start_node' : isEnd ? 'end_node' : isWall ? 'wall_node' : '';

    return (
        <div
            id={`node-${row}-${col}`}
            className={ `${props.className} node ${node_status}`}
            onMouseDown={(e) => {props.onMouseDown(row, col); e.preventDefault()}}
            onMouseEnter={() => props.onMouseEnter(row, col)}
            onMouseUp={props.onMouseUp}
        ></div>
    )
}

export default Node;