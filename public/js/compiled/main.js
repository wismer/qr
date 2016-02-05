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

	var _classes2 = _interopRequireDefault(_classes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    var blocks = this.props.bit.map(function (bit, i) {
	      var bitClassName = baseClass + (bit ? 'bit-less' : 'bit-full') + ' col-xs-6';
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
	    var bits = [];
	    for (var i = 0; i < 21; i++) {
	      // bits.push(makeRow(i));
	    }
	    return { bits: bits };
	  },
	  shuffleBits: function shuffleBits(bits) {
	    this.setState({
	      bits: this.state.bits.map(function (bit) {
	        return bit.map(function (b) {
	          var n = Math.random();
	          return n > 0.5;
	        });
	      })
	    });
	  },
	  componentWillMount: function componentWillMount() {
	    // setInterval(this.shuffleBits, 1000);
	  },
	  render: function render() {
	    var bits = this.state.bits.map(function (bit, i) {
	      return React.createElement(Row, { bit: bit, key: i });
	    });
	    return React.createElement(
	      'div',
	      { className: 'container' },
	      bits
	    );
	  }
	});

	convertToBin('matt');

	function showReact() {
	  ReactDOM.render(React.createElement(QR, null), document.getElementById('render'));
	}

	window.onload = showReact;
	window.QRCode = _classes2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// const DIRECTION = {
	//   top: [[1,2], [4,3], [6,5], [8,7]],
	//   left:
	// };

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

	var Tile = function () {
	  function Tile(bit, connections) {
	    _classCallCheck(this, Tile);

	    this.x = bit.x;
	    this.y = bit.y;
	    this.connections = connections;
	    this.isDark = bit.x % 2 !== 0;
	  }

	  _createClass(Tile, [{
	    key: 'color',
	    value: function color(bit) {
	      if (this.isDark) {
	        this.bit = bit === '0';
	      } else {
	        this.bit = bit === '1';
	      }
	    }
	  }]);

	  return Tile;
	}();

	var Layer = function () {
	  function Layer() {
	    _classCallCheck(this, Layer);
	  }

	  _createClass(Layer, [{
	    key: 'up',
	    value: function up(grid, chunk, coords) {
	      var point = coords.point;
	      var rowLength = coords.rowLength;

	      var tiles = [];
	      for (var i = 0; i < chunk.size / 2; i++) {
	        var l = chunk.bits[i];
	        var r = chunk.bits[i + 1];

	        var rpt = point - i * rowLength - 1;
	        var lpt = point - i * rowLength - 2;
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
	  }, {
	    key: 'left',
	    value: function left(grid, chunk, coords) {
	      var point = coords.point;
	      var rowLength = coords.rowLength;

	      LEFT.forEach(function (mod, idx) {
	        var bit = chunk.bits[idx];
	        var tile = grid.get(point + mod - rowLength);
	        tile.color(bit);
	      });
	    }
	  }]);

	  return Layer;
	}();

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
	  return string + ', as number ' + code + ' -> ' + value + ', went from ' + binaryOfString + ' to ' + binaryOfChange;
	}

	var QRCode = function () {
	  function QRCode(encodingType, message, size) {
	    _classCallCheck(this, QRCode);

	    this._encoding = encodingRules(encodingType);
	    this.message = message;
	    this.size = size || 21;
	    this.fixed = false;
	    this.grid = this._buildGrid();
	    this.layerMaker = new Layer();
	  }

	  _createClass(QRCode, [{
	    key: '_buildGrid',
	    value: function _buildGrid() {
	      var map = new Map();
	      var tileCount = this.size * this.size;
	      var tile,
	          connections = {};
	      for (var i = 0; i < tileCount; i++) {
	        var x = Math.floor(i / this.size);
	        var remainder = i - x * this.size;
	        var y = remainder === this.size ? 0 : remainder;
	        connections.isKeystone = x % 6 === 0 && y % 6 === 0;
	        connections.diag = {
	          ne: i + 1 - this.size,
	          nw: i - 1 - this.size,
	          se: i + 1 + this.size,
	          sw: i - 1 + this.size
	        };
	        connections.linear = {
	          up: i - this.size,
	          down: i + this.size,
	          left: i - 1,
	          right: i + 1
	        };

	        tile = new Tile({ x: x, y: y }, connections);
	        map.set(i, tile);
	      }

	      return map;
	    }
	  }, {
	    key: 'setBlock',
	    value: function setBlock() {
	      var layerMaker = this.layerMaker;
	      var grid = this.grid;

	      layerMaker.up(grid, { size: 8, bits: '01110111' }, { point: 441, rowLength: 21 });
	    }
	  }, {
	    key: 'setFixtures',
	    value: function setFixtures() {
	      var grid = this.grid;
	      var encoding = this.encoding;
	      var size = this.size;

	      var boundary = Math.sqrt(size) / 3 - 1;

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = grid.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _step$value = _slicedToArray(_step.value, 2);

	          var key = _step$value[0];
	          var tile = _step$value[1];

	          if (key <= boundary) {}
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'setEncoding',
	    value: function setEncoding() {
	      var grid = this.grid;
	    }
	  }, {
	    key: 'encode',
	    value: function encode() {
	      var chars = this.message.split('');
	      this.encoding = chars.map(function (b) {
	        var binary = b.charCodeAt(0).toString(2);
	        if (binary.length === 7) {
	          binary = '0' + binary;
	        } else if (binary.length === 6) {
	          binary = '00' + binary;
	        }

	        return binary.split('');
	      });
	    }
	  }, {
	    key: 'row',
	    value: function row(x) {
	      return this.encoding[x];
	    }
	  }, {
	    key: 'column',
	    value: function column(y) {
	      // return this.encoding.map((row, i) => {
	      //   return row[i];
	      // });
	    }
	  }]);

	  return QRCode;
	}();

	exports.default = QRCode;

/***/ }
/******/ ]);