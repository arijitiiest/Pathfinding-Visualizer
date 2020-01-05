import React from 'react';

import './Button.css';
import algorithms from '../../data/algorithms';

const AlgorithmButton = props => {

    const selectedAlgo = e => {
        if (!props.running)
            props.setAlgorithm(e.target.value);
    }
    
    const dropdown = algorithms.map((data) => (
        <option key={data.label} value={data.label} className="algo-option">{data.name}</option>
    ))

    let running = '';
    if (props.running) {
        running = 'running';
    } else {
        running = '';
    }

    return (
        <div>
            <select className={`button ${running}`} onChange={selectedAlgo.bind(this)}>
                <option hidden={true}>Pathfinding Algorithms</option>
                {dropdown}   
            </select>

        </div>
    );
}

export default AlgorithmButton;