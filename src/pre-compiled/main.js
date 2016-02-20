import "babel-polyfill";
import caesarCipher from './caesar';
const ALPHABET  = [...'abcdefghijklmnopqrstuvwxyz'];

var Chunk = React.createClass({
  getInitialState() {
    return { active: false };
  },

  handleMouseEnter(didEnter) {
    this.setState({ active: didEnter }, () => {
      // console.log('why', didEnter);
    });
  },

  render() {
    var className = 'row chunk';
    var meta = this.props.meta;

    if (this.state.active) {
      className += ' chunk-active';
    }

    var value = (meta.value ^ 32) - 21;
    var letter;

    if (value < 0) {
      letter = ALPHABET[value + 25];
    } else {
      letter = ALPHABET[value];
    }

    letter = this.state.active ? letter : '';

    return (
      <div className={className} onMouseEnter={this.handleMouseEnter.bind(this, true)} onMouseLeave={this.handleMouseEnter.bind(this, false)}>
        <div className='col-xs-5 subset'>
          <div className='top-row'>
            <Row tiles={this.props.top} />
          </div>
          <div className='bottom-row'>
            <Row tiles={this.props.bottom} />
          </div>
        </div>

        <div className='col-xs-4 subset'>
          {meta.bits}
        </div>

        <div className='col-xs-4 subset'>
          {letter}
        </div>
      </div>
    );
  }
});

var Row = React.createClass({
  render() {
    var translation = '';
    var tiles = this.props.tiles.map((tile, key) => {
      var divClass = tile === '1' ? 'bit-full' : 'bit-less';
      return (
        <div key={key} className={'bit ' + divClass}></div>
      );
    });
    return (
      <div>
        <div className='bit-code'>
          {tiles}
        </div>

        <div className='translation'>
          {translation}
        </div>
      </div>
    )
  }
})

var StringInput = React.createClass({

  render() {
    return (
      <div className='string-input'>
        <div>
          <label>Enter in Something</label>
          <input type='text' name='string' defaultValue=''></input>
        </div>
        <div>
          <label>Enter in Key</label>
          <input type='text' name='key' defaultValue=''></input>
        </div>
        <div>
          <input type='button' onclick={this.handleClick}></input>
        </div>
      </div>
    )
  }
});

var CaesarCipher = React.createClass({
  getInitialState() {
    var state = caesarCipher('the gauls advance');
    state.text = '';
    return state;
  },

  handleChange(e) {
    var state = caesarCipher(e.target.value);
    state.text = e.target.value;
    this.setState(state);
  },

  render() {
    var crap = this.state.payload;
    var defuck = this.state.defuck;

    var payload = crap.message.map((m, i) => {
      return (
        <div key={i}>
          <Chunk {...m} isMessageChunk={true} />
        </div>
      );
    });

    return (
      <div className='container'>
        <div className='string-input'>
          <div>
            <label>Enter in Something</label>
            <input type='text' name='string' defaultValue='' value={this.state.text} onChange={this.handleChange}></input>
          </div>
          <div>
            <label>Enter in Key</label>
            <input type='text' name='key' defaultValue='' ></input>
          </div>
          <div>
            <button onclick={this.handleClick}>OK</button>
          </div>
        </div>

        <div className='row'>
          <div>
            <Chunk {...crap.encoding} />
          </div>

          <div>
            <Chunk {...crap.bitfield} />
          </div>

          <div>
            <Chunk {...crap.msgLength} />
          </div>

          <div>
            <Chunk {...crap.msgKey} />
          </div>

          {payload}
        </div>
      </div>
    )
  }
});



window.caesarCipher = caesarCipher;
window.onload = function() {
  ReactDOM.render(
    <CaesarCipher />,
    document.getElementById('render')
  )
}
// window.reactify = showReact;
// window.compass = compass;
// window.onload = showReact;
// window.getNeighborTemplate = getNeighborTemplate;
// window.createGrid = createGrid;
// window.createQRCode = createQRCode;