const levels = [
    {
        type: "form",
        question: "Farmer Ravi wants to grow rice. Select the most suitable options.",
        fields: [
            { label: "Climate", options: ["Hot & Humid", "Cold & Dry", "Desert"], answer: "Hot & Humid" },
            { label: "Irrigation Type", options: ["Drip", "Flood", "Sprinkler"], answer: "Flood" },
            { label: "Storage Type", options: ["Silo", "Barn", "Warehouse"], answer: "Warehouse" },
        ],
        hints: [
            "Rice requires a warm and humid environment.",
            "Rice is usually grown in flooded fields."
        ]
    },
    {
        type: "arrange",
        items: ["Ploughing", "Sowing", "Irrigation", "Harvesting"],
        correctOrder: ["Ploughing", "Sowing", "Irrigation", "Harvesting"],
        hints: [
            "Ploughing comes first to prepare the land.",
            "Irrigation always follows sowing the seeds."
        ]
    },
    {
        type: "match",
        pairs: {
            "Tractor": "Ploughing",
            "Seeder": "Sowing",
            "Sprinkler": "Irrigation"
        },
        hints: [
            "Tractors are used for soil preparation.",
            "Sprinklers help in watering crops."
        ]
    },
    {
        type: "odd",
        question: "Identify the odd one out related to rice farming.",
        options: ["Flood Irrigation", "Paddy Fields", "Desert Soil", "Wetlands"],
        answer: "Desert Soil",
        hints: [
            "Rice needs water-rich environments.",
            "Deserts lack sufficient water for rice."
        ]
    },
    {
        type: "fertilizer",
        question: "Select the best fertilizer for rice crops.",
        options: ["NPK", "Urea", "Lime", "Compost"],
        answer: "NPK",
        hints: [
            "NPK contains Nitrogen, Phosphorus, Potassium.",
            "Essential nutrients help rice grow healthy."
        ]
    }
];

let currentLevel = 0;
let hintCount = 0;

function loadLevel() {
    const level = levels[currentLevel];
    const container = document.getElementById("task-container");
    container.innerHTML = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("level-display").textContent = `Level: ${currentLevel + 1}`;
    hintCount = 0;

    if (level.type === "form") {
        container.innerHTML += `<p>${level.question}</p>`;
        level.fields.forEach((field, index) => {
            const select = document.createElement("select");
            select.id = `field-${index}`;
            select.innerHTML = field.options.map(opt => `<option value="${opt}">${opt}</option>`).join("");
            container.innerHTML += `<label>${field.label}: </label>`;
            container.appendChild(select);
            container.innerHTML += `<br/><br/>`;
        });
    } else if (level.type === "arrange") {
        container.innerHTML += `<p>Arrange the steps of farming in correct order:</p>`;
        let shuffled = [...level.items].sort(() => Math.random() - 0.5);
        shuffled.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "draggable";
            div.textContent = item;
            div.draggable = true;
            div.id = `step-${index}`;
            container.appendChild(div);
        });
        makeSortable();
    } else if (level.type === "match") {
        container.innerHTML += `<p>Match the tool with its function:</p>`;
        const tools = Object.keys(level.pairs);
        const uses = Object.values(level.pairs).sort(() => Math.random() - 0.5);

        tools.forEach(tool => {
            container.innerHTML += `<div>${tool}: <select id="${tool}">${uses.map(use => `<option value="${use}">${use}</option>`)}</select></div><br/>`;
        });
    } else if (level.type === "odd") {
        container.innerHTML += `<p>${level.question}</p>`;
        level.options.forEach((opt, i) => {
            container.innerHTML += `<div><input type="radio" name="odd" value="${opt}" id="opt-${i}"><label for="opt-${i}">${opt}</label></div>`;
        });
    } else if (level.type === "fertilizer") {
        container.innerHTML += `<p>${level.question}</p>`;
        level.options.forEach((opt, i) => {
            container.innerHTML += `<div><input type="radio" name="fertilizer" value="${opt}" id="fert-${i}"><label for="fert-${i}">${opt}</label></div>`;
        });
    }
    
}

function makeSortable() {
    const container = document.getElementById("task-container");
    let dragging = null;

    container.querySelectorAll('.draggable').forEach(elem => {
        elem.addEventListener("dragstart", e => dragging = e.target);
        elem.addEventListener("dragover", e => e.preventDefault());
        elem.addEventListener("drop", e => {
            e.preventDefault();
            if (dragging && dragging !== e.target) {
                const tmp = dragging.textContent;
                dragging.textContent = e.target.textContent;
                e.target.textContent = tmp;
            }
        });
    });
}

document.getElementById("check-btn").addEventListener("click", () => {
    const level = levels[currentLevel];
    const feedback = document.getElementById("feedback");

    if (level.type === "form") {
        let correct = true;
        level.fields.forEach((field, i) => {
            const val = document.getElementById(`field-${i}`).value;
            if (val !== field.answer) correct = false;
        });

        if (correct) nextLevel();
        else showHintOrAnswer(level);
    }

    if (level.type === "arrange") {
        const steps = Array.from(document.querySelectorAll(".draggable")).map(d => d.textContent);
        if (JSON.stringify(steps) === JSON.stringify(level.correctOrder)) nextLevel();
        else showHintOrAnswer(level);
    }

    if (level.type === "match") {
        let correct = true;
        Object.entries(level.pairs).forEach(([tool, task]) => {
            if (document.getElementById(tool).value !== task) correct = false;
        });
        if (correct) nextLevel();
        else showHintOrAnswer(level);
    }

    if (level.type === "odd") {
        const selected = document.querySelector("input[name='odd']:checked");
        if (selected && selected.value === level.answer) nextLevel();
        else showHintOrAnswer(level);
    }

    if (level.type === "fertilizer") {
        const selected = document.querySelector("input[name='fertilizer']:checked");
        if (selected && selected.value === level.answer) nextLevel();
        else showHintOrAnswer(level);
    }
});

document.getElementById("hint-btn").addEventListener("click", () => {
    const level = levels[currentLevel];
    const feedback = document.getElementById("feedback");
    if (hintCount < 2) {
        feedback.textContent = "Hint: " + level.hints[hintCount];
        hintCount++;
    } else {
        feedback.textContent = "❌ Answer: " + (level.answer || JSON.stringify(level.correctOrder || level.pairs));
    }
});

function showHintOrAnswer(level) {
    const feedback = document.getElementById("feedback");
    if (hintCount < 2) {
        feedback.textContent = "❌ Incorrect. Hint: " + level.hints[hintCount];
        hintCount++;
    } else {
        feedback.textContent = "❌ Correct answer: " + (level.answer || JSON.stringify(level.correctOrder || level.pairs));
    }
}

function nextLevel() {
    currentLevel++;
    if (currentLevel < levels.length) {
        loadLevel();
    } else {
        document.getElementById("task-container").innerHTML = "<h2>🎉 Congratulations! You've completed all levels!</h2>";
        document.querySelector(".actions").style.display = "none";
        document.getElementById("level-display").style.display = "none";
    }
}

window.onload = loadLevel;
