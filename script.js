let characters = [];
let currentIndex = 0;
let roundCounter = 1;

// Add a character to the initiative tracker
function addCharacter() {
  const name = document.getElementById('character-name').value;
  const initiative = parseInt(document.getElementById('initiative-score').value);
  const hp = parseInt(document.getElementById('hp').value);

  if (name && !isNaN(initiative) && !isNaN(hp)) {
    characters.push({
      name,
      initiative,
      hp,
      maxHp: hp,
      status: '',
      conditions: [], // Initialize with no conditions
    });
    characters.sort((a, b) => b.initiative - a.initiative); // Sort by initiative
    saveToLocalStorage();
    displayCharacters();
    clearForm();
  } else {
    alert('Please enter valid name, initiative score, and HP.');
  }
}

// Display the list of characters
function displayCharacters() {
  const characterList = document.getElementById('character-list');
  characterList.innerHTML = ''; // Clear the current list

  characters.forEach((char, index) => {
    // Update the character's status
    if (char.hp <= 0) char.status = 'Dead';
    else if (char.hp <= char.maxHp * 0.5) char.status = 'Bloodied';
    else char.status = '';

    // Create the character's list item
    const li = document.createElement('li');
    li.className = index === currentIndex ? 'active' : '';

    li.innerHTML = `
      <div class="character-avatar">
        <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 70L20 70C17.7909 70 16 68.2091 16 66C16 59.3836 20.1048 53.4615 26.3003 51.1395L27.5304 50.6785C35.5704 47.6651 44.4296 47.6651 52.4696 50.6785L53.6997 51.1395C59.8952 53.4615 64 59.3836 64 66C64 68.2091 62.2091 70 60 70Z" fill="#C2CCDE" stroke="#C2CCDE" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
          <path d="M33.9015 38.8673C37.7294 40.8336 42.2706 40.8336 46.0985 38.8673C49.6611 37.0373 52.2136 33.7042 53.0516 29.7878L53.2752 28.7425C54.1322 24.7375 53.2168 20.5576 50.7644 17.2774L50.4053 16.797C47.9525 13.5163 44.0962 11.5845 40 11.5845C35.9038 11.5845 32.0475 13.5163 29.5947 16.797L29.2356 17.2774C26.7832 20.5576 25.8678 24.7375 26.7248 28.7425L26.9484 29.7878C27.7864 33.7042 30.3389 37.0373 33.9015 38.8673Z" fill="#C2CCDE" stroke="#C2CCDE" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="character-info">
        <strong>${char.name}</strong> (Initiative: ${char.initiative}) ${index === currentIndex ? '⬅️' : ''}
        <span>HP: <strong>${char.hp}</strong>/${char.maxHp}</span>
        <span class="status ${char.status === 'Bloodied' ? 'bloodied' : char.status === 'Dead' ? 'dead' : ''}">${char.status}</span>
        <div class="conditions">
          ${char.conditions.length > 0
            ? char.conditions.map((c, conditionIndex) =>
              `<span onclick="removeCondition(${index}, ${conditionIndex})">${c}</span>`).join('')
            : 'No conditions'}
        </div>
        <select class="condition-select" onchange="updateCondition(${index}, this.value)">
          <option value="">None</option>
          <option value="Blinded">Blinded</option>
          <option value="Charmed">Charmed</option>
          <option value="Deafened">Deafened</option>
          <option value="Frightened">Frightened</option>
          <option value="Grappled">Grappled</option>
          <option value="Incapacitated">Incapacitated</option>
          <option value="Invisible">Invisible</option>
          <option value="Paralyzed">Paralyzed</option>
          <option value="Petrified">Petrified</option>
          <option value="Poisoned">Poisoned</option>
          <option value="Prone">Prone</option>
          <option value="Restrained">Restrained</option>
          <option value="Stunned">Stunned</option>
          <option value="Unconscious">Unconscious</option>
        </select>
      </div>
      <div class="hp-controls">
        <button class="minus" onclick="updateHP(${index}, -getHPInput(${index}))">-</button>
        <input type="number" class="hp-input" id="hp-input-${index}" placeholder="0">
        <button class="plus" onclick="updateHP(${index}, getHPInput(${index}))">+</button>
      </div>
      <button onclick="removeCharacter(${index})">Remove</button>
    `;
    characterList.appendChild(li);
  });
}

// Get the value from the HP input field
function getHPInput(index) {
  const input = document.getElementById(`hp-input-${index}`);
  const value = parseInt(input.value);
  return isNaN(value) ? 0 : value; // Default to 0 if input is invalid
}

// Update HP for a character
function updateHP(index, change) {
  characters[index].hp = Math.max(0, characters[index].hp + change);
  saveToLocalStorage();
  displayCharacters();
}



// Update Conditions
function updateCondition(index, condition) {
  if (condition && !characters[index].conditions.includes(condition)) {
    characters[index].conditions.push(condition);
  }
  saveToLocalStorage();
  displayCharacters();
}

// Remove a condition from a character
function removeCondition(characterIndex, conditionIndex) {
  characters[characterIndex].conditions.splice(conditionIndex, 1);
  saveToLocalStorage();
  displayCharacters();
}

// Remove a character from the tracker
function removeCharacter(index) {
  characters.splice(index, 1);
  saveToLocalStorage();
  displayCharacters();
}

// Advance to the next turn
function nextTurn() {
  if (characters.length === 0) return;

  currentIndex = (currentIndex + 1) % characters.length; // Loop back to the start
  if (currentIndex === 0) {
    roundCounter++;
    document.getElementById('round-counter').innerText = `Round: ${roundCounter}`;
  }
  saveToLocalStorage();
  displayCharacters();
}

// Reset the round counter
function resetRounds() {
  roundCounter = 1;
  document.getElementById('round-counter').innerText = `Round: ${roundCounter}`;
  saveToLocalStorage();
}

// Dark Mode Toggle
function toggleDarkMode() {
  const toggle = document.getElementById('dark-mode-toggle');
  document.body.classList.toggle('dark-mode', toggle.checked);
  localStorage.setItem('darkMode', toggle.checked ? 'enabled' : 'disabled');
}

// Clear input form
function clearForm() {
  document.getElementById('character-name').value = '';
  document.getElementById('initiative-score').value = '';
  document.getElementById('hp').value = '';
}

// Export and Import
function exportData() {
  const dataStr = JSON.stringify(characters);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "initiative-tracker.json";
  a.click();
}

function importData(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    characters = JSON.parse(e.target.result);
    saveToLocalStorage();
    displayCharacters();
  };
  reader.readAsText(file);
}

// Save to LocalStorage
function saveToLocalStorage() {
  localStorage.setItem("trackerData", JSON.stringify(characters));
}

// Load from LocalStorage
function loadFromLocalStorage() {
  const savedData = JSON.parse(localStorage.getItem("trackerData"));
  if (savedData) {
    characters = savedData;
    displayCharacters();
  }
}

// Load data and dark mode preference on page load
window.onload = function () {
  const darkModePreference = localStorage.getItem('darkMode');
  if (darkModePreference === 'enabled') {
    document.body.classList.add('dark-mode');
    document.getElementById('dark-mode-toggle').checked = true;
  }
  loadFromLocalStorage();
};
