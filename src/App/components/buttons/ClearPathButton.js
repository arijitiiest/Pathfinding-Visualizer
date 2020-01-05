import React from 'react';

const ClearPathButton = props => {
    const clearPathHandler = () => {
        if (!props.running) {
            props.setClearPath();
        }
    }

    let running = '';
    if (props.running) {
        running = 'running';
    } else {
        running = '';
    }

    return (
        <button onClick={clearPathHandler} className={`button button_hover ${running}`} >Clear Path</button>
    );
}

export default ClearPathButton;