var inquirer = require('inquirer');
var Word = require('./word');
var colors = require('colors');
// random words generator https://www.randomlists.com/random-words
const randomWords = [
  'tranquil', 'middle', 'wretched', 'unwieldy', 'detail', 'fluffy', 'delicate',
  'shallow', 'jittery', 'eminent', 'pencil', 'toothpaste', 'knowledgeable',
  'selfish', 'pathetic', 'stone', 'hammer', 'overjoyed', 'scrape', 'comb', 
  'purple', 'toes', 'acidic', 'homeless', 'perpetual', 'evanescent', 'wealth',
  'polite', 'dizzy', 'moaning', 'bashful', 'settle', 'experience', 'elite', 'crayon',
  'apparel', 'torpid', 'piquant', 'sprout', 'health', 'stick', 'absent', 'coherent'
];
const NUMBER_OF_TRIAL = 15;
const question = [
  {
    type: 'input',
    name: 'ych',
    message: 'Guess a letter! '
  }
];
const wantToPlayQuestion = [
  {
    type: "confirm",
    name: "continueToPlay",
    message: "Continue to play?",
    default: true
  }
]

// contructor function
function Game() {
  
  this.Word =  null;
  this.PlayingWord =  null;
  this.remainingNumTrials = null;
}

Game.prototype.prework = function() {
  // between 0 and 42, integer 0, 1, 2, ...., 42
  var randomlyChosenIndex = Math.floor(Math.random() * Math.floor(randomWords.length)); // from 0 to 42
  var word = randomWords[randomlyChosenIndex];
  var wLength = word.length;
  var playingWord = Array(wLength).fill('_').join('');
  var numTrial = NUMBER_OF_TRIAL;

  console.log(randomlyChosenIndex, word, playingWord, numTrial);
  this.Word = (word && new Word(word)) || null;
  this.PlayingWord = (playingWord && new Word(playingWord)) || null;
  this.remainingNumTrials = numTrial || null; 
}
// shared mothod
Game.prototype.play = function() {

  var Word = this.Word && this.Word.Letters;
  var PlayingWord = this.PlayingWord && this.PlayingWord.Letters;
  var remainingNumTrials = this.remainingNumTrials;
  var matched = false;

  inquirer.prompt(question)
          .then(ans => {   
            
            var matched = this.PlayingWord.setMatched(ans.ych, Word);
            this.remainingNumTrials --;

            if (this.remainingNumTrials <= 0) {
              console.log("Sorry, the allowed number of trials has been exhausted. Exit the game!".yellow);
              process.exit(0);
            }
            else if (PlayingWord.every(e => e.single !== '_')) {
              console.log(`You got it right! - ${this.PlayingWord.wordString()}`.inverse.green);

              // ask if the user want to continue to play
              inquirer.prompt(wantToPlayQuestion)
                      .then(ans => {
                        if (['Y', 'y', 'Yes', 'yes', 'YES', true].some(e => e == ans.continueToPlay)) {
                          // OK. play again                         
                          this.prework();
                          this.play();
                        }
                        else {
                          console.log("Good bye!");
                          process.exit(0);
                        }
                      });
            }
            else if(PlayingWord.some(e => e.single === '_') && this.remainingNumTrials > 0) {            
              console.log(this.PlayingWord.wordString());
              console.log(matched ? 'Correct!!!'.cyan : 'Not correct!!!'.red, `${this.remainingNumTrials} trials left.`);
              this.play();
            }
          });
};

// Let game start
var Game = new Game(); 
Game.prework();
Game.play();


 