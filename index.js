const Player = require('./src/player');
const Card = require('./src/card');
var prompt = require('prompt-sync')();

let players = [];
let cards = [];
let option = 0;

function mainMenu(){

    do {
        console.log("Welcome to Blackjack game.")
        console.log("1. Create new player")
        console.log("2. Already register? Then go to Play")
        console.log("0. Exit")
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
            console.log("Good bye. Have a nice day!")
            break;
        default:
            console.log("Select a valid option.");
            break;
    };

    console.log("----------------------------------------------------------------------");
}

function createPlayer(){
    console.log("functionality in construction");
}

function playGame(){
    console.log("functionality in construction");
}

mainMenu();
