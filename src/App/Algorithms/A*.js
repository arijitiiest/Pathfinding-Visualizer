export function aStartVisitedNodesInOrder(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];

    const openList = [];
    const closeList = []; 
    openList.push(startNode);
    while (openList.length > 0) {
        let lowInd = 0;
        for (let i=0; i<openList.length; i++) {
            if (openList[i].f < openList[lowInd].f) { lowInd = i; }
        }
        const currentNode = openList[lowInd];
        visitedNodesInOrder.push(currentNode);

        if (currentNode.row === finishNode.row && currentNode.col === finishNode.col) {
            return visitedNodesInOrder;
        }

        openList.splice(lowInd, 1);
        closeList.push(currentNode);

        const neighbors = getNeighbors(grid, currentNode);
        for (let i=0; i<neighbors.length; i++) {
            const neighbor = neighbors[i];
            if (closeList.indexOf(neighbor) !== -1 || neighbor.isWall) {
                continue;
            }

            const gScore = currentNode.g + 1;
            let gScoreIsBest = false;

            if (openList.indexOf(neighbor) === -1) {
                gScoreIsBest = true;
                neighbor.h = computeHeuristic(neighbor, finishNode);
                openList.push(neighbor);
            } else if (gScore < neighbor.g) {
                gScoreIsBest = true;
            }

            if (gScoreIsBest) {
                neighbor.previousNode = currentNode;
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
            }
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

function computeHeuristic(node1, node2) {
    return Math.abs(node1.row - node2.row) + Math.abs(node1.col - node2.col);
}
// https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/