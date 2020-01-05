import React from 'react';

import './Container.css';
import Node from '../Node/Node';

import { dijkstraVisitedNodesInOrder } from '../../Algorithms/dijkstra';
import { aStartVisitedNodesInOrder } from '../../Algorithms/A*';
import { bfsVisitedNodesInOrder } from '../../Algorithms/bfs';
import { dfsVisitedNodesInOrder } from '../../Algorithms/dfs';
import { greedyVisitedNodesInOrder } from '../../Algorithms/greedy';


const Container = props => {
    let { grid, algorithm, running, startNodePos, finishNodePos, speed } = props;

    const animateShortestPath = finishNode => {
        const shortestPathNodesInOrder = shortestPathInOrder(finishNode)

        for (let i=0; i<shortestPathNodesInOrder.length; i++) {
            if (shortestPathNodesInOrder.length === 1) {
                alert('No Path Found...');
                props.setStart();
                return;
            }
            setTimeout(() => {
                const node = shortestPathNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).classList.add(`node-shortest-path`);
            }, 4*speed*i);
        }
        setTimeout(() => {
            props.setStart();
        }, 4*speed*shortestPathNodesInOrder.length);
    }

    const animateAlgorithm = (visitedNodesInOrder, finishNode) => {
        for (let i=0; i<visitedNodesInOrder.length; i++) {
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-visited');
            }, speed*i);
        }

        setTimeout(() => {
            animateShortestPath(finishNode);
        }, speed*visitedNodesInOrder.length);
    }

    if (running) {
        const newGrid = clearVisitedNode(grid);

        const startNode = newGrid[startNodePos.row][startNodePos.col];
        const finishNode = newGrid[finishNodePos.row][finishNodePos.col];
        let visitedNodesInOrder;
        switch (algorithm) {
            case 'Dijkstra':visitedNodesInOrder = dijkstraVisitedNodesInOrder(newGrid, startNode, finishNode); break;
            case 'A*':      visitedNodesInOrder = aStartVisitedNodesInOrder(newGrid, startNode, finishNode); break;
            case 'BFS':     visitedNodesInOrder = bfsVisitedNodesInOrder(newGrid, startNode, finishNode); break;
            case 'DFS':     visitedNodesInOrder = dfsVisitedNodesInOrder(newGrid, startNode, finishNode); break;
            case 'Greedy':  visitedNodesInOrder = greedyVisitedNodesInOrder(newGrid, startNode, finishNode); break;
            default : break;
        }
        animateAlgorithm(visitedNodesInOrder, finishNode);
    } 

    return (
        <div className="visualizer-container">
            {grid.map((rowArray, rowIdx) => (
                <div key={rowIdx}>
                    {rowArray.map((node, nodeIdx) => (
                        <Node
                            key={nodeIdx}
                            row={node.row}
                            col={node.col}
                            isWall={node.isWall}
                            isStart={node.isStart}
                            isEnd={node.isEnd}
                            onMouseDown={props.onMouseDown}
                            onMouseEnter={props.onMouseEnter}
                            onMouseUp={props.onMouseUp}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

const shortestPathInOrder = finishNode => {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
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

export default Container;