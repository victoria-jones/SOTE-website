/* 
    - read the JSON strain obj 
    - add links to "Strain List" with names from the JSON obj
*/

//parse the json data
function getStrains () {
    let strains = createStrainList();
    strains.forEach(createLinks);

    function createLinks (x) {
        let strainName = x.name;
        let linkList = document.getElementById("genetics-link-list");
        let strainLink = document.createElement("a");
        let strainListItem = document.createElement("li");
        let strainHiddenInput = document.createElement("input");

        strainListItem.className = "genetics__side-menu--item";
        strainLink.className = "genetics__side-menu--link link--green";
        strainLink.href = "#";
        strainLink.innerHTML = strainName;

        //hidden input for strain info to populat popup
        strainHiddenInput.type = "hidden";
        strainHiddenInput.value = (JSON.stringify(x));

        strainListItem.appendChild(strainLink);
        strainListItem.appendChild(strainHiddenInput);
        linkList.appendChild(strainListItem);
    }
}

function createStrainList() {
    let allStrains = strainList;
    let currentStrains = [];

    for(i in allStrains) {
        if(allStrains[i].available) {
            currentStrains.push(allStrains[i]);
        }
    }

    return currentStrains;
}

//on pageload create eventlisteners 
if (window.addEventListener) {
    window.addEventListener("load", getStrains, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", getStrains);
}