const ALPHABET  = [...'abcdefghijklmnopqrstuvwxyz'];
const ALPHA_REV = [...'zyxwvutsrqponmlkjihgfedcba'];

function encode(value, len, i) {
  var meta = { len, value };

  if (len === 4) {
    meta.type = 'Encoding';
  } else if (len === 6) {
    meta.type = 'Message Chunk';
  } else {
    meta.type = 'Message Length';
  }
  var binary = getBinary(value, len);
  meta.bits = binary.join('');
  return displayBinary(binary, meta);
}

function getBinary(val, len) {
  var bin = val.toString(2);
  return ('0'.repeat(len - bin.length) + bin).split('');
}

function displayBinary(binary, meta) {
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
  var masking = 32;
  // MSB in ordering ~ eg, 0 1 2
  //                       3 4 5
  // first bit is always whether to alternate direction or not
  var bitwiseKey = getBinary(key, 8);
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


    var bitwiseBit = bitwiseKey.pop();
    characters[i] = ALPHABET[val];
    if (bitwiseBit && bitwiseBit === '1') {
      defuck[val] = {
        val: val,
        masked: val ^ masking
      };
      // console.log('before mask', getBinary(val, 6))
      val = val ^ masking;
      // console.log('after mask', getBinary(val, 6))
    }
    locs.push(val);
  }


  var scrambledMessage = characters.join('');
  // <ENCODING_TYPE><LENGTH><KEY><MESSAGE>
  //     4 bits       8bits  6bits
  var payload = {
    encoding: encode(encoding, 4),
    msgLength: encode(length, 8),
    msgKey: encode(key, 6),
    message: locs.map((char, i) => encode(char, 6, i)),
    scrambled: scrambledMessage
  };
  return {defuck, payload};
}

export default caesarCipher;

