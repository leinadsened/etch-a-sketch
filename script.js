let container = document.getElementById("container");
let gridSize = 0;
let check = checkNumber();
while(check){
    gridSize = prompt("How big of a grid would you like good sire?", "16");
    check = checkNumber();
}
function checkNumber(){
    if (parseInt(gridSize) > 1 && parseInt(gridSize) < 100){
        return false;
    } else {
        return true;
    }
}
for (i=1; i <= gridSize; i++){
    let gridRow = document.createElement("div");
    let gridHeight = 100/gridSize + "%";
    gridRow.style.height = gridHeight;
    for (j=1; j <= gridSize; j++){
        let gridCell = document.createElement("div");
        let gridWidth = 100/gridSize + "%";
        gridCell.classList.add("grid-cell");
        gridCell.style.width = gridWidth;
        gridCell.addEventListener("mouseover", () => {let randomColor = Math.floor(Math.random()*16777215).toString(16);
        gridCell.style.background = "#" + randomColor;});
        gridRow.appendChild(gridCell);
    }
    gridRow.classList.add("grid-row");
    container.appendChild(gridRow);
}
