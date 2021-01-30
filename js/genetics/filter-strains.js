//listen for changes to the filter list
    //apply changes immediately

function createEventListeners () {
    console.log("filter!");
}

//on pageload create eventlisteners 
if (window.addEventListener) {
    window.addEventListener("load", createEventLiseners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventLiseners);
}