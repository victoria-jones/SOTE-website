function createEventListeners() {
    //popup listener for contact button
    let strainContactButton = document.getElementsByClassName("card-btn");
    for(i in strainContactButton) {
        if(strainContactButton[i].addEventListener) {
            strainContactButton[i].addEventListener("click", (x) => { x.preventDefault(); showPopupContact(x); }, false);
        } else if (strainContactButton[i].attachEvent) {
            strainContactButton[i].attachEvent("onclick", (x) => { x.preventDefault(); showPopupContact(x); });
        }
    }

    //close button listener
    let quickviewClose = document.getElementsByClassName("popup__close-btn")[0];
    if(quickviewClose.addEventListener) {
        quickviewClose.addEventListener("click", hidePopup, false);
    } else if (quickviewClose.attachEvent) {
        quickviewClose.attachEvent("onclick", hidePopup);
    }


    function showPopupContact(x) {
        const selectedStrain = getStrainName(x);
        populateMessage(selectedStrain);
        showPopup();
    }

    function getStrainName(x) {
        let selectedStrain;
        //check which contact button was selected and set selectedStrain appropriately
        if(x.currentTarget.className === "genetics-popup__btn btn card-btn") {
            selectedStrain = x.currentTarget.parentNode.parentNode.querySelector('input[type=hidden]').value;
        } else {
            selectedStrain = x.currentTarget.parentNode.parentNode.parentNode.querySelector('input[type=hidden]').value;
        }
 
        selectedStrain = JSON.parse(selectedStrain);
        selectedStrain = selectedStrain.name;
        let strainWords = selectedStrain.split(" ");
        for(i in strainWords) {
            strainWords[i] = strainWords[i].charAt(0).toUpperCase() + strainWords[i].substr(1);
        }
        let strainName = strainWords.join (" ");
        
        return strainName;
    }

    function populateMessage(x) {
        let strainName = x;
        let messageArea = document.getElementById("message-quickview");
        messageArea.innerHTML = `I'm interested in ${strainName}`;
    }

    function showPopup() {
         //display the popup
         let popupBackground = document.getElementsByClassName("popup")[0];
         let popup = document.getElementsByClassName("popup--wrapper")[0];
         let contactView = document.getElementsByClassName("genetics-popup__contact")[0];
 
         popupBackground.style.zIndex = "10000";
         popupBackground.style.opacity = "1";
 
         popup.style.height = "95vh";
         popup.style.bottom = "0";
 
         contactView.style.display = "flex"; 

         //also hide quickview in case it is visible 
         let quickview = document.getElementsByClassName("genetics-popup__quickview")[0];
         quickview.style.display = "none";
    }

    function hidePopup() {
        //hide the popup and clear the message
            //the rest of the hide pop-up functionality works with populate-strain-quickview.js
        let contactView = document.getElementsByClassName("genetics-popup__contact")[0];

        contactView.style.display = "none";      
    }

}

//onload createEventListeners
if(window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}