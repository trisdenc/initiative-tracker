let characters = [];
let currentIndex = 0;
let roundCounter = 1;

// Add a character to the initiative tracker
function addCharacter() {
  const name = document.getElementById('character-name').value;
  const initiative = parseInt(document.getElementById('initiative-score').value);
  const hp = parseInt(document.getElementById('hp').value);
  const avatar = document.getElementById('avatar-url').value;

  if (name && !isNaN(initiative) && !isNaN(hp)) {
    characters.push({ name, initiative, hp, maxHp: hp, avatar, status: '' });
    characters.sort((a, b) => b.initiative - a.initiative); // Sort by initiative
    saveToLocalStorage();
    displayCharacters();
    document.getElementById('character-name').value = '';
    document.getElementById('initiative-score').value = '';
    document.getElementById('hp').value = '';
    document.getElementById('avatar-url').value = '';
  } else {
    alert('Please enter valid name, initiative score, and HP.');
  }
}

// Display the list of characters
function displayCharacters() {
  const characterList = document.getElementById('character-list');
  characterList.innerHTML = ''; // Clear the current list

  characters.forEach((char, index) => {
    // Determine the character's status
    if (char.hp <= 0) {
      char.status = 'Dead';
    } else if (char.hp <= char.maxHp * 0.5) {
      char.status = 'Bloodied';
    } else {
      char.status = ''; // Reset if no longer bloodied
    }

    const li = document.createElement('li');
    li.className = index === currentIndex ? 'active' : ''; // Add 'active' class to the current character

    li.innerHTML = `
      ${char.avatar ? `<img src="${char.avatar}" class="character-avatar" alt="${char.name}">` : ''}
      <div class="character-info">
        <strong>${char.name}</strong> (Initiative: ${char.initiative}) ${index === currentIndex ? '⬅️' : ''}
        <span>HP: <strong>${char.hp}</strong>/${char.maxHp}</span>
        <span class="status ${char.status === 'Bloodied' ? 'bloodied' : char.status === 'Dead' ? 'dead' : ''}">${char.status}</span>
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

// Update HP for a character
function updateHP(index, change) {
  characters[index].hp += change;
  if (characters[index].hp < 0) characters[index].hp = 0; // Prevent HP from going negative
  saveToLocalStorage();
  displayCharacters();
}

// Get the value from the HP input field
function getHPInput(index) {
  const input = document.getElementById(`hp-input-${index}`);
  const value = parseInt(input.value);
  return isNaN(value) ? 0 : value;
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

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Export and Import
function exportData() {
  const dataStr = JSON.stringify(characters);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'initiative-tracker.json';
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

// LocalStorage
function saveToLocalStorage() {
  localStorage.setItem('trackerData', JSON.stringify(characters));
}

function loadFromLocalStorage() {
  const savedData = JSON.parse(localStorage.getItem('trackerData'));
  if (savedData) {
    characters = savedData;
    displayCharacters();
  }
}

// Load data on page load
window.onload = loadFromLocalStorage;
