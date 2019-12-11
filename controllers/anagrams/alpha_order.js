// Matt Bertoncello, 27809587, 12/08/2017

// counting sort for a string of letters to put in alphabetical order in O(N) time.

var exportObject = {};

exportObject.alphabetic_order = function(string){
    /*
    uses counting sort algorithm to order a string in alphabetic order
    :param string: a string of letters in the alphabet
    :return: a string in alphabetic order
    Best and Worst case time complexity: O(N) where N is the length of the string.
    */
    var bucket = Array(26).fill(0)     // create 26 buckets
	var len = string.length

	for (var x=0; x<len; x++){
        bucket[string[x].charCodeAt(0)-97] += 1     // incremement each bucket depending on the ascii value of the string
	}

    output = ""
    for (var i=0; i<26; i++){
        for (var j=0; j<bucket[i]; j++){
            output += String.fromCharCode(i+97)         // output will be in alphabetic order
		}
	}

    return output
}

module.exports = exportObject;
