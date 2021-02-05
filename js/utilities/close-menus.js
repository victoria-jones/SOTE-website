function createEventListeners () {
    //listen for clicks on the drop menu 
    let dropMenuLinks = document.getElementsByClassName("site-nav__droplink");
    for(i in dropMenuLinks) {
        if(dropMenuLinks[i].addEventListener) {
            dropMenuLinks[i].addEventListener("click", checkhref, false);
        } else if (dropMenuLinks[i].attachEvent) {
            dropMenuLinks[i].attachEvent("onclick", checkhref);
        }
    }

    //listen for clicks on the main menu when in mobile view 
    //check if mobile menu is active(first listenter) then run second listener for link clicks
    let mobileMenuOpen = document.getElementById("nav-mobile-toggle");
    if(mobileMenuOpen.addEventListener) {
        mobileMenuOpen.addEventListener("change", (x) => {
            if(x.target.checked) { 
                let menuLinks = document.getElementsByClassName("site-nav__link");
                for(i in menuLinks) {
                    //check to make sure the link item has an href (one does not bc it has a drop down menu instead)
                    if(menuLinks[i].href) {
                        console.log(menuLinks[i].href);
                        if(menuLinks[i].addEventListener) {
                            menuLinks[i].addEventListener("click", checkhref, false);
                        } else if (menuLinks[i].attachEvent) {
                            menuLinks[i].attachEvent("onclick", checkhref);
                        }
                    }
                }
             }
             //remove the listeners when the mobile menu is not active (do not what this to run with mobile menu gone)
                //this includes not listening when on desktop or larger screen views
            else { 
                let menuLinks = document.getElementsByClassName("site-nav__link");
                for(i in menuLinks) {
                    //check to make sure the link item has an href (one does not bc it has a drop down menu instead)
                    if(menuLinks[i].href) {
                        console.log(menuLinks[i].href);
                        if(menuLinks[i].removeEventListener) {
                            menuLinks[i].removeEventListener("click", checkhref, false);
                        } else if (menuLinks[i].detachEvent) {
                            menuLinks[i].detachEvent("onclick", checkhref);
                        }
                    }
                }
            }
        }, false);
    }else if (mobileMenuOpen.attachEvent) {
        mobileMenuOpen.attachEvent("onchange", (x) => {
            if(x.target.checked) { console.log("add event listener for menu items") }
            else { console.log("remove event listener for menu items") }
        });
    }
}

function checkhref(x) {
    //x.preventDefault(); //temporary
    let linkHref = x.target.getAttribute("href");
    
    //if href === "#" uncheck the checkbox for the target (so the css will close the list)
    if(linkHref === "#") {
        const checkBox = getCheckBox(x);
        closeMenu(checkBox);
    }

    function getCheckBox(x) {
        let linkTargetClassName = x.target.className;
        let checkBoxLocation;
        const dropDownRegex = /(droplink)/;
        const mobileMenuLinkRegex = /(site-nav__link)/;

        let regexTestDropDown = dropDownRegex.test(linkTargetClassName);
        let regexTestMobileMenu = mobileMenuLinkRegex.test(linkTargetClassName);
        
        if(regexTestDropDown) {
            checkBoxLocation = x.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('input[type=checkbox]');
            return [checkBoxLocation, true];
        } else if(regexTestMobileMenu) {
            checkBoxLocation = x.target.parentNode.parentNode.parentNode.parentNode.querySelector('input[type=checkbox]');
            return [checkBoxLocation, false];
        }
    }
}

function closeMenu(checkBox) {
    let [ currentCheckbox, closeMobileMenu ] = checkBox;
    //set the target's respective checkbox to unchecked so that the menu will close
    currentCheckbox.checked = false;
    //check for whether the mobile menu is open (thro a check box if return value for closeMobileMenu is true)
        //if open also close the mobiel menu by setting its checkbox to false 
    let mobileMenuCheckbox  = document.getElementById("nav-mobile-toggle");
    if(closeMobileMenu) {
        mobileMenuCheckbox.checked = false;
    }

    console.log(closeMobileMenu);
}

//create event listeners
if(window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
}else if(window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}