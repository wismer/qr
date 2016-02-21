const OPERATORS = [
  { symbol: '^', meaning: 'XOR', explanation: 'todo' },
  { symbol: '|', meaning: 'TODO', explanation: 'todo' },
  { symbol: '&', meaning: 'TODO', explanation: 'todo' },
  { symbol: '<<', meaning: 'TODO', explanation: 'todo' },
  { symbol: '>>', meaning: 'TODO', explanation: 'todo' },
  { symbol: '~', meaning: 'TODO', explanation: 'todo' },
  // needs more.
];


// i should start doing this for comments....
// String -> Array<String>
function convert8bits(bits) {
  return ('0'.repeat(8 - bits.length) + bits).split('');
}

let Bit = React.createClass({
  handleClick() {
    this.props.bitSelect(this.props.key);
  },

  render() {
    var className = this.props.bit === '1' ? 'bit bit-full' : 'bit bit-less';
    className += ' col-md-4';
    return (
      <div key={this.props.key} onClick={this.handleClick} className={className}>{this.props.bit}</div>
    );
  }
});

let BitWiseOutput = React.createClass({
  handleBitSelection(i) {
    if (this.props.fixed) {
      return;
    }
    var number = this.props.number;
    var bits = number.toString(2);
    bits = ('0'.repeat(8 - bits.length) + bits).split('');
    bits[i] = bits[i] === '0' ? '1' : '0';
    var operand = parseInt(bits.join(''), 2);
    this.props.changeOperand(operand);
  },

  render() {
    var className = this.props.fixed ? 'chunk' : 'chunk chunk-operand';
    var number = this.props.number.toString(2);
    number = ('0'.repeat(8 - number.length) + number).split('');
    var bits = number.map((bit, i) => <Bit bitSelect={this.handleBitSelection.bind(this, i)} key={i} bit={bit} />);
    return (
      <div className={className + ' row'}>
        {bits}
        <div className='eq bit bit-less col-md-4'>
          =
        </div>
        <div className='num bit bit-less col-md-4'>
          {this.props.number}
        </div>
      </div>
    );
  }
});

let BitWiseOperators = React.createClass({
  handleSelection(operator) {
    this.props.handleBitWiseOp(operator);
  },

  handleHover(operator) {
    if (operator.symbol === '~') {
      console.log('I need to do something with this.');
    }
  },

  render() {
    var operators = OPERATORS.map((operator, i) => {
      return (
        <div onMouseOver={this.handleHover.bind(this, operator)} onClick={this.handleSelection.bind(this, operator)} key={i} className='operator col-md-4'>
          {operator.symbol}
        </div>
      );
    });
    return (
      <div className='row operator-row'>
        {operators}
      </div>
    );
  }
});

let BitWise = React.createClass({
  getInitialState() {
    return {
      selectedDigit: 2,
      activeOperand: 1,
      explanation: ''
    };
  },

  randomizeNumber() {
    this.setState({
      selectedDigit: Math.floor(Math.random() * 255)
    });
  },

  changeOperand(activeOperand) {
    this.setState({ activeOperand });
  },

  applyBitwiseOperation(operator) {
    var { selectedDigit, activeOperand } = this.state;
    var explanation = operator.explanation;
    console.log(selectedDigit, activeOperand);
    switch (operator.symbol) {
      case '|':
        selectedDigit |= activeOperand;
        break;
      case '~':
        var nstring = convert8bits(selectedDigit.toString(2));
        for (var i = 0; i < 8; i++) {
          nstring[i] = nstring[i] === '0' ? '1' : '0';
        }

        selectedDigit = parseInt(nstring.join(''), 2);
        break;
      case '<<':
        selectedDigit <<= activeOperand;
        break;
      case '>>':
        selectedDigit >>= activeOperand;
        break;
      case '&':
        selectedDigit &= activeOperand;
        break;
      case '^':
        selectedDigit ^= activeOperand;
        break;
      default:
        selectedDigit;
    }

    // console.log(selectedDigit);

    this.setState({
      selectedDigit, activeOperand, explanation
    });
  },

  render() {
    return (
      <div className='container'>
        <div className='randomize'>
          <button onClick={this.randomizeNumber}>Click to Start</button>
        </div>

        <section className='bit-output'>
          <BitWiseOutput fixed={true} number={this.state.selectedDigit} />
        </section>

        <section className='explanation'>
          {this.state.explanation}
        </section>

        <section className='bit-input'>
          <BitWiseOutput fixed={false} changeOperand={this.changeOperand} number={this.state.activeOperand} />
        </section>

        <section className='bitwise'>
          <BitWiseOperators handleBitWiseOp={this.applyBitwiseOperation} />
        </section>
      </div>
    );
  }
});

export default BitWise;