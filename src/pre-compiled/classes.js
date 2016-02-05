// const DIRECTION = {
//   top: [[1,2], [4,3], [6,5], [8,7]],
//   left:
// };

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

class Tile {
  constructor(bit, connections) {
    this.x = bit.x;
    this.y = bit.y;
    this.connections = connections;
    this.isDark = bit.x % 2 !== 0;
  }

  color(bit) {
    if (this.isDark) {
      this.bit = bit === '0';
    } else {
      this.bit = bit === '1';
    }
  }
}

class Layer {
  up(grid, chunk, coords) {
    var { point, rowLength } = coords;
    var tiles = [];
    for (var i = 0; i < (chunk.size / 2); i++) {
      var [l, r] = [chunk.bits[i], chunk.bits[i + 1]];
      var rpt = point - (i * rowLength) - 1;
      var lpt = point - (i * rowLength) - 2;
      grid.get(rpt).color(l);
      grid.get(lpt).color(r);
      //
      // if (i % 2 === 0) {
      //   // even row -> 0 is "dark" 1 is "light"
      //   rtile.bit = l === '0';
      //   ltile.bit = r === '0';
      // } else {
      //   // odd row -> 1 is "dark" 0 is "light"
      //   rtile.bit = l === '1';
      //   ltile.bit = r === '1';
      // }
      //
      // tiles.push(rtile);
      // tiles.push(ltile);
    }

    console.log(tiles);

    return tiles;
  }

  left(grid, chunk, coords) {
    var { point, rowLength } = coords;
    LEFT.forEach((mod, idx) => {
      var bit = chunk.bits[idx];
      var tile = grid.get(point + mod - rowLength);
      tile.color(bit);
    });
  }
}

function bitwise(operator, string, operand) {
  var code = string.charCodeAt(0);
  var value;
  if (operator === '^') {
    value = code ^ operand;
  } else if (operator === '<<') {
    value = code << operand;
  } else if (operator === '>>') {
    value = code >> operand;
  } else if (operator === '&') {
    value = code & operand;
  } else if (operator === '|') {
    value = code | operand;
  } else if (operator === '>>>') {
    value = code >>> operand;
  } else {
    value = code;
  }

  var binaryOfString = code.toString(2);
  var binaryOfChange = value.toString(2);
  return `${string}, as number ${code} -> ${value}, went from ${binaryOfString} to ${binaryOfChange}`;
}

class QRCode {
  constructor(encodingType, message, size) {
    this._encoding  = encodingRules(encodingType);
    this.message    = message;
    this.size       = size || 21;
    this.fixed      = false;
    this.grid       = this._buildGrid();
    this.layerMaker = new Layer();
  }

  _buildGrid() {
    var map = new Map();
    var tileCount = this.size * this.size;
    var tile, connections = {};
    for (var i = 0; i < tileCount; i++) {
      var x          = Math.floor(i / this.size);
      var remainder  = i - (x * this.size);
      var y          = remainder === this.size ? 0 : remainder;
      connections.isKeystone = x % 6 === 0 && y % 6 === 0;
      connections.diag = {
        ne: (i + 1) - this.size,
        nw: (i - 1) - this.size,
        se: (i + 1) + this.size,
        sw: (i - 1) + this.size
      };
      connections.linear = {
        up: i - this.size,
        down: i + this.size,
        left: i - 1,
        right: i + 1
      };

      tile      = new Tile({ x, y }, connections);
      map.set(i, tile);
    }

    return map;
  }

  setBlock() {
    var { layerMaker, grid } = this;

    layerMaker.up(grid, { size: 8, bits: '01110111' }, { point: 441, rowLength: 21 });
  }

  setFixtures() {
    var { grid, encoding, size } = this;
    var boundary = (Math.sqrt(size) / 3) - 1;


    for (var [key, tile] of grid.entries()) {
      if (key <= boundary) {

      }
    }
  }

  setEncoding() {
    var grid = this.grid;
  }

  encode() {
    var chars = this.message.split('');
    this.encoding = chars.map(b => {
      var binary = b.charCodeAt(0).toString(2);
      if (binary.length === 7) {
        binary = '0'  + binary;
      } else if (binary.length === 6) {
        binary = '00' + binary;
      }

      return binary.split('');
    });
  }

  row(x) {
    return this.encoding[x];
  }

  column(y) {
    // return this.encoding.map((row, i) => {
    //   return row[i];
    // });
  }
}

export default QRCode;