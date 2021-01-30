//read json obj
    //create the card 
    //add all elements to the card from the object 
    //append to the card list 

//Create the strain cards 
function createCards () {
    //create card div
        //div wrapper
            //div img wrapper 
                //set background img
            //div info  wrapper 
                //h3 strain name header
                //genetic type wrapper 
                    //svg use icon/s
                    //single span with name/s
                //genetic grow wrapper 
                    //svg use icon/s
                    //single span with name/s
                //genetic card btns
                    //a contact us
                    //a quick view
    // JSON  strainsList 
    let strains = strainList;
    
    /*for(i in strains) {
        //console.log(i + ": " + strains[i]);
        let strain = strains[i];
        console.log(strain);
        
    }*/

    //use foreach to start taking strain info for cards
    strains.forEach(makeCards);

    function makeCards (x) {
        //cardImg(x);
        //cardInfo(x);
        let cardButtons = cardBtns();
        
        card(cardButtons);
    }

    //pass all the created elements that need to be placed in the divs
    function card (cardButtons) {
        let cardDiv = document.createElement("div");
        let cardImgDiv = document.createElement("div");
        let cardInfoDiv = document.createElement("div");

        let cardContainer = document.getElementsByClassName("genetics-card__container"[0]);

        cardDiv.classList.add("genetics-card");
        cardImgDiv.classList.add("genetics-card__img");
        cardInfoDiv.classList.add("genetics-card__info");

        for(i in cardButtons) {
            cardInfoDiv.appendChild(cardButtons[i]);
        }

        cardDiv.appendChild(cardImgDiv);
        cardDiv.appendChild(cardInfoDiv);

        //console.log(cardButtons);
        console.log(cardDiv);
        //card div
            //card wrapper
                //img wrapper
                //info wrapper
                //btn wrapper 
    }

    function cardImg () {
            //set img
    }

    function cardInfo () {
        //h3
        //genetic type
        //genetic care
    }

    function cardBtns () {
        let cardContact = document.createElement("a");
        let cardQuickview = document.createElement("a");
        cardContact.classList.add("card-btn");
        cardQuickview.classList.add("card-link");
        cardContact.href = "#";
        cardQuickview.href= "#";
        cardContact.innerHTML = "Contact Us";
        cardQuickview.innerHTML = "Quick View";

        return[cardContact, cardQuickview];
    }

   

    //append the card 
}

//onpage load run card creation 
if(window.addEventListener) {
    window.addEventListener("load", createCards, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createCards);
}