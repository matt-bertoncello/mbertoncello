var HashMap = require('hashmap');

/*
A collection of objects which are indexed by a key.
If multiple objects have the same key, they will be returned in a set together.
*/
class MultiHash {
  constructor(){
    this.map = new HashMap();
  }

  /*
  Add this object to the collection with the key.
  Objects with the same key are added to a set together.
  Cannot have the same key-object combination
  */
  add(key, object) {
    // If key doesn't exists yet, add to hashmap with new set.
    if(!this.map.has(key)) {
      this.map.set(key, new Set([object]));
    }
    // If key already exists, add to existing set indexed by the key.
    else {
      this.map.get(key).add(object);
    }
  }

  /*
  Remove the object from the set defined by the key.
  If object exists at the key and is removed, return true.
  If object doesn't exist at the key, return false.
  */
  remove(key, object) {
    // If object exists at the key, remove object and return true.
    if(this.map.has(key) && this.map.get(key).has(object)){
      this.map.get(key).delete(object);
      return true;
    }
    // If object doesn't exist at the key, return false.
    else {
      return false;
    }
  }

  /*
  Returns a set indexed by the key.
  If key is not in this collection, return an empty set.
  */
  get(key) {
    // If key exists, return all objects as a set.
    if(this.map.has(key)) {
      return this.map.get(key);
    }
    // If key does not exist, reutrn empty set.
    else {
      return new Set();
    }
  }

}

module.exports = MultiHash;
