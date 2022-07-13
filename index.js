const Player = require('./src/player');
const CardDeck = require('./src/cardDeck');
var prompt = require('prompt-sync')();

let players = [];
let gameCards = [];
let option = 0;
let cardDeck = new CardDeck();
cardDeck.createCardDeck();
let score = 0;
let aceDecisionPlayer;
const prizeUsd = 1000;

function mainMenu(){

    do {
        console.log("Welcome to Blackjack game.\n")
        console.log("1. Create new player.")
        console.log("2. Are you already a player? Then let's play.")
        console.log("0. Exit.\n")
        option = prompt('Enter number of the option selected to continue: ');
        options(option);
    } while (option != 0);    

}

function options(userOption){

    console.log("------------------------------------------------------------------------------------------");

    switch(userOption){
        case "1":
            createPlayer();
            break;
        case "2":
            startGame();
            break;
        case "0":
            console.log("Good bye. Have a nice day!")
            break;
        default:
            console.log("Select a valid option.");
            break;
    };

    console.log("------------------------------------------------------------------------------------------");
}

function createPlayer(){
    let idPlayer = prompt('Enter player ID: ');
    let playerName = prompt('Enter player name: ');

    let newPlayer = new Player({
        id: idPlayer,
        name: playerName,
        prize: 0
    });
    players.push(newPlayer);

    console.log("\n----- Player created successfully! -----\n")
}

function startGame(){
    let idPlayer = prompt('Enter player ID to play: ');

    if (validatePlayer(idPlayer)) {
        let player = searchPlayer(idPlayer);
        player.prize = 0;

        console.log("\nHi " + player.name + "! Let's play Blackjack!!!\n");

        createGame(player);

        console.log("\nGame over. Total earned: " + player.prize + " USD." );
    }else{
        console.log("The ID entered is not registered. Please go to option 1 to create a new player and come back to play.\n")
    }
}

function createGame(player) {
    let decision = true;
    do {
        gameCards = [];
        score = 0;
    
        console.log("------- New Game -------\n")

        let gameResult = playGame();

        if (gameResult === "win") {
            player.prize += prizeUsd;
            console.log("\n---- Congratulations you win!!! Your Prize for this game is 1,000 USD.")
            decision = validateDecisionContinue();
        } else {
            console.log("\n---- Sorry, but you lost :(")
            decision = false;
        }

    } while (decision);
}

function playGame() {
    let gameStatus;
    do {
        let cardGame = drawCardGame();
        console.log("You got the card: " + cardGame.name + " of " + cardGame.suit);
        if (cardGame.name === "Ace") {
            let number = validateAceDecision();
            score += Number(number);
        }
        score += cardGame.value;
        console.log("Your score now is: " + score);
        gameStatus = validateScore(score);
        if (gameStatus === "continue") {
            console.log("\nNext card ________");
        }
    } while (gameStatus === "continue");
    return gameStatus;
}

function validateDecisionContinue(){
    let decision;
    do {
        decision = prompt("Do you want to continue playing? Enter Y/N : ");
        decision = decision.toUpperCase();
        if(decision ===  "Y"){
            return true;
        }else if(decision === "N"){
            return false
        }
    } while (decision != "Y" && decision != "N");
}

function validatePlayer(idPlayer){
    return players.some(player => player.id === idPlayer)
}

function searchPlayer(idPlayer){
    let player = players.filter(player => player.id === idPlayer);
    return player[0];
}

function drawCard(){
    let newCardIndex = Math.floor(Math.random() * cardDeck.cards.length);
    let newCard = cardDeck.cards[newCardIndex];
    return newCard;
}

function drawCardGame(){
    let cardGame = drawCard();

    if (gameCards.some(card => card.name === cardGame.name)) {
        drawCardGame();
    }
    gameCards.push(cardGame);
    return cardGame;
}

function validateAceDecision(){
    let aceDecisionPlayer;
    do {
        aceDecisionPlayer = prompt("DWhich value you want for your Ace card? Please type 1 or 11:");
        if(aceDecisionPlayer === '1' || aceDecisionPlayer === '11'){
            return aceDecisionPlayer;
        }
    } while (aceDecisionPlayer != "1" && aceDecisionPlayer != "11");

}

function validateScore(score){
    if (score >= 18 && score <=21) {
        return "win";
    }else if(score > 21){
        return "lose"
    }
    return "continue";
}

mainMenu();