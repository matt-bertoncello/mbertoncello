var radixSort = require('./radixSort').sort;

bwtController = {};

/*
Compress a string by using the Burrows-Wheeler Transform and compressing duplicated letters.
Can be decompressed with the 'decompress' function defined below.
*/
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

/*
Using the Burrows-Wheeler Transform, sort the input string via cyclic rotations.
Return the sorted string.
*/
function get_bwt(string) {
  array = [];
  for (var i=0; i<string.length; i++) {
    st = string.substr(i, string.length) + string.substr(0, i); // generating cyclic rotations
    array.push(st);
  }
  array.sort(); // sorting the cyclic rotations according to unicode values

  bwt = []
  for (var i=0; i<array.length; i++) {
    bwt.push(array[i][array[i].length-1])
  }

  return bwt
}

/*
Input a string. If there are multiple characters in a row, replace it via the rule below:
input: aaaabbbbb
output: 4a6b
Return the compressed string.
*/
function compress_bwt(bwt) {
  var encoded = '';
  var count = 0;
  var prevChar = bwt[0];
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

// Returns true if string is a number;
function isNumeric(string){
  return !isNaN(string)
}

/*
Expand string. ie, 4a -> aaaa
and 2te10st -> ttesssssssssst
*/
function expandString(string) {
  if (string === '') {
    return '';
  }

  var output = '';
  var count = 1;
  // if first character is a number, update count. Else add it to output.
  if (isNumeric(string[0])) {
    count = parseInt(string[0]);
  } else {
    output += string[0];
  }

  // decompress string (where input is 4a -> aaaa)
  for (var i=1; i<string.length;i++) {
    prevChar = string[i-1];
    thisChar = string[i];
    // If this is a character, and the previous character was a number. Populate the previous number count times and reset count;
    if (isNumeric(prevChar) && !isNumeric(thisChar)) {
      output += Array(count+1).join(thisChar);
      count = 1;
    }
    // If this is a number and the previous character was a number, concatentate the two numbers.
    else if (isNumeric(prevChar) && isNumeric(thisChar)) {
      count = parseInt(count + '' + thisChar);
    }
    // If this is a number and the previous character was a character, update count.
    else if (!isNumeric(prevChar) && isNumeric(thisChar)){
      count = parseInt(thisChar);
    }
    // If this is a character and prevChar was a character, insert this char.
    else if (!isNumeric(prevChar) && !isNumeric(thisChar)) {
      output += thisChar;
    }
  }


  return output;  // O(N) to print
}

/*
Decompress a string that was compressed using the BWT compress function above.
*/
bwtController.decompress = function(string) {

  var M = 255; // define the library size (number of valid ascii characters)
  var bucket = Array(M+1).fill(0); // create a 'bucket' for each ascii character.
  var last = []   // this will be the compressed array

  string = expandString(string);

  // For each character in the expanded string. Increment the count in the bucket array,
  // and save that instance in order in the last array.
  for (var i=0; i<string.length; i++) {
    var asciiChar = string.charCodeAt(i);
    bucket[asciiChar] += 1;
    last.push([asciiChar, bucket[asciiChar]]);
  }

  // Create a rank array that records the row number of the first occurrence of each character in sorted order
  rank = Array(M).fill(-1);
  first = radixSort(last)    // radix_sort is O(MN), where N is the length of the original text. M will always be 3.
  for (var j=0; j<first.length;j++ ) {
    if (rank[first[j][0]] == -1) { // if this is the first instance of a character set the rank array
      rank[first[j][0]] = j;
    }
  }

  row = 0;
  output = '';
  for (var k=0; k<last.length-1; k++) {   // iterate for the number of rows O(N)
    asciiChar = last[row][0]   // the ascii value of the char
    if (asciiChar == 42) {
      output = " " + output;   // if '*' replace with a space
    } else if (asciiChar == 45) {
      output = '\n' + output;  // if '-' repace with a newline
    } else {
      output = String.fromCharCode(asciiChar) + output;
    }

    row = rank[asciiChar] + last[row][1]-1    // defines next row to go to
  }

  return {string: output, inputLength: string.length, outputLength: output.length};;
}

module.exports = bwtController;
