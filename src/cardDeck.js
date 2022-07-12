const Card = require('./card');

const cardSuits = ['♠','♥','♣','♦'];
const cardNames = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

class CardDeck{

    constructor(){
        this.cards = [];
    }

    createCardDeck(){

        for (let i = 0; i < cardSuits.length; i++) {
            for (let j = 0; j < cardNames.length; j++) {
                let newCard = new Card({
                    name : cardNames[j],
                    suit : cardSuits[i],
                    value: validateCardValue(cardNames[j])
                });

                this.cards.push(newCard);
            }
            
        }

    }
}

function validateCardValue(cardName){

    switch (cardName) {
        case "Ace":
            return 0;
        case "Jack":
        case "Queen":
        case "King":
            return 10;
        default:
            return Number(cardName);
    }

}

module.exports = CardDeck;