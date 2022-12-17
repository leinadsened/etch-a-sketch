printGrid(16);
let display = document.getElementById("display");
let check = document.createElement("button");
check.addEventListener("click", getColors());
check.textContent = "check the colors";
display.appendChild(check);

function RGBToHSL(rgb) {
    r = rgb[0];
    g = rgb[1];
    b = rgb[2];
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
  
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    // Calculate hue
    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);
        
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

    return h;
}

function getColors(){
    let cells = document.getElementsByClassName("gridcell");
    let colorValues = [];
    
    for(i = 0; i < cells.length; i++){
        let cellStyle = cells[i].style;
        let cellColor = cellStyle.backgroundColor;
        cellColor = cellColor.replace(/[^\d,]/g, '').split(',');
        cellColor = RGBToHSL(cellColor);
        if (isNaN(cellColor)){
            colorValues.push("");
        } else {
            colorValues.push(cellColor);
        }
    }


    console.log(colorValues);

}

function printGrid(gridSize){
    let container = document.getElementById("container");
    for (i=1; i <= gridSize; i++){
        let gridRow = document.createElement("div");
        let gridHeight = 100/gridSize + "%";
        gridRow.style.height = gridHeight;
        for (j=1; j <= gridSize; j++){
            let gridCell = document.createElement("div");
            let gridWidth = 100/gridSize + "%";
            gridCell.classList.add("gridcell");
            gridCell.style.width = gridWidth;
            gridCell.addEventListener("mouseover", () => {let randomColor = Math.floor(Math.random()*360);
            gridCell.style.background = "hsl(randomColor, 100%, 50%)".replace(/randomColor/, randomColor);});
            gridRow.appendChild(gridCell);
        }
        gridRow.classList.add("grid-row");
        container.appendChild(gridRow);
    }
}

