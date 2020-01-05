let found = false;
export function dfsVisitedNodesInOrder(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    found = false;
    dfsUtil(grid, startNode, finishNode, visitedNodesInOrder);
    return visitedNodesInOrder;
}

function dfsUtil(grid, currentNode, finishNode, visitedNodesInOrder) {
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode.row === finishNode.row && currentNode.col === finishNode.col) {
        found = true;
        return;
    }

    const neighbors = getNeighbors(grid, currentNode);
    for (let i=0; i<neighbors.length; i++) {
        const neighbor = neighbors[i];

        if (neighbor.isVisited || neighbor.isWall) 
            continue;
        
        neighbor.previousNode = currentNode;

        dfsUtil(grid, neighbor, finishNode, visitedNodesInOrder);
        if (found) return;
        
    }
}

function getNeighbors(grid, node) {
    let ret = [];
    const row = node.row;
    const col = node.col;

    if (grid[row-1] && grid[row-1][col]) 
        ret.push(grid[row-1][col]);
    if(grid[row+1] && grid[row+1][col])
        ret.push(grid[row+1][col]);
    if (grid[row][col+1] && grid[row][col+1])
        ret.push(grid[row][col+1]);
    if (grid[row][col-1] && grid[row][col-1])
        ret.push(grid[row][col-1]);
    return ret;
}