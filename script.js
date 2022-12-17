let container = document.getElementById("container");
let gridSize = 16;

for (i=1; i <= gridSize; i++){
    let gridRow = document.createElement("div");
    let gridHeight = 100/gridSize + "%";
    gridRow.style.height = gridHeight;
    for (j=1; j <= gridSize; j++){
        let gridCell = document.createElement("div");
        let gridWidth = 100/gridSize + "%";
        gridCell.classList.add("grid-cell");
        gridCell.style.width = gridWidth;
        gridCell.addEventListener("mouseover", () => {let randomColor = Math.floor(Math.random()*360);
        gridCell.style.background = "hsl(randomColor, 100%, 50%)".replace(/randomColor/, randomColor);});
        gridRow.appendChild(gridCell);
    }
    gridRow.classList.add("grid-row");
    container.appendChild(gridRow);
}
