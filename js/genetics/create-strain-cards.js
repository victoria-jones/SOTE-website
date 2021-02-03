//read json obj
    //create the card 
    //add all elements to the card from the object 
    //append to the card list 

/******
 *******Important********
 *       
 *      DO NOT change the order than elements are appended 
 *      It would mess up the entire card layout
 *      :)      
******/

//populate the Genetics cards into the card container
function populateGeneticsCard(x) {
    let cardContainer = document.getElementsByClassName("genetics-card__container")[0];
    let geneticsCards = x;

    for(i in geneticsCards) {
        cardContainer.appendChild(geneticsCards[i]);
        //console.log(geneticsCards[i]);
    }
}

//Create the strain cards 
function createCards () {
    
    let strains = strainList;

    //make a card for each strain from the strain List:(strains-test.json)
    let geneticsCardList = [];
    //let createdCard;
    //createdCard = strains.forEach(makeCards);
    //geneticsCardList.push(createdCard);
    for(i in strains) {
        let newCard = makeCards(strains[i]);
        geneticsCardList.push(newCard);
    }
    
    //populate the genetics cards
    populateGeneticsCard(geneticsCardList);

    function makeCards (x) {
        //create elements for the cards using strainList.json data
        const cardImg = createCardImg(x);
        const cardInfo = createCardInfo(x);
        const cardBtns = createCardBtns();
        const cardTags = createTags(x);
        //pass all the created elements to card
        let geneticsCards = card(cardInfo, cardImg, cardBtns, cardTags);

        return geneticsCards;
    }

    //pass all the created elements that need to be placed in the divs
    function card (cardInfo, cardImg, cardBtns, cardTags) {
        let cardDiv = document.createElement("div");
        let cardImgDiv = document.createElement("div");
        let cardInfoDiv = document.createElement("div");

        cardDiv.classList.add("genetics-card");
        cardImgDiv.classList.add("genetics-card__img");
        cardInfoDiv.classList.add("genetics-card__info");

        //populate divs with created elements using data from strainList.json
        for(i in cardInfo) {
            cardInfoDiv.append(cardInfo[i]);
        }
        cardInfoDiv.appendChild(cardBtns);
        cardImgDiv.appendChild(cardImg);

        //append the sections to the card
        cardDiv.appendChild(cardImgDiv);
        cardDiv.appendChild(cardInfoDiv);
        cardDiv.appendChild(cardTags);
        
        return cardDiv;
    }
    
    //create the elements that will go into the cardImg div
        //this will be replaced with a background css image when when get them
    function createCardImg (x) {
        let cardImg = document.createElement("span");
        cardImg.innerHTML = x.photo;
        return cardImg;
    }

    //create all the elements that will go into the cardInfo div
    function createCardInfo (x) {
       
        let cardTitle = document.createElement("h3");
        let cardGenetic = createCardGenetic();
        let cardGrow = createCardGrow();
        let strainName;
        let strainNameWords;

        //creating the strain card name here
        cardTitle.classList.add("genetics-card__header", "header-3");

        //capitalize all first letters of the stain name
        strainName = x.name;
        strainNameWords = strainName.split(" ");
        for(i in strainNameWords) {
            strainNameWords[i] = strainNameWords[i].charAt(0).toUpperCase() + strainNameWords[i].substr(1);
        }
        strainName = strainNameWords.join(" ");
        cardTitle.innerHTML = strainName;

        //return all card info to populate the card
        return [cardTitle, cardGenetic, cardGrow];

        //create the svg and use elements and set the image depending on the strain type: x.type
        //append the type text after
        function createCardGenetic() {
            let cardGeneticType = document.createElement("div");
            let cardGeneticSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            let cardGeneticSvgUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            let cardGeneticText = document.createElement("span");
            let geneticType;

            cardGeneticType.classList.add("genetics-card__type");
            cardGeneticSvg.classList.add("genetics__key--icon");
            cardGeneticText.classList.add("genetics__key--icon-name");

            geneticType = x.type;
            geneticType = geneticType.charAt(0).toUpperCase() + geneticType.substr(1);
            cardGeneticText.innerHTML = geneticType;

            //check type and add appropriate svg icon
            if(x.type === "indica") {
                cardGeneticSvg.classList.add("genetics-card__type--icon--1");
                cardGeneticSvgUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/sprite.svg#icon-arrow-with-circle-up');
            } else {
                cardGeneticSvg.classList.add("genetics-card__type--icon--2");
                cardGeneticSvgUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/sprite.svg#icon-arrow-with-circle-down');
            }
            cardGeneticSvg.appendChild(cardGeneticSvgUse);

            //append svgs then append text
            cardGeneticType.appendChild(cardGeneticSvg);
            cardGeneticType.appendChild(cardGeneticText);

            return cardGeneticType;
        }

        //create the svg and use elements for the grow type: x.grow
        //append the grow text after
        /**** confusing and worth noting
         *      grow is linked to "grow" in the strainList
         *      BUT is named "care" in the html 
         *      (can be changed, but recommened json name change and change in variable names 
         *          otherwise the css will need to be run through and fixed)
        *****/
        function createCardGrow () {
            let cardGrowType = document.createElement("div");
            let cardGrowSvgList = [];
            let cardGrowSvg;
            let cardGrowSvgUse;
            let cardGrowText = document.createElement("span");
            let growTypeString;
            let growTypeStringList = [];

            cardGrowType.classList.add("genetics-card__care");
            cardGrowText.innerHTML = "Grows ";

            cardGrowText.classList.add("genetics__key--icon-name");

            //capitalize first letter in string add to string list
            for(i in x.grow) {
                growTypeString = x.grow[i];
                growTypeString = growTypeString.charAt(0).toUpperCase() + growTypeString.substr(1);
                growTypeStringList.push(growTypeString);
            }

            cardGrowText.innerHTML += growTypeStringList.join("/");

            //check for grow types create appropriate svgs then add to svg lists
            for(i in x.grow) {
                cardGrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                cardGrowSvgUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
                if(x.grow[i] === "indoors") {
                    cardGrowSvg.classList.add("genetics__key--icon", "genetics-card__type--icon--3");
                    cardGrowSvgUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/sprite.svg#icon-home3');
                } else {
                    cardGrowSvg.classList.add("genetics__key--icon", "genetics-card__type--icon--4");
                    cardGrowSvgUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/sprite.svg#icon-sun');
                }

                cardGrowSvg.appendChild(cardGrowSvgUse);
                cardGrowSvgList.push(cardGrowSvg);
            }
            
            //append svgs
            for(i in cardGrowSvgList) {
                cardGrowType.appendChild(cardGrowSvgList[i]);
            }
            //append text
            cardGrowType.appendChild(cardGrowText);
            
            return cardGrowType;
        }

    }

    function createCardBtns () {
        let cardContact = document.createElement("a");
        let cardQuickview = document.createElement("a");
        let cardBtnContainer = document.createElement("div");

        cardContact.classList.add("card-btn");
        cardQuickview.classList.add("card-link");
        cardContact.href = "#";
        cardQuickview.href= "#";
        cardContact.innerHTML = "Contact Us";
        cardQuickview.innerHTML = "Quick View";

        cardBtnContainer.classList.add("genetics-card__btns");
        cardBtnContainer.appendChild(cardContact);
        cardBtnContainer.appendChild(cardQuickview);

        return cardBtnContainer;
    }

    //create tags with card object info for searching and populating pop-ups
    function createTags (x) {
        let cardTag = document.createElement("input");
        cardTag.type = "hidden";
        cardTag.value = (JSON.stringify(x));
        

        return cardTag;  
    }

   

    //append the card 
}

//onpage load run card creation 
if(window.addEventListener) {
    window.addEventListener("load", createCards, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createCards);
}