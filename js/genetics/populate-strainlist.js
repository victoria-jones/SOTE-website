/* 
    - read the JSON strain obj 
    - add links to "Strain List" with names from the JSON obj
*/

//parse the json data
function getStrains () {
    let strains = strainList;
    strains.forEach(createLinks);

    function createLinks (x) {
        let strainName = x.name;
        let linkList = document.getElementById("genetics-link-list");
        let strainLink = document.createElement("a");
        let strainListItem = document.createElement("li");

        strainListItem.className = "genetics__side-menu--item";
        strainLink.className = "genetics__side-menu--link link--green";
        strainLink.href = "#";
        strainLink.innerHTML = strainName;

        strainListItem.appendChild(strainLink);
        linkList.appendChild(strainListItem);
    }
}

//on pageload create eventlisteners 
if (window.addEventListener) {
    window.addEventListener("load", getStrains, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", getStrains);
}