var radixSort = require('./radixSort').radixSort;

bwtController = {};

bwtController.compress = function(string) {
  string = string.split('\n').join('-'); // replace newline with -
  string = string.split(' ').join('*'); // replace space with *
  bwt = get_bwt(string + '$'); // end string with $
  b = '';
  for (var i=0; i<bwt.length; i++) {
    b += bwt[i];
  }

  compressed = compress_bwt(bwt);

  return {string: compressed, inputLength: string.length, outputLength: compressed.length};
}

function get_bwt(string) {
  array = [];
  for (var i=0; i<string.length; i++) {
    //st = string[i:] + string[0:i]; // generating cyclic rotations
    st = string.substr(i, string.length) + string.substr(0, i) ;
    array.push(st);
  }
  array.sort(); // sorting the cyclic rotations according to unicode values

  bwt = []
  for (var i=0; i<array.length; i++) {
    bwt.push(array[i][array[i].length-1])
  }

  return bwt
}

function compress_bwt(bwt) {
  encoded = '';
  count = 0;
  prevChar = bwt[0];
  for (var i=0; i<bwt.length; i++) {
    if (bwt[i] == prevChar) {
      count += 1
    } else {
      if (count == 1) { // if there was only 1 character in a row, don't include the 1.
        encoded = encoded + prevChar;
      } else { // if there are multiple characters in a row, inlude the count.
        encoded = encoded + count + prevChar;
      }
      prevChar = bwt[i]
      count = 1
    }
  }

  if (count == 1) { // if there was only 1 character in a row, don't include the 1.
    encoded = encoded + bwt[bwt.length-1];
  } else { // if there are multiple characters in a row, inlude the count.
    encoded = encoded + count + bwt[bwt.length-1];
  }

  return encoded
}


module.exports = bwtController;
