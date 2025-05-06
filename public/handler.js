// Game configuration
const numPairs = 8;
const imgArray = [
  "cplusplus-original.svg", 
  "godot-original.svg", 
  "html5-original.svg", 
  "java-original.svg", 
  "javascript-original.svg", 
  "mysql-original.svg", 
  "python-original.svg", 
  "swift-original.svg"
];

// Game state
let first = null;
let second = null;
let pauseBoard = false;
let matchesFound = 0;

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  assignImagesToCards();
  setupCardClickHandlers();
});

// Assign random images to cards (creating pairs)
function assignImagesToCards() {

  //select cards and declare array
  const cards = document.querySelectorAll('.card');
  const pairIndices = [];
  
  // Create array with each pair index twice
  for (let i = 0; i < numPairs; i++) {
    pairIndices.push(i, i);
  }
  
  // Shuffle the pairs
  shuffleArray(pairIndices);
  
  // Assign to cards
  cards.forEach((card, index) => {
    const pairIndex = pairIndices[index];
    const frontFace = card.querySelector('.front-face');
    frontFace.src = imgArray[pairIndex];
    card.dataset.pairIndex = pairIndex;
  });
}

// Set up click handlers for all cards
function setupCardClickHandlers() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', flipCard);
  });
}

// Flip card when clicked
function flipCard() {
  //checks to see if match logic is being ran
  if (pauseBoard) return;
  
  //checks to make sure same card has not been clicked twice
  if (this === first) return;
  
  //flip animation taken from https://github.com/code-sketch/memory-game
  this.classList.add('flip');
  
  //if first is null, make this card first
  if (!first) {
    first = this;
    return;
  }
  
  //else make this card second and pause board to run match check
  second = this;
  pauseBoard = true;
  
  //check for match
  matchCheck();
}

// Check if cards match
function matchCheck() {
  //if the pair index for first and second match
  if(first.dataset.pairIndex === second.dataset.pairIndex){
  	//remove the flipCard function from the cards
	first.removeEventListener('click', flipCard);
  	second.removeEventListener('click', flipCard);
  
  	//add one match, if the number of matches equals number of pairs, let user know they won
  	matchesFound++;
  	if (matchesFound === numPairs) {
    	setTimeout(() => alert('Congratulations! You won!'), 500);
  	}
  	
  	//resets first, second, and pauseboard to default states
        [first, second, pauseBoard] = [null, null, false];
  }else{
    //after some time, unflip cards and reset first, second, and pauseboard
    setTimeout(() => {
    	first.classList.remove('flip');
    	second.classList.remove('flip');
        [first, second, pauseBoard] = [null, null, false];
    }, 1000);
  }
}


// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
