let goalColors = ["green","red","orange","yellow","turquoise","blue","violet"];
let didWeWin = false;
let currentLevel = 1;
let display = document.getElementById("display");
let scoreDisplay = document.getElementById("scoreDisplay");
let goalColorDisplay = document.getElementById("goalColorDisplay");
goalColorDisplay.textContent = "Round " + currentLevel + ". color " + currentLevel*5 +"% to pass";
printGrid(8,5);



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
        scoreDisplay.textContent = " " + scorePercentage.toFixed(2) + "% done, keep going!";
        return false;
    } else {
        return true;
    }
}

function checkColor(colorToCheck, goalColor){
    if(isNaN(colorToCheck)){
        return false;
    } else{
        switch(goalColor) {
            case "red":
                goalColorDisplay.style.backgroundColor = "hsl(0,100%,50%)";
                if (colorToCheck <= 20 || colorToCheck > 330){
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
                if(colorToCheck >= 45 && colorToCheck < 70){
                    return true;
                } else{
                    return false;
                }
            case "green":
                goalColorDisplay.style.backgroundColor = "hsl(120,100%,50%)";
                if(colorToCheck >= 75 && colorToCheck < 140){
                    return true;
                } else{
                    return false;
                }
            case "turquoise":
                goalColorDisplay.style.backgroundColor = "hsl(175,100%,50%)";
                if(colorToCheck >= 140 && colorToCheck < 190){
                    return true;
                } else {
                    return false;
                }
            case "blue":
                goalColorDisplay.style.backgroundColor = "hsl(225,100%,50%)";
                if(colorToCheck >= 190 && colorToCheck < 255){
                    return true;
                } else {
                    return false;
                }
            case "violet":
                goalColorDisplay.style.backgroundColor = "hsl(285,100%,50%)";
                if(colorToCheck >= 255 && colorToCheck < 315){
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
            gridCell.style.backgroundColor = "white";
            gridCell.addEventListener("mouseover", () => {let randomColor = Math.floor(Math.random()*360);
            gridCell.style.background = "hsl(randomColor, 100%, 50%)".replace(/randomColor/, randomColor);});
            gridCell.addEventListener("mouseout", () => {if(checkColors(goalScore, goalColor)){
                alert("You Won! Please proceed to the next round.");
                currentLevel++;
                container.innerHTML = "";
                printGrid(8,currentLevel*5);
                goalColorDisplay.textContent = "Round " + currentLevel + ". complete " + currentLevel*5 +"% to pass";
            }});
            gridRow.appendChild(gridCell);
        }
        gridRow.classList.add("grid-row");
        container.appendChild(gridRow);
    }
    checkColor(1,goalColor);

}

