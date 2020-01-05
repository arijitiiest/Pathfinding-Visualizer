import React from 'react';

import AlgorithmButton from '../../components/buttons/AlgorithmButton';
import ClearPathButton from '../../components/buttons/ClearPathButton';
import ClearWallsButton from '../../components/buttons/ClearWallsButton';
import VisualizeButton from '../../components/buttons/VisualizeButton';
import NodeStatusInput from '../../components/buttons/NodeStatusInput';
import ClearBoardButton from '../../components/buttons/ClearBoardButton';
import SpeedButton from '../../components/buttons/SpeedButton';
import './Header.css';

const Header = props => {
    return (
        <div className="buttons_header" >
            <div className="button_index">Pathfinding Visualizer</div>
            <AlgorithmButton setAlgorithm={props.setAlgorithm} running={props.running} />
            <NodeStatusInput setNodeStatus={props.setNodeStatus} running={props.running } />
            <SpeedButton setSpeed={props.setSpeed} running={props.running } />
            <VisualizeButton setStart={props.setStart} algo={props.algo} running={props.running} />
            <ClearPathButton setClearPath={props.setClearPath} running={props.running} />
            <ClearWallsButton setClearWalls={props.setClearWalls} running={props.running} />
            <ClearBoardButton setClearBoard={props.setClearBoard} running={props.running} />
        </div>
    )
}

export default Header;