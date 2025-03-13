const data = {
    cuts: `
        <h2>🩹 Cuts and Scrapes</h2>
        <p>1. Clean the wound with clean water and mild soap.</p>
        <p>2. Apply an antiseptic to prevent infection.</p>
        <p>3. Cover the wound with a sterile bandage.</p>
        <p>4. Change the bandage daily.</p>
    `,
    bites: `
        <h2>🐝 Insect Bites</h2>
        <p>1. Remove the stinger if present using tweezers.</p>
        <p>2. Clean the area with soap and water.</p>
        <p>3. Apply ice to reduce swelling.</p>
        <p>4. Use antihistamine cream if itching persists.</p>
    `,
    sunburn: `
        <h2>☀️ Sunburn</h2>
        <p>1. Cool the skin with aloe vera or a damp cloth.</p>
        <p>2. Stay out of direct sunlight until healed.</p>
        <p>3. Drink lots of water to stay hydrated.</p>
    `,
    plants: `
        <h2>🌿 Poisonous Plants</h2>
        <p>1. Wash the affected area with soap and water.</p>
        <p>2. Apply calamine lotion to soothe the skin.</p>
        <p>3. If rash persists, consult a doctor.</p>
    `
};

function openModal(type) {
    const modal = document.getElementById('modal');
    const modalInfo = document.getElementById('modal-info');
    modalInfo.innerHTML = data[type];
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
};