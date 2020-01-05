import React from 'react';

import './Main.css';
import Nav from '../../components/Nav/Nav';
import Header from '../header/Header';
import Description from '../../components/desc/Description';


const Main = props => (
    <div>
        <Nav />
        <div className="body">
            <Header 
                setAlgorithm={props.setAlgorithm}
                setSpeed={props.setSpeed}
                setNodeStatus={props.setNodeStatus}
                setClearPath={props.setClearPath}
                setClearWalls={props.setClearWalls}
                setClearBoard={props.setClearBoard}
                setStart={props.setStart}
                algo={props.algo}
                running={props.running}
            />
            <Description algorithm={props.algo} />
            { props.children }
        </div>
    </div>
);

export default Main;