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


export {
  Bit
};