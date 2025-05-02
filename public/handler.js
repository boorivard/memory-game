//global variables
let  numPairs = 8; //number of pairs of cards
let pairArray = Array(numPairs); //array for determining random number value of cards
//10 is outside random assignment so we can use it to initialize without breaking something
let selectnum1 = 10;
let selectnum2 = 10;
//tells us how many cards have been selected from zero to two
let selected = 0;
//initialize pairArray
for(let i = 0; i < numPairs; i++){
    pairArray[i] = 0;
}
//contains strings with image files stored in public
let imgArray = ["cplusplus-original.svg", "godot-original.svg", "html5-original.svg", "java-original.svg", "javascript-original.svg", "mysql-original.svg", "python-original.svg", "swift-original.svg"]



const imgs = document.querySelectorAll('[class="back-face"]'); // Select all images with the id "back-face"
const cards = document.querySelectorAll('[id ="card"]');
for(let i = 0; i < imgs.length; i++){
    let randomNumber = Math.floor(Math.random() * numPairs); // Generate a random integer between 0 and numPairs
    while(pairArray[randomNumber] == 2){
	randomNumber = Math.floor(Math.random() * numPairs);//ensures each integer is only used twice
    }
    pairArray[randomNumber] = pairArray[randomNumber] + 1;
    imgs[i].src=imgArray[randomNumber]; //assigns the source to a random image from imgArray
    cards[i].setAttribute('data-random-id', randomNumber); //assigns the random number to a attribute; used for comparing cards later
}


//card is clicked
//contains CSS for card flipping, and logic to compare cards
function flipped(card) {
    console.log("Card clicked: ", card);
    card.style.backgroundColor = "white";
    if (selected == 0) {
	    selectnum1 = card.getAttribute('data-random-id');
	    console.log(selectnum1);
	    selected = 1;
    }
    else if (selected == 1) {
	    selectnum2 = card.getAttribute('data-random-id');
	    console.log(selectnum2);
	    selected = 2;
    if (selectnum1 == selectnum2) {
	    //remove cards from play
	    selected = 0;
	    selectednum1 = 0;
	    selectednum2 = 0;
    }
    else {
	    //unselect cards in CSS
	    selected = 0;
	    selectednum1 = 0;
	    selectednum2 = 0;
    }
    }
    
}
