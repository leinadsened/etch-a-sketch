let container = document.getElementById("container");
let gridSize = 16;

for (i=1; i <= gridSize; i++){
    let gridRow = document.createElement("div");
    for (j=1; j <= gridSize; j++){
        let gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridCell.addEventListener("mouseover", () => gridCell.classList.add("grid-cell-hovered"));
        gridRow.appendChild(gridCell);
    }
    gridRow.classList.add("grid-row");
    container.appendChild(gridRow);
}
