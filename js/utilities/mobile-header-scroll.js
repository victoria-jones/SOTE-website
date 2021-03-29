/**********
 * 
 *  This script is for fixing the position of the mobile header image
 *  fixed background image is not supported on some mobile browsers
 *  This is a workaround ONLY for pages that have 2 fixed images on the page (header and contact)
 *  
 */

//initial width check
function checkPageWidth() {
    let currentScreenSize = window.innerWidth;


    if(currentScreenSize <= 600) {
        //mobileFixedHeader();
        watchScrollPosition();
    } else {
        stopWatchingScrollPosition();
    }
}

//event listener
function createEventListener() {
    if(window.addEventListener) {
        window.addEventListener("resize", checkPageWidth, false);
    } else if (window.attachEvent) {
        window.attachEvent("onresize", checkPageWidth);
    }
}

//ADD the class name to remove the fixed header from view
function removeMobileFixedHeader () {
    let header = document.getElementsByClassName('alt-header')[0];
    let headerClasses = header.classList;
    let addClass = false;
    
    for(i in headerClasses) {
        if(headerClasses[i] === "alt-header__bg-attachment-fix") {
            addClass = false;
            break;
        } else {
            addClass = true;
        }
    }

    if(addClass) {
        header.classList.add("alt-header__bg-attachment-fix");
    }
}

//REMOVE the class name to bring the header back into view
function addMobileFixedHeader() {
    let header = document.getElementsByClassName('alt-header')[0];
    let headerClasses = header.classList;
    let removeClass = false;
    
    for(i in headerClasses) {
        if(headerClasses[i] === "alt-header__bg-attachment-fix") {
            removeClass = true;
            break;
        } else {
            removeClass = false;
        }
    }

    if(removeClass) {
        header.classList.remove("alt-header__bg-attachment-fix");
    }
}

//read the users scroll position to determine when to add or remove the class name for the header image
function getScrollPosition() {
    let userScrollPosition = window.scrollY;
    const actionScrollPosition = createScrollActionPosition();

    if(userScrollPosition >= actionScrollPosition) {
        removeMobileFixedHeader();
    } else {
        addMobileFixedHeader();
    }
}

function watchScrollPosition() {
    if(window.addEventListener) {
        window.addEventListener("scroll", getScrollPosition, false);
    } else if(window.attachEvent) {
        window.attachEvent("onscroll", getScrollPosition);
    }
}

function stopWatchingScrollPosition() {
    if(window.removeEventListener) {
        window.removeEventListener("scroll", getScrollPosition, false);
    } else if(window.detachEvent) {
        window.detachEvent("onscroll", getScrollPosition);
    }
}

//calculate the point at the user's scroll that the fixed image needs to change classnames
    //dependent on the size of the page
function createScrollActionPosition() {
    let header = document.getElementsByClassName("header")[0];
    let headerHeight = header.offsetHeight;
    let pointofChange = headerHeight + 50;
    return pointofChange;
}


//initial page load
if(window.addEventListener) {
    window.addEventListener("load", checkPageWidth, false);
    window.createEventListener("load", createEventListener, false);
} else if(window.attachEvent) {
    window.attachEvent("onload", checkPageWidth);
    window.attachEvent("onload", createEventListener);
}
