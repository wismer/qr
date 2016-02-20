const ALPHABET  = [...'abcdefghijklmnopqrstuvwxyz'];
const ALPHA_REV = [...'zyxwvutsrqponmlkjihgfedcba'];

function createBitfield(len) {
  // don't overthink it. Just randomize.
  var bit = 0b0;
  for (var i = 0; i < len; i++) {
    var n = Math.random();
    if (n < 0.5) {
      bit |= 1;
    }
    bit <<= 1;
  }

  return encode(bit);
}

function encode(value, len) {
  var meta = { len, value };
  meta.type = 'Bitfield';

  if (len === 4) {
    meta.type = 'Encoding';
  } else if (len === 6) {
    meta.type = 'Message Chunk';
  } else if (len === 8) {
    meta.type = 'Message Length';
  }

  var binary = getBinary(value, len);
  meta.bits = binary.join('');
  return displayBinary(binary, meta);
}

function getBinary(val, len) {
  var bin = val.toString(2);
  if (len) {
    return ('0'.repeat(len - bin.length) + bin).split('');
  }

  return bin.split('');
}

function displayBinary(binary, meta) {
  if (binary.length % 2 !== 0) {
    binary.pop();
  }
  var len = binary.length / 2;
  return {
    top: binary.slice(0, binary.length / 2),
    bottom: binary.slice(len, binary.length),
    meta: meta
  };
}

function caesarCipher(message) {
  var encoding = 1;
  var length = message.length;
  var key = 21;
  var defuck = {};
  // masking - scrambles the message
  // 1 or 01 = top row has reverse polarity (bit wise)
  // 2 or 11 = bottom row has reverse polarity
  // 3 or 10 = No polarity
  // MSB in ordering ~ eg, 0 1 2
  //                       3 4 5
  // first bit is always whether to alternate direction or not

  var characters = message.split(''),
      locs = [];

  for (var i = 0; i < length; i++) {
    var char = characters[i],
        loc  = ALPHABET.indexOf(char),
        val;
    if (loc < 0) {
      characters[i] = ' ';
      continue;
    } else if ((loc + key) > 25) {
      val = (loc + key) - 25;
    } else {
      val = loc + key;
    }


    characters[i] = ALPHABET[val];
    locs.push(val);
  }


  var scrambledMessage = characters.join('');
  // <ENCODING_TYPE><BITFIELD><LENGTH><KEY><MESSAGE>
  //     4 bits       8bits  6bits
  var payload = {
    bitfield: createBitfield(locs.length),
    encoding: encode(encoding, 4),
    msgLength: encode(length, 8),
    msgKey: encode(key, 6),
    message: locs.map((char, i) => encode(char, 6, i)),
    scrambled: scrambledMessage
  };
  return {defuck, payload};
}

export default caesarCipher;

