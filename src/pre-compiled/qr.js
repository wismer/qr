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