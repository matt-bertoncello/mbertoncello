radixSort = {};

/*
Will sort the array. Ideal algorithm if elements have a similar/small length
:param array: an array of positive integers
:return: a sorted array of positive integers
Best and Worst case time complexity: O(MN) where N is the length of the array and M is the length of the largest element
*/
radixSort.sort = function(array) {
  var max_length = 0;
  for (var i=0; i<array.length; i++) {
      if (array[i][0].toString().length > max_length) {
          max_length = array[i][0].toString().length;
        }
  }

  for (var i=0; i<max_length; i++) {
      var bucket = [[], [], [], [], [], [], [], [], [], []]   // set 10 buckets
      var radix = Math.pow(bucket.length, i);

      for (var j=0; j<array.length; j++) {
          bucket[Math.floor(array[j][0]/radix)%(bucket.length)].push(array[j]);    // append the entire element to the bucket.
      }

      var array = []          // reset the array
      for (var n=0; n<bucket.length; n++) {
          for (var z=0; z<bucket[n].length; z++) {
              array.push(bucket[n][z]);       // append each element in the bucket in order to the array
          }
      }
    }

  return array
}

module.exports = radixSort;
