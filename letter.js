function Letter(c) {
  this.single = c.toString();
  this.guessed = false;
}

Letter.prototype.gotItRight = function(){
  return this.guessed ? this.single : '_';
}

Letter.prototype.checkSingle = function(c) {
  this.guessed = c.toLowerCase() === this.single.toLowerCase() ? true : false;
}

var l = new Letter('k');
console.log(l.single, l.guessed);
console.log(l.checkSingle('K'), l.guessed);
console.log(l.gotItRight());

module.exports = Letter;