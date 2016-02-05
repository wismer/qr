import QRCode from './classes';

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
    var blocks = this.props.bit.map(function(bit, i) {
      var bitClassName = baseClass + (bit ? 'bit-less' : 'bit-full') + ' col-xs-6';
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
    var bits = [];
    for (var i = 0; i < 21; i++) {
      // bits.push(makeRow(i));
    }
    return { bits }
  },

  shuffleBits(bits) {
    this.setState({
      bits: this.state.bits.map(function(bit){
        return bit.map(function(b){
          var n = Math.random();
          return n > 0.5;
        })
      })
    });
  },

  componentWillMount() {
    // setInterval(this.shuffleBits, 1000);
  },

  render() {
    var bits = this.state.bits.map(function(bit, i){
      return <Row bit={bit} key={i} />
    });
    return (
      <div className='container'>
        {bits}
      </div>
    )
  }
});

convertToBin('matt');

function showReact() {
  ReactDOM.render(
    <QR />,
    document.getElementById('render')
  );
}

window.onload = showReact;
window.QRCode = QRCode;