import React from 'react';

import './Description.css';
import algorithms from '../../data/algorithms';

const Description = props => {
    const { algorithm } = props;
    let algoDesc = "";
    if(algorithm === "") {
        algoDesc = "Pick an Algorithm!!"
    } else {
        algoDesc = algorithms.map(algo => {
            if (algo.label === algorithm) 
                return algo.desc;
            return ""
        });
    }

    return (
        <div className="desc">
            <div className="nodeDesc">
                <div className="node start_node" style={{marginLeft: "20px", marginRight: "-10px", cursor: "default"}}></div> Start Node
                <div className="node end_node" style={{marginLeft: "20px", marginRight: "-10px", cursor: "default"}}></div> Target Node
                <div className="node " style={{marginLeft: "20px", marginRight: "-10px", cursor: "default"}}></div> Unvisited Node
                <div className="node node-visited" style={{marginLeft: "20px", marginRight: "-10px", cursor: "default"}}></div> Visited Node
                <div className="node wall_node" style={{marginLeft: "20px", marginRight: "-10px", cursor: "default"}}></div> Wall Node
                <div className="node node-shortest-path" style={{marginLeft: "20px", marginRight: "-10px", cursor: "default"}}></div> Shortest-Path Node
            </div>
            <div className="algoDesc">
                {algoDesc}
            </div>
        </div>
    )
}

export default Description;