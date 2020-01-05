import React from 'react';

import './Button.css';

const VisualizeButton = props => {
    const startHandler = () => {
        if (!running) {
            props.setStart();
        }
    }

    let running = '';
    if (props.running) {
        running = 'run';
    } else {
        running = '';
    }

    return (
        <button onClick={startHandler} className={`button button_hover start ${running}`}>Visualize{ ' ' + props.algo}!</button>
    );
}

export default VisualizeButton;