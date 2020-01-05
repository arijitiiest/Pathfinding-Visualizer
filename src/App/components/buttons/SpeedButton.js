import React from 'react';

import './Button.css';
import * as speeds from '../../data/speed';

const SpeedButton = props => {

    const selectedSpeed = e => {
        if (!props.running)
            props.setSpeed(e.target.value);
    }
    
    let running = '';
    if (props.running) {
        running = 'running';
    } else {
        running = '';
    }

    return (
        <div>
            <select className={`button ${running}`} onChange={selectedSpeed.bind(this)}>
                <option value={speeds.Fast}>Speed: Fast</option>  
                <option value={speeds.Average}>Speed: Average</option>  
                <option value={speeds.Slow}>Speed: Slow</option>  
            </select>

        </div>
    );
}

export default SpeedButton;