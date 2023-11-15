// Someone thinks of a word and we keep it secret from the other players
// We will display a series of underscores depending on the length of the word.
// Each turn the player will guess 1 letter from the word.
// If guess is correct we will display the letter in the blank word
// If incorrect we draw a piece of the hangmano or tell the user they ahve x amount of guesses left.
// Add incorrect guess to a div.
// start button
// replay button

// WE'll need an ID for
// start button
// replay button
// Secret Word
// Wrong guesses
// Hangman
// Guess / Input

// ID Selector

let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");

let secretWord = document.getElementById("secretWord");
let wrongGuesses = document.getElementById("wrongGuesses");
let hangMan = document.getElementById("hangMan");
let userInput = document.getElementById("userInput");

//viriables
//random word will be for our API call
//Wrong guess will be the user's incorrect input
//displayed\Word will be for their correct input.
let randomWord = "";
let wrongGuess = "";
let displayedWord = [];

let guesses = 0;
let maxGuesses = 5;

startBtn.addEventListener('click', function(){
    //we will call our API function
    ApiCall();
})

restartBtn.addEventListener('click', function(){
    resetGame();
})

function resetGame(){
    randomWord = ""
    wrongGuess = "";
    displayedWord = [];
    guesses = 0;

    wrongGuess.textContent = "";
    secretWord.textContent = "[Secret Word]";
    hangMan.textContent = "Hangman / Guesses left";
    userInput.readOnly = true;
    userInput.value = "";

}

function ApiCall(){
    //we initiate the fetchr request from our random word api
    fetch('https://random-word-api.herokuapp.com/word')
    .then((response) => {
            //we're .json() to parse the response into json data
            return response.json();
    })
        .then((data) => {
            console.log(data[0]);
            startGame(data[0])
        })
}

function startGame(word){
        displayedWord = [];
        randomWord = word;

        //now we have change our displayed to have _ for the length of our random word

        for (let i = 0; i < randomWord.length; i++){
            displayedWord[i] = "_"
        }
        //We will update our "game State"
        updateGameState();
        userInput.readOnly = false;
}

function updateGameState(){
    secretWord.textContent = displayedWord.join(" ");

    hangMan.textContent = `Guesses left ${guesses} / ${maxGuesses}`;
}

userInput.addEventListener('keydown', function(event){
    if(event.key === "Enter"){
        let guess = userInput.value.toLowerCase();
        //check if the user's guess is included in our secret word.
        if(randomWord.includes(guess)){
            //now that we know that guess is included, we have to figure out at whatindexes it's included
            for(let i = 0; i < randomWord.length; i++){
                if(randomWord[i] === guess){
                    displayedWord[i] = guess;

                }
            }
        } else {
            wrongGuess += guess;
            wrongGuesses.textContent = wrongGuess
            guesses++;
        }


        updateGameState();
        userInput.value = "";
        gameEnd();
    }
})

function gameEnd(){
    //checking if user guesses =  to max guesses LOSER
    //check if our Secret Word = to DisplayedWord Winner

    if(guesses === maxGuesses){
        alert(`you lose your word was ${secretWord}`);
        resetGame();
    } else if(displayedWord.join("") === randomWord){
        alert("Yay you won you've guessed: " + randomWord);
        resetGame();
    }
}