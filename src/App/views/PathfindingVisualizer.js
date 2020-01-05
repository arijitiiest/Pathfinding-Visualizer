import React, { Component } from 'react';

import { ROW, COL } from '../data/constants';
import Main from '../layouts/main/Main';
import Container from '../components/container/Container';

let START_NODE_ROW = 12;
let START_NODE_COL = 20;
let END_NODE_ROW = 12;
let END_NODE_COL = 40;

class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            algorithm: '',
            node_status_input: 'wall',
            speed: 10,
            running: false,
            grid: [],
            mouseIsPressed: false,
        }
        this.setAlgorithmHandler = this.setAlgorithmHandler.bind(this);
    }

    componentDidMount() {
        const grid = createInitialGrid();
        this.setState({ grid });
    }

    setAlgorithmHandler = algo => {
        this.setState({algorithm: algo});
    }

    setNodeStatusHandler = status => {
        this.setState({node_status_input: status});
    }

    clearPathHandler = () => {
        clearVisitedNode(this.state.grid);
    }

    clearWallsHandler = () => {
        const grid = createInitialGrid();
        this.setState({ grid });
    }

    clearBoardHandler = () => {
        clearVisitedNode(this.state.grid);
        const grid = createInitialGrid();
        this.setState({ grid });
    }

    setSpeedHandler = speed => {
        this.setState({speed: speed});
    }
    
    isStartHandler = () => {
        if (this.state.algorithm)
            this.setState({running: !this.state.running});
    }

    mouseDownHandler = (row, col) => {
        if (!this.state.running) {
            if (this.state.node_status_input === 'wall' && !this.state.running) {
                const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
                this.setState({grid: newGrid, mouseIsPressed: true});
            } else if (this.state.node_status_input === 'start_node' && !this.state.running) {
                const newGrid = getNewGridWithNewStartEnd(this.state.grid, row, col, 'start');
                this.setState({grid: newGrid});
            } else if (this.state.node_status_input === 'end_node' && !this.state.running) {
                const newGrid = getNewGridWithNewStartEnd(this.state.grid, row, col, 'end');
                this.setState({grid: newGrid});
            }
        }
    }

    mouseEnterHandler = (row, col) => {
        if (!this.state.running) {
            if (this.state.mouseIsPressed) {
                const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
                this.setState({grid: newGrid, mouseIsPressed: true});
            } else {
                return;
            }
        } 
    }

    mouseUpHandler = () => {
        if (!this.state.running) {
            this.setState({mouseIsPressed: false});
        }
    }



    render() {
        return (
            <Main
                setAlgorithm={this.setAlgorithmHandler}
                setNodeStatus={this.setNodeStatusHandler}
                setSpeed={this.setSpeedHandler}
                setClearPath={this.clearPathHandler}
                setClearWalls={this.clearWallsHandler}
                setClearBoard={this.clearBoardHandler}
                setStart={this.isStartHandler}
                algo={this.state.algorithm}
                running={this.state.running}
            >
                <Container
                    grid={this.state.grid}
                    algorithm={this.state.algorithm}
                    speed={this.state.speed}
                    running={this.state.running}
                    setStart={this.isStartHandler}
                    startNodePos={{row: START_NODE_ROW, col: START_NODE_COL}}
                    finishNodePos={{row: END_NODE_ROW, col: END_NODE_COL}}
                    onMouseDown={this.mouseDownHandler}
                    onMouseEnter={this.mouseEnterHandler}
                    onMouseUp={this.mouseUpHandler}
                />
            </Main>
                
        )
    }
}

const createInitialGrid = () => {
    const grid = [];
    for(let row=0; row<ROW; row++) {
        const rowArray = [];
        for(let col=0; col<COL; col++) {
            rowArray.push(createNode(row, col));
        }
        grid.push(rowArray);
    }
    return grid;
}

const createNode = (row, col) => (
    {
        row,
        col,
        isWall: false,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isEnd: row === END_NODE_ROW && col === END_NODE_COL,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
        f : 0,
        g : 0,
        h : 0
    }
)

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const wall = !node.isWall;
    const newNode = {
        ...node,
        isWall: wall
    }
    newGrid[row][col] = newNode;
    return newGrid;
}

const getNewGridWithNewStartEnd = (grid, row, col, state) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    let prevNode = {};
    if (state === 'start') {
        prevNode = newGrid[START_NODE_ROW][START_NODE_COL];
        prevNode.isStart = false;
        node.isStart = true;
        newGrid[START_NODE_ROW][START_NODE_COL] = prevNode;
        newGrid[row][col] = node;
        START_NODE_ROW = row;
        START_NODE_COL = col;
    } else if (state === 'end') {
        prevNode = newGrid[END_NODE_ROW][END_NODE_COL];
        prevNode.isEnd = false;
        node.isEnd = true;
        newGrid[END_NODE_ROW][END_NODE_COL] = prevNode;
        newGrid[row][col] = node;
        END_NODE_ROW = row;
        END_NODE_COL = col;
    }
    return newGrid;
}

const clearVisitedNode = grid => {
    const newGrid = grid.slice();
    for (let i=0; i<newGrid.length; i++) {
        const row = newGrid[i];
        for (let j=0; j<row.length; j++) {
            const node = row[j];
            node.isVisited = false;
            node.distance = Infinity;
            node.previousNode = null;
            document.getElementById(`node-${node.row}-${node.col}`).classList.remove('node-visited');
            document.getElementById(`node-${node.row}-${node.col}`).classList.remove('node-shortest-path');
        }
    }
    return newGrid;
}

export default PathfindingVisualizer;