var exportObject = {};

exportObject.alphabetic_binary_search = function(array, key) {
	/*
	Will find the key in an arrays using binary search. Will then traverse left of the key to find the first instance of it
	:param araay: an array sorted in alphabetic order with increasing keys
	:param key: a string of alphabetic letters
	:return: the index of the array
	Best case time complexity: O(logN) if there is only one instance of the key and it is exactly in the middle of the array
	Worst case time complexity: O(logN + N) if a large portion of the array has the same key
	*/
	var N = array.length
	var lo = 0
	var hi = N
	var mid

	while (lo < (hi - 1)) {
		mid = Math.floor((lo + hi) / 2)
		if (gte(key, array[mid][0])) {
			lo = mid
		} else {
			hi = mid
		}
	}

	if (N > 0 && array[lo][0] === key) {
		while (lo >= 0 && array[lo][0] === key) { // if key is found, traverse left until the first key is found
			lo -= 1
		}
		return lo + 1
	} else {
		throw "IndexError Could not find index"
	}
}

function gte(s1, s2) {
	/*
    greater then or equal to. The longer string is greater than. Otherwise it is alphabetical.
    :param s1: string
    :param s2: string
    :return: boolean
    Best case time complexity: O(1) if len(s1) > len(s2)
    Worst time complexity: O(N) if the strings are the same except for the last letter
    */
	var x;
	if (s1.length > s2.length || s1 === s2) {
		return true
	} else if (s1.length < s2.length) {
		return false
	} else {
		x = 0
		while (s1[x] === s2[x]) {
			x += 1
		}
	}
	return s1[x].charCodeAt(0) > s2[x].charCodeAt(0)
}

module.exports = exportObject;
