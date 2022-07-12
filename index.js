const Player = require('./src/player');
const CardDeck = require('./src/cardDeck');
var prompt = require('prompt-sync')();

let players = [];
let cards = [];
let option = 0;

function mainMenu(){

    do {
        console.log("Welcome to Blackjack game.\n")
        console.log("1. Create new player.")
        console.log("2. Already register? Then let's play.")
        console.log("0. Exit.\n")
        option = prompt('Select the number of the option to continue: ');
        options(option);
    } while (option != 0);    

}

function options(userOption){

    console.log("----------------------------------------------------------------------");

    switch(userOption){
        case "1":
            createPlayer();
            break;
        case "2":
            playGame();
            break;
        case "0":
            players.forEach(player => {
                console.log(player)
            });
            console.log("Good bye. Have a nice day!")
            break;
        default:
            console.log("Select a valid option.");
            break;
    };

    console.log("----------------------------------------------------------------------");
}

function createPlayer(){
    let idPlayer = prompt('Enter player ID: ');
    let playerName = prompt('Enter player name: ');

    let newPlayer = new Player({
        id: idPlayer,
        name: playerName,
        price: 0
    });
    players.push(newPlayer);

    console.log("Player created successfully.")
}

function playGame(){
    console.log("functionality in construction");
}

mainMenu();



// let cardDeck = new CardDeck();
// cardDeck.createCardDeck();

// cardDeck.cards.forEach(card => {
//     console.log(card)
// });
