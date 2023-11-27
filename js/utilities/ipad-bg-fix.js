/**********
 *
 *  This script is for fixing the position of the ipad header image
 *  fixed background image is not supported on ipad and the mobile fix does not work
 *
 *  This added a class name to the header and contact components so styles can be applied
 *  to fix the issue
 *
 */

function checkIfIpad() {
    let isIpad = checkUserAgent();

    if(isIpad) {
        ipadFix();
    }
}

function ipadFix() {

    let header = document.getElementsByClassName('alt-header')[0];
    let contact = document.getElementsByClassName('component__contact')[0];
    let body = document.getElementsByTagName('body')[0];

    //get rid of padding on body
    body.classList.add('container__ipad');

    if(!header) {
        //merch page
        if(document.getElementsByClassName('merch-page')[0]) {
            document.getElementsByClassName('merch-page')[0].classList.add('header__ipad');
        }
        //contact page
        if(document.getElementsByClassName('contact')[0]) {
            document.getElementsByClassName('contact')[0].classList.add('header__ipad');
        }
        //homepage
        if(document.getElementsByClassName('home__header')[0]) {
            document.getElementsByClassName('home__header')[0].classList.add('header__ipad');
            document.getElementsByClassName('component__contact')[0].classList.add('component__contact__ipad');
        }

    } else {
        header.classList.add('header__ipad');
        contact.classList.add('component__contact__ipad');
    }
}

function checkUserAgent() {
    if((navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints > 2)) {
        return true;
    } else if (/iPad/i.test(navigator.userAgent)){
        return true;
    } else {
        return false;
    }
}


//initial page load
if(window.addEventListener) {
    window.addEventListener("load", checkIfIpad, false);
} else if(window.attachEvent) {
    window.attachEvent("onload", checkIfIpad);
}