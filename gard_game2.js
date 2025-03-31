const items = document.querySelectorAll(".item");
const dropZone = document.getElementById("drop-zone");
const checkResultBtn = document.getElementById("check-result");
const resultDiv = document.getElementById("result");

let droppedItems = [];

// Drag start event
items.forEach(item => {
    item.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text", event.target.id);
    });
});

// Drag over event
dropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
});

// Drop event
dropZone.addEventListener("drop", function (event) {
    event.preventDefault();
    const itemId = event.dataTransfer.getData("text");
    
    if (!droppedItems.includes(itemId)) {
        droppedItems.push(itemId);
        const itemElement = document.getElementById(itemId).cloneNode(true);
        dropZone.appendChild(itemElement);
    }
});

// Check garden health
checkResultBtn.addEventListener("click", function () {
    let score = 0;
    let feedback = "";

    if (droppedItems.includes("seeds")) score += 20;
    if (droppedItems.includes("soil")) score += 20;
    if (droppedItems.includes("fertilizer")) score += 20;
    if (droppedItems.includes("water")) score += 20;
    if (droppedItems.includes("weeds")) score -= 30; 

    if (score >= 80) {
        feedback = "🌻 Your garden is thriving! You made great choices.";
    } else if (score >= 50) {
        feedback = "🌿 Your garden is growing, but it needs better care!";
    } else {
        feedback = "🥀 Your garden failed! Try again with better choices.";
    }

    resultDiv.innerHTML = `Score: ${score}/80 <br> ${feedback}`;
});
