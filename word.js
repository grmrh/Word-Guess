var Letter = require('./letter');

var Word = function(aWord) {
  this.Letters = (aWord && Array.from(aWord).map( c => new Letter(c))) || null;
  this.numGuessedRight = this.Letters.forEach(w => w.guessed == true ? this.numGuessedRight++ : this.numGuessedRight);
}

/**
 * display the word in progress in console
 * @param {*} letters : array of Letter instance
 */
Word.prototype.wordString = function() {
  return this.Letters.map(c => c.gotSingleRight()).join(' ');
}

/**
 * udpate each matched letter status in the playingWord
 * @param {*} c 
 */
Word.prototype.setMatched = function(c, baseWord) {

  baseWord.forEach(w => w.checkSingle(c));
  var matched = false;
  for (var index in baseWord) { 
    if(baseWord[index].guessed) {
      this.Letters[index].single = c ;
      this.Letters[index].guessed = true;
      matched = true;
    }   
  }
  return matched;
}

module.exports = Word;