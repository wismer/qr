

const LEFT = [0, -1, 0, -1, -2, -3, -2, -3];
const UP   = ['w', 'ne', 'w', 'ne', 'w', 'nw', 'w'];

const NUMERIC = 1,
      ALPHANUMERIC = 2,
      BYTE_ENCODING = 3;


function encodingRules(type) {
  if (type === NUMERIC) {
    return {
      name: 'Numeric',
      bitlength: 10,
      enc: '0001'
    };
  } else if (type === BYTE_ENCODING) {
    return {
      name: 'Byte',
      bitlength: 8,
      enc: '1011'
    };
  } else if (type === ALPHANUMERIC) {
    return {

    };
  }
}


function convertToInteger(str) {
  return str.split('').map(convertToBits);
}


function getNeighborTemplate(size) {
  return [
    -(size + 1),
    -size,
    -size + 1,
    -1,
    1,
    size - 1,
    size,
    size + 1
  ];
}

function convertToBits(char) {
  char = char.charCodeAt(0).toString(2);
  return "0".repeat(8 - char.length) + char;
}

function getFixture(grid, n) {
  return grid.filter(tile => tile.fixture === n);
}

function setupFixture(fixture) {
  fixture.forEach((tile, idx) => {
    var [row, col] = [Math.floor(idx / 7), idx % 7];
    if ((row === 1 || row === 5) && (col > 0 && col < 6)) {
      tile.bit = false;
    } else if ((col === 1 || col === 5) && (row > 0 && row < 6)) {
      tile.bit = false;
    }
  });
}

function setupFixtures(grid) {
  var fixtures = [getFixture(grid, 1), getFixture(grid, 2), getFixture(grid, 3)];
  fixtures.forEach(fixture => setupFixture(fixture));
  return grid;
}

function prerender(tile) {
  const { col, row } = tile;
  const colSection = Math.ceil((col + 1) / 7);
  const rowSection = Math.ceil((row + 1) / 7);

  if (rowSection === 1 && colSection === 1) {
    tile.isFixed = true;
    tile.fixture = 1;
  } else if (rowSection === 1 && colSection === 3) {
    tile.isFixed = true;
    tile.fixture = 2;
  } else if (rowSection === 3 && colSection === 1) {
    tile.fixture = 3;
    tile.isFixed = true;
  } else {
    tile.isFixed = false;
  }

  tile.bit = tile.isFixed;

  return tile;
}

function transformGrid(grid, sqrt, bits=[]) {
  setupFixtures(grid);
  for (var i = 0; i < grid.length; i += sqrt) {
    var row = grid.slice(i, i + sqrt);
    bits.push(row);
  }

  return bits;
}

function createGrid(x, y) {
  if (x !== y) {
    throw "No";
  }
  const squared   = Math.pow(x, 2);
  const neighbors = getNeighborTemplate(x);

  let grid = [];

  for (var i = 0; i < squared; i++) {
    var row  = Math.floor(i / x),
        col  = i % x,
        tile = neighbors.map(n => n + i),
        details = {
          bit: false,
          neighbors: tile,
          flip: row % 2 === 0,
          isFixed: false,
          col: col,
          row: row
        };
    grid.push(details);
  }
  grid = grid.map(prerender);
  return transformGrid(grid, x);
}

function createQRCode(string) {
  var bits = convertToInteger(string);
  return bits;
}


export {
  getNeighborTemplate,
  createGrid,
  createQRCode
};