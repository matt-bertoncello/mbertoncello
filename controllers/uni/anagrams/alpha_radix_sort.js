// Matt Bertoncello, 27809587

// Radix sort

var exportObject = {}

exportObject.alphabetic_radix_sort =function(array) {
	/*
	Will sort the array. Ideal algorithm if elements have a similar/small length.
	:param array: an array with elements [key, data], the key must be a sting of alphabetic letters
	:return: an array sorted with keys.
	Best and Worst case time complexity: O(MN) where N is the length of the array and M is the length of the largest string
	*/
	var max_length = 0
	var array_length = array.length
	for (var x = 0; x < array_length; x++) {
		if (array[x][0].length > max_length) {
			max_length = array[x][0].length // determine the maximum length of the key
		}
	}

	for (var i = 0; i < max_length; i++) {
		var bucket = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
		var radix = 1 + i // radix represents letter being compared
		for (var j = 0; j < array_length; j++) {
			try {
				var key = (array[j][0][array[j][0].length - radix]).charCodeAt(0) - 96
			} catch (e){
				var key = 0
			}
			bucket[key].push(array[j])
		}

		array = [] // reset the array
		for (var n = 0; n < 27; n++) {
			for (var z = 0; z < bucket[n].length; z++) {
				array.push(bucket[n][z]) // append each element in the bucket in order to the array
			}
		}
	}
	return array
}

module.exports = exportObject;
