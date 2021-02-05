//listen for changes to the filter list
    //apply upon change

function createEventListeners () {
    //listen for changes in the filter menu
        //run filter 
    let filterMenu = document.getElementById("genetics-filter-select");
    if (filterMenu.addEventListener) {
        filterMenu.addEventListener("change", filterCards, false);
    } else if (filterMenu.attachEvent){
        filterMenu.attachEvent("onchange", filterCards);
    }
}

function filterCards(x) {
    let selectedFilterOption = x.target.value;
    let geneticsCards = document.getElementsByClassName("genetics-card");
    let cardsToFilter = [];

    //check cardValue against selectedFilterOption
        //if there is a match add 'false' to cardsToFilter (do not hide the card)
        //if there is a match add 'true' to cardsToFilter (hide the card)
    for(i=0; i < geneticsCards.length; i++) {
        let hideCard;
        let cardValue = geneticsCards[i].querySelector('input[type=hidden]');
        cardValue = JSON.parse(cardValue.value);

        if(selectedFilterOption === "indoors" || selectedFilterOption === "outdoors") {
            for(grow = 0; grow < cardValue.grow.length; grow++) {
                if(cardValue.grow[grow] === selectedFilterOption) {
                    hideCard = false;
                    break;
                } else {
                    hideCard = true;
                }
            }
        } else if (selectedFilterOption === "available") {
            if(cardValue.available) {
                hideCard = false;
            } else {
                hideCard = true;
            }
        } else if (selectedFilterOption === "none") {
            hideCard = false;
        }else {
            for(j in cardValue) {
                if(cardValue[j] === selectedFilterOption) {
                    hideCard = false;
                    break; 
                } else {
                    hideCard = true;
                }
            }
        }

        //push true or false to cardsToFilter array
        cardsToFilter.push(hideCard);
    }

    //hide/show cards based on cardsToFilter
        //true === hide card
        //false === show card
    for(i=0; i < geneticsCards.length; i++) {
        if(cardsToFilter[i]) {
            geneticsCards[i].style.display = "none";
        } else {
            geneticsCards[i].style.display = "block";
        }
    }
    

    
}

//on pageload create eventlisteners 
if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}