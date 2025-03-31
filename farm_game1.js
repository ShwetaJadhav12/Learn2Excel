const draggables = document.querySelectorAll(".draggable");
const dropZones = document.querySelectorAll(".drop-zone");
const checkResultBtn = document.getElementById("check-result");
const resultDisplay = document.getElementById("result");

let userChoices = {
    seed: null,
    irrigation: null,
    storage: null
};

draggables.forEach(item => {
    item.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text", e.target.id);
    });
});

dropZones.forEach(zone => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    zone.addEventListener("drop", (e) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData("text");
        const draggedItem = document.getElementById(itemId);
        
        if (zone.childElementCount === 2) {
            alert("You can drop only one item here!");
            return;
        }

        zone.appendChild(draggedItem);

        if (zone.id === "climate-zone") userChoices.seed = itemId;
        if (zone.id === "irrigation-zone") userChoices.irrigation = itemId;
        if (zone.id === "storage-zone") userChoices.storage = itemId;
    });
});

checkResultBtn.addEventListener("click", () => {
    let score = 0;
    let feedback = "";

    // Correct combinations
    if (userChoices.seed === "seed-wheat" && userChoices.irrigation === "irrigation-drip" && userChoices.storage === "storage-silo") {
        score = 3;
        feedback = "✅ Perfect! Your wheat farming is successful!";
    } else if (userChoices.seed === "seed-rice" && userChoices.irrigation === "irrigation-flood" && userChoices.storage === "storage-warehouse") {
        score = 3;
        feedback = "✅ Great job! Your rice farming is successful!";
    } else {
        feedback = "❌ Farming failed. Check your choices!";
    }

    resultDisplay.innerHTML = `<h2>Result: ${score}/3</h2><p>${feedback}</p>`;
});
