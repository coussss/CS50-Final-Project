let currentSelect = null;

let cardCount = 0

// Hit = 0
// Stand = 1
// Double or hit = 2
// Double or stand = 3
// Split = 4
// No split = 5
// Split if DAS offered = 6

const strategies = {

    //defining hard totals

    "hard8": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "hard9": [0, 2, 2, 2, 2, 0, 0, 0, 0, 0],
    "hard10": [2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
    "hard11": [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    "hard12": [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    "hard13": [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    "hard14": [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    "hard15": [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    "hard16": [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    "hard16": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    
    //defining soft totals

    "soft13": [0, 0, 0, 2, 2, 0, 0, 0, 0, 0],
    "soft14": [0, 0, 0, 2, 2, 0, 0, 0, 0, 0],
    "soft15": [0, 0, 2, 2, 2, 0, 0, 0, 0, 0],
    "soft16": [0, 0, 2, 2, 2, 0, 0, 0, 0, 0],
    "soft17": [0, 2, 2, 2, 2, 0, 0, 0, 0, 0],
    "soft18": [3, 3, 3, 3, 3, 1, 1, 0, 0, 0],
    "soft19": [1, 1, 1, 1, 3, 1, 1, 1, 1, 1],
    "soft20": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

    //defining split totals

    "split2": [6, 6, 4, 4, 4, 4, 5, 5, 5, 5],
    "split3": [6, 6, 4, 4, 4, 4, 5, 5, 5, 5],
    "split4": [5, 5, 5, 6, 6, 5, 5, 5, 5, 5],
    "split5": [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    "split6": [6, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    "split7": [4, 4, 4, 4, 4, 4, 5, 5, 5, 5],
    "split8": [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    "split9": [4, 4, 4, 4, 4, 5, 4, 4, 5, 5],
    "split10": [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    "split11": [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
}

function resetHand() {
    document.querySelectorAll('.plus-image').forEach((img) => {
        img.style.display = 'block';
    });
    document.querySelectorAll('.cardText').forEach((text) => {
        text.style.display = 'none';
    });
    document.querySelector('.player-hand-value').innerHTML = '-';
    document.querySelector('.dealer-hand-value').innerHTML = '-';
    document.querySelector('.player-next-move').innerHTML = '-';

    cardCount = 0;
}

function calculateChoice(d1, p1, p2) {
    if (p1 == p2){
        return(strategies[`split${p1}`][d1 - 2])
    } else if (p1 == 11 || p2 == 11) {
        if (p1 + p2 > 20) {
            return(1)
        } else {
            return(strategies[`soft${p1 + p2}`][d1 - 2])
        }
    } else {
        if (p1 + p2 > 17) {
            return(1)
        } else if (p1 + p2 < 8) {
            return(0)
        } else {
            return(strategies[`hard${p1 + p2}`][d1 - 2])
        }
    }
}

function displayChoice(choice) {
    let next_move = document.querySelector('.player-next-move')

    let choice_text = null;
    if (choice == 0) {
        choice_text = "Hit"
    } else if (choice == 1) {
        choice_text = "Stand"
    } else if (choice == 2) {
        choice_text = "Double/Hit"
    } else if (choice == 3) {
        choice_text = "Double/Stand"
    } else if (choice == 4) {
        choice_text = "Split"
    } else if (choice == 5) {
        choice_text = "No Split"
    } else if (choice == 6) {
        choice_text = "Split/Double"
    }

    next_move.innerHTML = choice_text;
}

function showCards(event) { 
    const card_select = document.querySelector('.card-list');
    card_select.style.display = 'none'

    let posX = event.clientX;
    let posY = event.clientY;

    if (card_select.style.display == 'none') {
        card_select.style.left = `${posX}px`;
        card_select.style.top = `${posY}px`;
        card_select.style.display = 'flex';
    } else {
        card_select.style.display = 'none';
    }

    if (event.target.className == 'plus-image' || event.target.className == 'cardText') {
        currentSelect = event.target.parentNode;
    } else {
        currentSelect = event.target;
    }
}

function cardSelect(val) {
    const card_select = document.querySelector('.card-list');
    let plus_image = currentSelect.querySelector('.plus-image');
    let card_text = currentSelect.querySelector('.cardText');
    let player_hand_value = document.querySelector('.player-hand-value')
    let dealer_hand_value = document.querySelector('.dealer-hand-value')

    if (window.getComputedStyle(plus_image).getPropertyValue("display") == 'block') {
        cardCount++;
    }

    plus_image.style.display = 'none';
    card_text.innerHTML = val.innerHTML;
    card_text.value = val.value;
    card_text.style.display = 'block';

    card_select.style.display = 'none';

    if(currentSelect.className == 'button player-1' || currentSelect.className == 'button player-2') {
        player_hand_value.innerHTML = val.value;
    } else {
        dealer_hand_value.innerHTML = val.value;
    }

    if (cardCount == 3) {
        cards = document.querySelectorAll('.cardText');
        dealer_card_1 = Number(cards[0].value);
        player_card_1 = Number(cards[1].value);
        player_card_2 = Number(cards[2].value);
        player_hand_value.innerHTML = player_card_1 + player_card_2;

        let choice = calculateChoice(dealer_card_1, player_card_1, player_card_2);

        console.log(choice)

        displayChoice(choice)
    }
}