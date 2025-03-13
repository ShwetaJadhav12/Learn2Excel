let coins = 100;
let farm = document.getElementById("farm");
let coinDisplay = document.getElementById("coins");
let weatherDisplay = document.getElementById("weather");
let farmSize = 6; // Start with 6 slots
let crops = [];
let animals = [];
let weather = "Sunny"; // Default weather

function buySeed(type) {
    let cost = { wheat: 10, corn: 15, carrot: 20 }[type];

    if (coins >= cost && crops.length < farmSize) {
        coins -= cost;
        coinDisplay.innerText = coins;
        plantCrop(type);
    } else {
        alert("Not enough coins or no space!");
    }
}

function plantCrop(type) {
    let crop = document.createElement("div");
    crop.classList.add("crop", "growing");
    crop.innerText = type + " 🌱";
    
    let growthTime = { wheat: 5000, corn: 7000, carrot: 9000 }[type];

    // Weather Effect: Rain speeds up, Drought slows down
    if (weather === "Rainy") {
        growthTime *= 0.7;
    } else if (weather === "Drought") {
        growthTime *= 1.5;
    }

    setTimeout(() => {
        crop.classList.remove("growing");
        crop.classList.add("ready");
        crop.innerText = type + " 🌾 (Ready)";
        crop.onclick = () => harvestCrop(crop, type);
    }, growthTime);

    crops.push(crop);
    farm.appendChild(crop);
}

function harvestCrop(crop, type) {
    let earnings = { wheat: 20, corn: 30, carrot: 40 }[type];
    coins += earnings;
    coinDisplay.innerText = coins;
    farm.removeChild(crop);
    crops = crops.filter(c => c !== crop);
}

// 🌦️ Weather System (Changes every 10 seconds)
function changeWeather() {
    let conditions = ["Sunny ☀️", "Rainy 🌧️", "Drought 🔥"];
    weather = conditions[Math.floor(Math.random() * conditions.length)];
    weatherDisplay.innerText = "☀️ Weather: " + weather;
}
setInterval(changeWeather, 10000);

// 🐄 Buying Animals
function buyAnimal(type) {
    let cost = type === "chicken" ? 30 : 50;
    let earnings = type === "chicken" ? 5 : 10; // Passive income

    if (coins >= cost && animals.length < farmSize) {
        coins -= cost;
        coinDisplay.innerText = coins;

        let animal = document.createElement("div");
        animal.classList.add("animal");
        animal.innerText = type === "chicken" ? "🐔 Chicken" : "🐄 Cow";

        setInterval(() => {
            coins += earnings;
            coinDisplay.innerText = coins;
        }, 5000); // Earn every 5 sec

        animals.push(animal);
        farm.appendChild(animal);
    } else {
        alert("Not enough coins or no space!");
    }
}

// 🏡 Expanding Farm
function expandFarm() {
    if (coins >= 100) {
        coins -= 100;
        coinDisplay.innerText = coins;
        farmSize += 3; // Expand slots
        alert("Farm expanded! More space available.");
    } else {
        alert("Not enough coins!");
    }
}
