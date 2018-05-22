var Letter = require('./letter');

var Word = function(aWord) {
  this.word = aWord && Array.from(aWord).map( c => new Letter(c)) || null;
}

Word.prototype.wordString = function() {
  return this.word.map(c => c.gotItRight()).join(' ');
}

Word.prototype.wordGuess = function(c) {
  this.word.forEach(x => x.checkSingle(c));
}

var w = new Word('gRaCe');
console.log(w.word);
console.log(w.wordGuess('a'), w.word);
console.log(w.wordString());
console.log(w.wordGuess('r'), w.word);
console.log(w.wordString());

module.exports = Word;