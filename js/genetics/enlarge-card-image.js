function createEventListeners() {
    let cardDisplayImgs = document.getElementsByClassName("genetics-card__img");

    for(i in cardDisplayImgs) {
        if(cardDisplayImgs[i].addEventListener) {
            cardDisplayImgs[i].addEventListener("click", enlargeImgView, false);
        } else if(cardDisplayImgs[i].attachEvent) {
            cardDisplayImgs[i].attachEvent("onclick", enlargeImgView);
        }
    }

    //close button lisetener
    let enlargeImageViewClose = document.getElementsByClassName("popup__close-btn")[0];
    if(enlargeImageViewClose.addEventListener) {
        enlargeImageViewClose.addEventListener("click", closePopup, false);
    } else if (enlargeImageViewClose.attachEvent) {
        enlargeImageViewClose.attachEvent("onclick", closePopup);
    }
}

function enlargeImgView(target) {
    let clickedImage = JSON.parse(target.currentTarget.parentNode.querySelector('input[type=hidden]').value);
    let imageToEnlarge = clickedImage.photo[2];
    console.log(imageToEnlarge);

    //open popup
    openPopup();

    //populate popup with image
    let enlargedImageView = document.getElementsByClassName("genetics-popup__card-image")[0];

    enlargedImageView.style.backgroundImage = `url(img/${imageToEnlarge})`;
}

function openPopup() {
    let popupBackground = document.getElementsByClassName("popup")[0];
    let popup = document.getElementsByClassName("popup--wrapper")[0];
    let enlargedImageView = document.getElementsByClassName("genetics-popup__card-image")[0];

    popupBackground.style.zIndex = "10000";
    popupBackground.style.opacity = "1";

    popup.style.height = "95vh";
    popup.style.bottom = "0";

    enlargedImageView.style.display = "block";
}

//close and reset popup
function closePopup() {
    //hide the popup
    let popupBackground = document.getElementsByClassName("popup")[0];
    let popup = document.getElementsByClassName("popup--wrapper")[0];
    let enlargedImageView = document.getElementsByClassName("genetics-popup__card-image")[0];

    popupBackground.style.zIndex = "-1000";
    popupBackground.style.opacity = "0";

    popup.style.height = "0";
    popup.style.bottom = "110%";

    enlargedImageView.style.display = "none";
}

//onpage load create event listener
if(window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}