let goalColors = ["green","red","orange","yellow","turquoise","blue","violet"];

let display = document.getElementById("display");
let scoreDisplay = document.createElement("div");
scoreDisplay.classList.add("scoreDisplay");
display.appendChild(scoreDisplay);
let goalColorDisplay = document.createElement("div");
goalColorDisplay.classList.add("goalColorDisplay");
goalColorDisplay.textContent = "This color is your goal!";
display.appendChild(goalColorDisplay);
printGrid(8,20);



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

function checkColors(goalScore, goalColor){
    let cells = document.getElementsByClassName("gridcell");
    let cellCount = 0;
    for(i = 0; i < cells.length; i++){
        let cellStyle = cells[i].style;
        let cellColor = cellStyle.backgroundColor;
        cellColor = cellColor.replace(/[^\d,]/g, '').split(',');
        cellColor = RGBToHSL(cellColor);
        if (checkColor(cellColor, goalColor)){
            cellCount++
        }
        }
    let scorePercentage = (cellCount / cells.length)*100;
    if (scorePercentage < goalScore){
        scoreDisplay.textContent = "You are " + scorePercentage + "% done, keep going!";
        return true;
    } else {
        return false;
        scoreDisplay.textContent = "Congratulations, you have compelted this level!";
    }
}

function checkColor(colorToCheck, goalColor){
    if(isNaN(colorToCheck)){
        return false;
    } else{
        switch(goalColor) {
            case "red":
                goalColorDisplay.style.backgroundColor = "hsl(0,100%,50%)";
                if (colorToCheck <= 15 || colorToCheck > 315){
                    return true;
                } else{
                    return false;
                }
            case "orange":
                goalColorDisplay.style.backgroundColor = "hsl(30,100%,50%)";
                if (colorToCheck >= 15 && colorToCheck < 45){
                    return true;
                } else{
                    return false;
                }
            case "yellow":
                goalColorDisplay.style.backgroundColor = "hsl(60,100%,50%)";
                if(colorToCheck >= 45 && colorToCheck < 75){
                    return true;
                } else{
                    return false;
                }
            case "green":
                goalColorDisplay.style.backgroundColor = "hsl(120,100%,50%)";
                if(colorToCheck >= 75 && colorToCheck < 150){
                    return true;
                } else{
                    return false;
                }
            case "turquoise":
                goalColorDisplay.style.backgroundColor = "hsl(140,100%,50%)";
                if(colorToCheck >= 150 && colorToCheck < 190){
                    return true;
                } else {
                    return false;
                }
            case "blue":
                goalColorDisplay.style.backgroundColor = "hsl(225,100%,50%)";
                if(colorToCheck >= 190 && colorToCheck < 260){
                    return true;
                } else {
                    return false;
                }
            case "violet":
                goalColorDisplay.style.backgroundColor = "hsl(295,100%,50%)";
                if(colorToCheck >= 260 && colorToCheck < 315){
                    return true;
                } else {
                    return false;
                }
        }    
    }
}

function printGrid(gridSize, goalScore){
    let container = document.getElementById("container");
    let goalColor = goalColors[Math.floor(Math.random()*goalColors.length)];
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
            gridCell.addEventListener("mouseout", () => {checkColors(goalScore, goalColor)});
            gridRow.appendChild(gridCell);
        }
        gridRow.classList.add("grid-row");
        container.appendChild(gridRow);
    }
}

