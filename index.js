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

    console.log("------------------------------------------------------------------------------------------");

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

    console.log("Player created successfully.")
}

function startGame(){
    let idPlayer = prompt('Enter player ID to play: ');
    let decision;

    if (validatePlayer(idPlayer)) {
        let player = searchPlayer(idPlayer);
        console.log("Hi " + player.name + " let's play Blackjack!\n");

        do {
            playGame(player);
            decision = prompt('Do you want to continue playing? Y/N')
        } while (decision.toUpperCase != "N");
    }
    console.log("The ID entered is not registered. Please go to option 1 to create a new player and come back to play.")
}

function playGame(player){

    gameCards = [];
    score = 0;
    let gameStatus = "continue";

    do {
        let cardGame = drawCardGame();
        console.log("You got the card: " + cardGame.name + " of " + cardGame.suit);
        if (cardGame.name === "Ace") {
            score += Number(validateAceDecision());
        }
        score += cardGame.value;
        console.log("Your score now is: " + score);
        console.log("Next card ___________________")
        gameStatus = validateScore(score);
        console.log(gameStatus);
    } while (gameStatus === "continue" );

    if (gameStatus === "win") {
        player.prize += 1000;
        console.log("You win")
    }else{
        console.log("Sorry, but you lose")
    }

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
    aceDecisionPlayer = prompt('Which value you want for the card? Please type 1 or 11: ');

    switch (aceDecisionPlayer) {
        case "1":
            return 1;
        case "11":
            return 11;
        default:
            console.log('Please enter a valid option.')
            validateAceDecision();
    }

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