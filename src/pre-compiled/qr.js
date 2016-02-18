import { createGrid, getNeighborTemplate, createQRCode, compass } from './classes';

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
    n += (c * Math.pow(2, i));
  }

  return n;
}


var Block = React.createClass({
  render() {
    return (
      <div className={this.props.bit}></div>
    )
  }
});

var Row = React.createClass({
  render() {
    var baseClass = 'bit ';
    var blocks = this.props.row.map(function(tile, i) {
      // if (!tile.isFixed) {
      //   tile.bit = Math.random() > 0.5;
      // }
      var bitClassName = baseClass + (tile.bit ? 'bit-full' : 'bit-less') + ' col-xs-6';
      return <Block key={i} bit={bitClassName} />
    })
    return (
      <div className='row'>
        {blocks}
      </div>
    )
  }
});


var QR = React.createClass({
  getInitialState() {
    return {};
    // return { grid }
  },

  render() {
    var bits = this.props.grid.map(function(row, i){
      return <Row row={row} key={i} />
    });
    return (
      <div className='container'>
        {bits}
      </div>
    )
  }
});

convertToBin('matt');

function showReact(size, grid=false) {
  grid = createGrid(21, 21);
  ReactDOM.render(
    <QR size={size} grid={grid}/>,
    document.getElementById('render')
  );
  return grid;
}



function convertToBits(value, limit=8) {
  var bits;
  if (typeof value === 'number') {
    bits = value.toString(2);
  } else {
    bits = value.charCodeAt(0).toString(2);
  }

  return '0'.repeat(limit - bits.length) + bits;
}

function generateQRCode(size, message, encodingType) {
  var payload = [convertToBits(encodingType, 4), convertToBits(message.length)];
  var pos     = Math.pow(size, 2) - 1;
  const chars = [...message];
  payload     = payload.concat(chars.map(convertToBits));

  // the encoding type, message length and the message itself gets encoding into
  // binary like so [ENCODING_TYPE [4bits], MESSAGE_LENGTH [8 bits], MESSAGE [8 bits per segment]]

  // one method to lay out the grid is to first work with this array...

}

// fns that convert string to binary
//

function QRCodeGenerator() {

}

export default QRCodeGenerator;