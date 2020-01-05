import React from 'react';

const ClearBoardButton = props => {
    const clearBoardHandler = () => {
        if (!props.running) {
            props.setClearBoard();
        }
    }

    let running = '';
    if (props.running) {
        running = 'running';
    } else {
        running = '';
    }

    return (
        <button onClick={clearBoardHandler} className={`button button_hover ${running}`} >Clear Board</button>
    );
}

export default ClearBoardButton;