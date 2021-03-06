const createGrid = function(size){
  let grid = new Array(size).fill(undefined);
  return grid.map((cell)=>new Array(size).fill(0));
}

const createWorld = function(aliveCells, size){
  let world = createGrid(size);
  for(let aliveCell of aliveCells){
    world[aliveCell.row][aliveCell.col] = 1;
  }
  return world;
}

const findNeighbours = function(row, col, grid){
  let neighbours = new Array();
  neighbours.push({row, col : col + 1});
  neighbours.push({row : row + 1, col : col + 1});
  neighbours.push({row : row + 1, col});
  neighbours.push({row : row + 1, col : col - 1});
  neighbours.push({row, col : col - 1});
  neighbours.push({row : row - 1, col : col - 1});
  neighbours.push({row : row -1 , col});
  neighbours.push({row : row - 1, col : col + 1});

  return neighbours.filter((cell) => {
    return grid[cell.row] != undefined && grid[cell.row][cell.col] != undefined ;
  });
}

const countAliveNeighbours = function(row, col, grid){
  let neighbours = findNeighbours(row, col, grid);
  return neighbours.reduce((neighboursCount, currentNeighbour) => {
    return neighboursCount + grid[currentNeighbour.row][currentNeighbour.col];
  },0);
} 

const getCellRules = function(cell){
  const aliveCellRules = [0,0,1,1,0,0,0,0,0];
  const deadCellRules = [0,0,0,1,0,0,0,0,0];
  const allCellRules = [deadCellRules, aliveCellRules];
  return allCellRules[cell];
}

const evaluateNextGeneration = function(grid){
  let nextGenWorld = createGrid(grid.length);
  for(let row=0; row<grid.length; row++){
    for(let col=0; col<grid.length; col++){
      let cell = grid[row][col];
      let cellRules = getCellRules(cell);
      let aliveNeighboursCount = countAliveNeighbours(row, col, grid);
      nextGenWorld[row][col] = cellRules[aliveNeighboursCount];
    }
  }
  return nextGenWorld;
}

const evaluateNthGeneration = function(grid, generationCount){
  let nthGeneration = grid;
  let count = 0;
  while(count < generationCount){
    nthGeneration = evaluateNextGeneration(nthGeneration);
    count ++;
  }
  return nthGeneration;
}

exports.createGrid = createGrid;
exports.createWorld = createWorld;
exports.findNeighbours = findNeighbours;
exports.countAliveNeighbours = countAliveNeighbours;
exports.evaluateNextGeneration = evaluateNextGeneration;
exports.evaluateNthGeneration = evaluateNthGeneration;
