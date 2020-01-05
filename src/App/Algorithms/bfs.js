export function bfsVisitedNodesInOrder(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];

    const queue = [];
    startNode.isVisited = true;
    queue.push(startNode);

    while (queue.length > 0) {
        const currentNode = queue.shift();
        visitedNodesInOrder.push(currentNode);

        if (currentNode.row === finishNode.row && currentNode.col === finishNode.col) {
            return visitedNodesInOrder;
        }

        const neighbors = getNeighbors(grid, currentNode);
        for (let i=0; i<neighbors.length; i++) {
            const neighbor = neighbors[i];
            if(neighbor.isVisited || neighbor.isWall) 
                continue;

            neighbor.isVisited = true;
            neighbor.previousNode = currentNode;
            queue.push(neighbor);
        }
    }

    return visitedNodesInOrder;
}

function getNeighbors(grid, node) {
    let ret = [];
    const row = node.row;
    const col = node.col;

    if (grid[row-1] && grid[row-1][col]) 
        ret.push(grid[row-1][col]);
    if(grid[row+1] && grid[row+1][col])
        ret.push(grid[row+1][col]);
    if (grid[row][col-1] && grid[row][col-1])
        ret.push(grid[row][col-1]);
    if (grid[row][col+1] && grid[row][col+1])
        ret.push(grid[row][col+1]);
    return ret;
}