function Letter(c) {
  this.single = c.toString();
  this.guessed = false;
}

/**
 * update a character status of this object which is a playingWord
 */
Letter.prototype.gotSingleRight = function(){
  return this.guessed ? this.single : '_';
}

/**
 * update a character status of this object, which is a baseWord 
 * @param {*} c - guessed character
 */
Letter.prototype.checkSingle = function(c) {
  // one can add verificaiton for this is not baseWordInstance if need, but omitted here.
  this.guessed = c.toLowerCase() === this.single.toLowerCase() ? true : false;
}

module.exports = Letter;