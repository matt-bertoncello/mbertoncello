var dictionary = require('./dictionary').dictionary;
var alphabetic_binary_search = require('./alpha_binary_search').alphabetic_binary_search;
var alphabetic_order = require('./alpha_order').alphabetic_order;
var alphabetic_radix_sort = require('./alpha_radix_sort').alphabetic_radix_sort;
var https = require('https');

var fs = require('fs');

var anagramController = {};

class AnagramTable {
	constructor(dictionary) {
    this.dictionary = dictionary;
		this.init();
		this.array;
	}
	init() {
		var dict_length = this.dictionary.length;
		var array = Array(dict_length).fill(null);
		var x = 0;
		while (x < dict_length) {
			var word = this.dictionary[x]
			array[x] = [this.get_key(word), word]
			x += 1;
		}
		this.array = array;
    console.log('[INFO] created word array');
	}
	get_key(string) {
		return alphabetic_order(string);
	}
	get_anagrams(string) {
		var key = this.get_key(string);
		try {
			var index = alphabetic_binary_search(this.array, key);
		} catch (e) {
			return [];
		}

		var anagram_list = []
		while (this.array[index][0] === key) {
			anagram_list.push(this.array[index][1]);
			index += 1;
		}
		return anagram_list;
	}
	getAllWords(string) {
		var permutations_list = permutations(string);
		var permutations_list_length = permutations_list.length
		var max_word_length = 0;

		for (var x = 0; x < permutations_list_length; x++) {
			if (permutations_list[x].length > max_word_length) {
				max_word_length = permutations_list[x].length;
			}
		}
		var anagram_list = Array(max_word_length);

		for (var n = 1; n < permutations_list_length; n++) {
			var returned_anagrams = this.get_anagrams(permutations_list[n]);
			if (returned_anagrams.length > 0) {
				if (!anagram_list[permutations_list[n].length]) {
					anagram_list[permutations_list[n].length] = [];
				}
				anagram_list[permutations_list[n].length].push.apply(anagram_list[permutations_list[n].length], returned_anagrams)
			}
		}

		return anagram_list
	}

	getRandomWord() {
		return this.array[Math.floor(Math.random()*this.array.length)];
	}
}

// converts an array of characters to a string.
function array_to_string(array) {
	var output = "";
	var array_length = array.length;
	for (var x = 0; x < array_length; x++) {
		if (array[x] === []) {
			continue;
		} else if (typeof (array[x]) != "object") {
			output += array[x] + ", ";
		} else {
			output += array_to_string(array[x]) + ", "
		}
	}
	return output.slice(0, -2);
}

// Remove duplicaes from an array
function remove_doubles(arr) {
	var tmp = [];
	for (var i = 0; i < arr.length; i++) {
		if (tmp.indexOf(arr[i]) == -1) {
			tmp.push(arr[i]);
		}
	}
	return tmp;
}

/*
Retrieve all permuations of an array (or string).
eg, abc returns a, b, c, ab, ac, abc.
*/
function permutations(string) {
	var this_permutation_list = [];
	var string_length = string.length;
	if (string_length === 1) {
		return [string];
	}
	for (var j = 1; j <= string_length; j++) {
		this_permutation_list.push(string.slice(0, j));
	}
	var next_permutation_list = permutations(string.slice(1));
	var next_permutation_list_length = next_permutation_list.length;
	for (var x = 0; x < next_permutation_list_length; x++) {
		this_permutation_list.push(next_permutation_list[x])
	}
	return this_permutation_list;
}

// String string so it only contains ascii characters between 97 and 122.
function strip_nonletters(string) {
	new_string = [];
	length = string.length;
	for (var x = 0; x < length; x++) {
		if(string[x].charCodeAt(0)>=97 && string[x].charCodeAt(0)<=122){
			new_string.push(string[x]);
		}
	}
	return new_string;
}

var anagram_table = new AnagramTable(dictionary)

/*
1. Convert all characters to lowercase and strip non-letters.
2. Get all the permutations of the string.
3. Search for each permuation in dictionary.
4. Remove duplicate words.
5. Sort words based on word length.
6. Return object of words.
*/
anagramController.getWords = function(string) {
  string = string.toLowerCase();
  string = strip_nonletters(string);

  // If string contains characters
  if (string != "") {
		var anagram_list = anagram_table.getAllWords(string);
		var string_length = string.length;
		for (var x = 1; x <= string_length; x++) {
			if (anagram_list[x]) {
				anagram_list[x] = remove_doubles(anagram_list[x]).sort();	// remove duplicated words and sort in alphabetical order.
			}
		}

    return anagram_list;
	}
  else {
    return [[]];
  }
}

// Return a random word from the anagram_table.
anagramController.getRandomWord = function() {
	return anagram_table.getRandomWord()[1]
}

// Return dictionary result from searching this word.
anagramController.getDefinition = function(word, next){

	// build URL.
	var URL = 'https://googledictionaryapi.eu-gb.mybluemix.net/?define='+word.toLowerCase()+'&lang=en'

	// return value from webpage at URL.
	var request = https.request(URL, function (res) {
		var data = '';
		// for each line.
	  res.on('data', function (chunk) {
			data += chunk;
		});
		// once ended.
		res.on('end', function () {
			next(null, data);
		});
	});
	// if error.
	request.on('error', function (e) {
		next(e.message, null);
	});

	request.end();
};

module.exports = anagramController;
