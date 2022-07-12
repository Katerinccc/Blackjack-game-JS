const Player = require('./src/player');
const CardDeck = require('./src/cardDeck');
var prompt = require('prompt-sync')();

let players = [];
let gameCards = [];
let option = 0;
let cardDeck = new CardDeck();
cardDeck.createCardDeck();

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
            startGame();
            break;
        case "0":
            // players.forEach(player => {
            //     console.log(player)
            // });
            console.log("Good bye. Have a nice day!")
            break;
        default:
            console.log("Select a valid option.");
            break;
    };

    console.log("----------------------------------------------------------------------");
}

function startGame(){
    let idPlayer = prompt('Enter player ID: ');
    let playerName = prompt('Enter player name: ');

    let newPlayer = new Player({
        id: idPlayer,
        name: playerName,
        prize: 0
    });
    players.push(newPlayer);

    console.log("Player created successfully.")
}

function createGame(){
    let idPlayer = prompt('Enter player ID to play: ');

    if (validatePlayer(idPlayer)) {
        let playerName = searchPlayerName(idPlayer);
        console.log("Hi " + playerName + "let's play Blackjack!\n")
    }
    console.log("The ID entered is not registered. Please go to the registration in option 1 to be able to play.")
}

function validatePlayer(idPlayer){
    return players.includes(idPlayer) ? true:false;
}

function searchPlayerName(idPlayer){
    let player = players.filter(player => player.id === idPlayer);
    return player[0].name;
}

function drawCard(){
    let newCardIndex = Math.floor(Math.random() * cardDeck.cards.length);
    let newCard = cardDeck.cards[newCardIndex];
    gameCards.push(newCard);
    return newCard;
}

function 


mainMenu();



// cardDeck.cards.forEach(card => {
//     console.log(card)
// });
