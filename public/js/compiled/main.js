/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classes = __webpack_require__(1);

	function convertToBin(str) {
	  var binary = [];
	  for (var i = 0; i < str.length; i++) {
	    var code = str.charCodeAt(i).toString(2);
	    if (code.length === 7) {
	      code = '0' + code;
	    }

	    binary.push(code.split(''));
	  }

	  return binary;
	}

	function toNumberFromMSB(binary) {
	  var n = 0;
	  // var p = 0;
	  for (var i = 0; i < binary.length; i++) {
	    var c = parseInt(binary[i]);
	    console.log("2 to the power of " + i, c, Math.pow(2, i));
	    n += c * Math.pow(2, i);
	  }

	  return n;
	}

	var Block = React.createClass({
	  displayName: 'Block',
	  render: function render() {
	    return React.createElement('div', { className: this.props.bit });
	  }
	});

	var Row = React.createClass({
	  displayName: 'Row',
	  render: function render() {
	    var baseClass = 'bit ';
	    var blocks = this.props.row.map(function (tile, i) {
	      var bitClassName = baseClass + (tile.bit ? 'bit-full' : 'bit-less') + ' col-xs-6';
	      return React.createElement(Block, { key: i, bit: bitClassName });
	    });
	    return React.createElement(
	      'div',
	      { className: 'row' },
	      blocks
	    );
	  }
	});

	var QR = React.createClass({
	  displayName: 'QR',
	  getInitialState: function getInitialState() {
	    return {};
	    // return { grid }
	  },
	  render: function render() {
	    var bits = this.props.grid.map(function (row, i) {
	      return React.createElement(Row, { row: row, key: i });
	    });
	    return React.createElement(
	      'div',
	      { className: 'container' },
	      bits
	    );
	  }
	});

	convertToBin('matt');

	function showReact(size) {
	  var grid = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	  grid = (0, _classes.createGrid)(21, 21);
	  ReactDOM.render(React.createElement(QR, { size: size, grid: grid }), document.getElementById('render'));
	  return grid;
	}

	// window.reactify = showReact;
	window.onload = showReact;
	window.getNeighborTemplate = _classes.getNeighborTemplate;
	window.createGrid = _classes.createGrid;
	window.createQRCode = _classes.createQRCode;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var LEFT = [0, -1, 0, -1, -2, -3, -2, -3];
	var UP = ['w', 'ne', 'w', 'ne', 'w', 'nw', 'w'];

	var NUMERIC = 1,
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
	    return {};
	  }
	}

	function convertToInteger(str) {
	  return str.split('').map(convertToBits);
	}

	function getNeighborTemplate(size) {
	  return [-(size + 1), -size, -size + 1, -1, 1, size - 1, size, size + 1];
	}

	function convertToBits(char) {
	  char = char.charCodeAt(0).toString(2);
	  return "0".repeat(8 - char.length) + char;
	}

	function getFixture(grid, n) {
	  return grid.filter(function (tile) {
	    return tile.fixture === n;
	  });
	}

	function setupFixture(fixture) {
	  fixture.forEach(function (tile, idx) {
	    var row = Math.floor(idx / 7);
	    var col = idx % 7;

	    if ((row === 1 || row === 5) && col > 0 && col < 6) {
	      tile.bit = false;
	    } else if ((col === 1 || col === 5) && row > 0 && row < 6) {
	      tile.bit = false;
	    }
	  });
	}

	function setupFixtures(grid) {
	  var fixtures = [getFixture(grid, 1), getFixture(grid, 2), getFixture(grid, 3)];
	  fixtures.forEach(function (fixture) {
	    return setupFixture(fixture);
	  });
	  return grid;
	}

	function prerender(tile) {
	  var col = tile.col;
	  var row = tile.row;

	  var colSection = Math.ceil((col + 1) / 7);
	  var rowSection = Math.ceil((row + 1) / 7);

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

	function transformGrid(grid, sqrt) {
	  var bits = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

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
	  var squared = Math.pow(x, 2);
	  var neighbors = getNeighborTemplate(x);

	  var grid = [];

	  for (var i = 0; i < squared; i++) {
	    var row = Math.floor(i / x),
	        col = i % x,
	        tile = neighbors.map(function (n) {
	      return n + i;
	    }),
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

	exports.getNeighborTemplate = getNeighborTemplate;
	exports.createGrid = createGrid;
	exports.createQRCode = createQRCode;

/***/ }
/******/ ]);