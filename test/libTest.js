const {equal, deepEqual} = require("assert");
const {
  createGrid,
  generatePrintableGrid,
  createWorld,
  findNeighbours,
  countAliveNeighbours
} = require("../src/lib.js");

describe("createGrid", function(){
  it("should return empty array for input 0", function(){
    deepEqual(createGrid(0), []);
  });
  it("should return 1x1 2D array for input 1 containing all 0's", function(){
    deepEqual(createGrid(1),[[0]]);
  });
  it("should return 3x3 2D array for input 3 containing all 0's", function(){
    deepEqual(createGrid(3),[[0,0,0],[0,0,0],[0,0,0]]);
  });
});

describe("generatePrintableGrid", function(){
  it("should return printable form of board in array for n>0 size grid", function(){
    deepEqual(generatePrintableGrid(createGrid(2)), ["|0|0|","|0|0|"]);
  });
  it("should return empty array for 0 size grid", function(){
    deepEqual(generatePrintableGrid(createGrid(0)), []);
  });
});

describe("createWorld", function(){
  it("should return 2D array containing all 0's for empty input array", function(){
    deepEqual(createWorld([], 1), [[0]]);
  });
  it("should return 2D array containing all 1's for input array containing positions for alive cells", function(){
    deepEqual(createWorld([{row: 0, col:0}], 1), [[1]]);
  });
  it("should return 2D array containing 1's for input array containing positions for alive cells", function(){
    deepEqual(createWorld([{row: 0, col:0}], 2), [[1,0],[0,0]]);
  });
});

describe("findNeighbours", function(){
  it("should return all neighbours for 3x3 world", function(){
    let expectedOut = [
      {row:1, col:2},
      {row:2, col:2},
      {row:2, col:1},
      {row:2, col:0},
      {row:1, col:0},
      {row:0, col:0},
      {row:0, col:1},
      {row:0, col:2}
    ];
    deepEqual(findNeighbours(1,1,createGrid(3)), expectedOut);
  });
  it("should return all neighbours for 2x2 world", function(){
    let expectedOut = [
      {"col": 1,"row": 0},
      {"col": 1,"row": 1},
      {"col": 0,"row": 1}
    ];
    deepEqual(findNeighbours(0,0,createGrid(2)), expectedOut);
  });
});

describe("countAliveNeighbours", function(){
  it("should return 0 for world containing all dead cells", function(){
    deepEqual(countAliveNeighbours(0, 0, createGrid(5)), 0);
  });
  it("should return number for alive neighbours cells", function(){
    let world = createWorld([{row:0,col:1},{row:1,col:0},{row:1,col:1}],3);
    deepEqual(countAliveNeighbours(0, 0, world), 3);
  });
});
