//watch for if the quickview button is clicked on a straincard
function createEventListeners () {
    //popup listener
    let quickviewLink = document.getElementsByClassName("card-link");
    let strainListLink = document.getElementsByClassName("genetics__side-menu--link");
    for(i in quickviewLink) {
        if(quickviewLink[i].addEventListener) {
            quickviewLink[i].addEventListener("click", (x) => { x.preventDefault(); populateQuickview(x); }, false);
        } else if (quickviewLink[i].attachEvent) {
            quickviewLink[i].attachEvent("onclick", (x) => { x.preventDefault(); populateQuickview(x); });
        }
    }

    for(i in strainListLink) {
        if(strainListLink[i].addEventListener) {
            strainListLink[i].addEventListener("click", (x) => { x.preventDefault(); populateQuickview(x); }, false);
        } else if (strainListLink[i].attachEvent) {
            strainListLink[i].attachEvent("onclick", (x) => { x.preventDefault(); populateQuickview(x); });
        }
    }


    //close button listener 
    let quickviewClose = document.getElementsByClassName("popup__close-btn")[0];
    if(quickviewClose.addEventListener) {
        quickviewClose.addEventListener("click", hidePopup, false);
    } else if (quickviewClose.attachEvent) {
        quickviewClose.attachEvent("onclick", hidePopup);
    }

    function populateQuickview(x) {
        //get selected card data depending on which link was clicked
        let selectedStrain;
        let selectedStrainUnparsed;
        //quick view link
        if(x.currentTarget.className === "card-link") {
            selectedStrainUnparsed = x.currentTarget.parentNode.parentNode.parentNode.querySelector('input[type=hidden]').value;
        } else {    //strain list link
            selectedStrainUnparsed = x.currentTarget.parentNode.querySelector('input[type=hidden]').value;
        }

        selectedStrain = JSON.parse(selectedStrainUnparsed);
        

        //open popup after populating
        populateStrainImg(selectedStrain);
        populateName(selectedStrain);
        populateStrainType(selectedStrain);
        populateStrainGrow(selectedStrain);
        populateStrainGrowTime(selectedStrain);
        populateStrainYield(selectedStrain);
        populateStrainDescription(selectedStrain);
        createTags(selectedStrain);
        showPopup();
    }

    function populateStrainImg(x) {
        //change this later to be an img bg
        //remove any span children to strainImgDiv if there are any
        removeCurrentImgSpan();
        let strainImg = x.photo[1];
        let strainImgDiv = document.getElementsByClassName("genetics-popup__img")[0];
        strainImgDiv.style.backgroundImage = `url(../img/${strainImg})`;
    }

    function removeCurrentImgSpan() {
        let strainImgDiv = document.getElementsByClassName("genetics-popup__img")[0];
        //check for children and remove them
        while(strainImgDiv.lastElementChild) {
            strainImgDiv.removeChild(strainImgDiv.lastElementChild);
        }
        
    }

    function populateName(x) {
        let strainName = x.name;
        let popupHeader = document.getElementsByClassName("genetics-popup__header")[0];

        //make first letter of each word uppercase 
        let strainNameWords = strainName.split(" ");
        for(i in strainNameWords) {
            strainNameWords[i] = strainNameWords[i].charAt(0).toUpperCase() + strainNameWords[i].substr(1);
        }
        strainName = strainNameWords.join(" ");
        popupHeader.innerHTML = strainName;
    }

    function populateStrainType(x) {
        let strainType = x.type;
        let strainTypeList = [];
        let strainTypeString;
        let popupStrainDiv = document.getElementsByClassName("genetics-popup__type")[0];
        let popupStrainSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let popupStrainSvgUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        let popupStrainSpan = document.createElement("span");
        const strainTypeRegex = /^(Sativa|sativa)/;

        //set span class and add name
        popupStrainSpan.classList.add("genetics__key--icon-name");
        
        //make the type name uppercase
        for(i in strainType) {
            strainTypeString = strainType[i];
            strainTypeString = strainTypeString.charAt(0).toUpperCase() + strainTypeString.substr(1);
            strainTypeList.push(strainTypeString);
        }

        popupStrainSpan.innerHTML += strainTypeList.join("-");

        //check type for svg icon and set classname/attributes
        if(strainTypeRegex.test(strainTypeList)) {
            popupStrainSvg.classList.add("genetics__key--icon", "genetics-card__type--icon--1");
            popupStrainSvgUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/sprite.svg#icon-arrow-with-circle-up');
        } else {
            popupStrainSvg.classList.add("genetics__key--icon", "genetics-card__type--icon--2");
            popupStrainSvgUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/sprite.svg#icon-arrow-with-circle-down');
        }
        popupStrainSvg.appendChild(popupStrainSvgUse);

        //append svgs then append text
        popupStrainDiv.appendChild(popupStrainSvg);
        popupStrainDiv.appendChild(popupStrainSpan);
    }

    function populateStrainGrow(x) {
        let strainGrow = x.grow;
        let popupGrowDiv = document.getElementsByClassName("genetics-popup__care")[0];
        let popupGrowSvgList = [];
        let popupGrowSvg;
        let popupGrowSvgUse;
        let strainGrowString;
        let strainGrowStringList = [];
        let popupGrowSpan = document.createElement("span");

        //set span class and add name 
        popupGrowSpan.classList.add("genetics__key--icon-name");
        popupGrowSpan.innerHTML = "Grows ";
        //capitalize fist letters in strainGrow
        for(i in strainGrow) {
            strainGrowString = strainGrow[i];
            strainGrowString = strainGrowString.charAt(0).toUpperCase() + strainGrowString.substr(1);
            strainGrowStringList.push(strainGrowString);
        }
        popupGrowSpan.innerHTML += strainGrowStringList.join("/");

        //check grow types and add appropiate svgs 
        for(i in strainGrow) {
            popupGrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            popupGrowSvgUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            if(strainGrow[i] === "indoors") {
                popupGrowSvg.classList.add("genetics__key--icon", "genetics-card__type--icon--3");
                popupGrowSvgUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/sprite.svg#icon-home3');
            } else {
                popupGrowSvg.classList.add("genetics__key--icon", "genetics-card__type--icon--4");
                popupGrowSvgUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/sprite.svg#icon-sun');
            }

            popupGrowSvg.appendChild(popupGrowSvgUse);
            popupGrowSvgList.push(popupGrowSvg);
        }
        
        //append svgs
        for(i in popupGrowSvgList) {
            popupGrowDiv.appendChild(popupGrowSvgList[i]);
        }
        //append text
        popupGrowDiv.appendChild(popupGrowSpan);
    }

    function populateStrainGrowTime(x) {
        let popupGrowTimeDiv = document.getElementsByClassName("genetics-popup__growtime")[0];
        let popupGrowTimeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let popupGrowTimeSvgUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        let popupGrowTimeSpan = document.createElement("span");
        let growTimeString = x.growtime;

        //set span class and add name
        popupGrowTimeSpan.classList.add("genetics__key-icon-name");

        //add the grow time to the span
        popupGrowTimeSpan.innerHTML = `${growTimeString} Weeks`;

        //create the svg for grow time
        popupGrowTimeSvg.classList.add("genetics__key--icon", "genetics-card__type--icon--5");
        popupGrowTimeSvgUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/sprite.svg#icon-clock');

        popupGrowTimeSvg.appendChild(popupGrowTimeSvgUse);

        //append svgs then append text
        popupGrowTimeDiv.appendChild(popupGrowTimeSvg);
        popupGrowTimeDiv.appendChild(popupGrowTimeSpan);
    }

    function populateStrainYield(x) {
        let popupYieldDiv = document.getElementsByClassName("genetics-popup__yield")[0];
        let popupYieldSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let popupYieldSvgUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        let popupYieldSpan = document.createElement("span");
        let strainYield = x.yield;
        let strainYieldString;

        //set span class and add name
        popupYieldSpan.classList.add("genetics__key-icon-name");

        //set first letter of yield to uppercase 
        strainYieldString = strainYield;
        strainYieldString = strainYieldString.charAt(0).toUpperCase() + strainYieldString.substr(1);

        //add the yield to the span
        popupYieldSpan.innerHTML = `${strainYieldString} Yield`;

        //create the svg for yield
        popupYieldSvg.classList.add("genetics__key--icon", "genetics-card__type--icon--6");
        popupYieldSvgUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/sprite.svg#icon-leaf');

        popupYieldSvg.appendChild(popupYieldSvgUse);

        //append svgs then append text
        popupYieldDiv.appendChild(popupYieldSvg);
        popupYieldDiv.appendChild(popupYieldSpan);
    }

    function populateStrainDescription(x) {
        let strainDescription = x.description;
        let popupDescriptionDiv = document.getElementsByClassName("genetics-popup__details")[0];
        let popupDescriptionP = document.createElement("p");

        //set classname of p element then place description 
        popupDescriptionP.classList.add("genetics-popup__p");
        popupDescriptionP.innerHTML = strainDescription;

        //append p to div
        popupDescriptionDiv.appendChild(popupDescriptionP);
    }

    //create tags with card object info for searching and populating pop-ups
    function createTags (x) {
        //first remove hidden tag if there is one
        removeCurrentHiddenTag();
        //add hidden tag with selected strain data
        let cardTag = document.createElement("input");
        let popupQuickview = document.getElementsByClassName("genetics-popup__quickview")[0];
        cardTag.type = "hidden";
        cardTag.value = (JSON.stringify(x));
        
        //attach to parent
        popupQuickview.appendChild(cardTag);
    }

    function removeCurrentHiddenTag() {
        let popupQuickview = document.getElementsByClassName("genetics-popup__quickview")[0];
        let popupInput = popupQuickview.getElementsByTagName("input");
        if(popupInput.length > 0) {
            for(i in popupInput) {
                if(popupInput[i].type === "hidden") {
                    popupInput[i].remove();
                }
            }
        }
    }

    function showPopup() {
        //display the popup
        let popupBackground = document.getElementsByClassName("popup")[0];
        let popup = document.getElementsByClassName("popup--wrapper")[0];
        let quickview = document.getElementsByClassName("genetics-popup__quickview")[0];

        popupBackground.style.zIndex = "10000";
        popupBackground.style.opacity = "1";

        popup.style.height = "95vh";
        popup.style.bottom = "0";

        quickview.style.display = "flex";
    }

    function hidePopup() {
        //hide the popup
        let popupBackground = document.getElementsByClassName("popup")[0];
        let popup = document.getElementsByClassName("popup--wrapper")[0];
        let quickview = document.getElementsByClassName("genetics-popup__quickview")[0];

        popupBackground.style.zIndex = "-1000";
        popupBackground.style.opacity = "0";

        popup.style.height = "0";
        popup.style.bottom = "110%";

        quickview.style.display = "none";

        //empty the fields too
        let popupType = document.getElementsByClassName("genetics-popup__type")[0];
        let popupGrow = document.getElementsByClassName("genetics-popup__care")[0];
        let popupDescription = document.getElementsByClassName("genetics-popup__details")[0];
        let popupGrowTime = document.getElementsByClassName("genetics-popup__growtime")[0];
        let popupYield = document.getElementsByClassName("genetics-popup__yield")[0];
        let popupDivFields = [
            popupType,
            popupGrow,
            popupDescription,
            popupGrowTime,
            popupYield
        ];

        for(i in popupDivFields) {
            popupDivFields[i].innerHTML = "";
        }   
    }
}

//onload createEventListeners
if(window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}