import React from 'react';

import './Button.css';
import nodeStatus from '../../data/nodeStatus';

const NodeStatusInput = props => {

    const selectedNodeStatus = e => {
        if (!props.running)
            props.setNodeStatus(e.target.value);
    }
    
    const dropdown = nodeStatus.map((data) => (
        <option key={data.label} value={data.label}>Create {data.name}</option>
    ))

    let running = '';
    if (props.running) {
        running = 'running';
    } else {
        running = '';
    }

    return (
        <div>
            <select className={`button ${running}`} onChange={selectedNodeStatus.bind(this)}>
                <option hidden={true}>Create Wall</option>
                {dropdown}   
            </select>

        </div>
    );
}

export default NodeStatusInput;