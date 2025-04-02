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
    blisters: `
        <h2>🛠️ Blisters from Tools</h2>
        <p>1. Clean the area with mild soap and water.</p>
        <p>2. Cover the blister with a sterile bandage to prevent further irritation.</p>
        <p>3. Avoid popping the blister to reduce the risk of infection.</p>
    `,
    fungus: `
        <h2>🍄 Fungal Infections</h2>
        <p>1. Keep the affected area dry and clean.</p>
        <p>2. Apply antifungal cream as directed.</p>
        <p>3. Wear loose-fitting clothes to allow the skin to breathe.</p>
    `,
    pesticide: `
        <h2>☠️ Pesticide Poisoning</h2>
        <p>1. Move the person to fresh air immediately.</p>
        <p>2. Remove contaminated clothing and wash the skin with soap and water.</p>
        <p>3. Seek medical attention immediately.</p>
    `,
    thorn: `
        <h2>🌵 Thorn or Splinter Wounds</h2>
        <p>1. Carefully remove the thorn or splinter using tweezers.</p>
        <p>2. Clean the wound with soap and water.</p>
        <p>3. Apply an antiseptic and cover with a sterile bandage.</p>
    `,
    back: `
        <h2>🏋️ Back Strain</h2>
        <p>1. Rest and avoid heavy lifting.</p>
        <p>2. Apply ice or heat to reduce inflammation.</p>
        <p>3. Lift properly using your legs, not your back.</p>
    `,
    hypothermia: `
        <h2>❄️ Hypothermia</h2>
        <p>1. Get the person out of the cold and into a warm environment.</p>
        <p>2. Change into dry clothes to reduce heat loss.</p>
        <p>3. Give warm drinks (but not alcohol) to raise body temperature.</p>
    `,
    dehydration: `
        <h2>🚰 Dehydration</h2>
        <p>1. Drink plenty of water, especially in hot weather.</p>
        <p>2. Rest in a shaded or cool area.</p>
        <p>3. Avoid caffeinated and alcoholic beverages.</p>
    `,
    electric: `
        <h2>⚡ Electrocution</h2>
        <p>1. Turn off the power supply immediately to avoid further injury.</p>
        <p>2. Check for burns and treat as needed.</p>
        <p>3. Call emergency services immediately.</p>
    `,
    tetanus: `
        <h2>🦠 Tetanus Risk</h2>
        <p>1. Clean the wound thoroughly with soap and water.</p>
        <p>2. Apply an antiseptic to reduce infection risk.</p>
        <p>3. Ensure tetanus vaccination is up to date.</p>
    `,
    handfoot: `
        <h2>👢 Hand & Foot Injuries</h2>
        <p>1. Stop bleeding by applying pressure.</p>
        <p>2. Clean the injury and apply a sterile dressing.</p>
        <p>3. Seek immediate medical attention if the injury is severe.</p>
    `
};

function openModal(type) {
    const modal = document.getElementById('modal');
    const modalInfo = document.getElementById('modal-info');
    modalInfo.innerHTML = data[type];  // Add the content dynamically
    modal.style.display = 'block';  // Show the modal
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';  // Hide the modal
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();  // Close modal if clicked outside the modal
    }
};