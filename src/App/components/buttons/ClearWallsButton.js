import React from 'react';

const ClearWallsButton = props => {
    const clearWallsHandler = () => {
        if (!props.running) {
            props.setClearWalls();
        }
    }

    let running = '';
    if (props.running) {
        running = 'running';
    } else {
        running = '';
    }

    return (
        <button onClick={clearWallsHandler} className={`button button_hover ${running}`}>Clear Walls</button>
    );
}

export default ClearWallsButton;