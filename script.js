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
    characters.push({
      name,
      initiative,
      hp,
      maxHp: hp,
      avatar,
      status: '',
      conditions: [], // Initialize with no conditions
    });
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
        <div>
          <label class="condition-label">Condition:</label>
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

// Update Conditions
function updateCondition(index, condition) {
  if (condition) {
    if (!characters[index].conditions.includes(condition)) {
      characters[index].conditions.push(condition);
    }
  } else {
    characters[index].conditions = []; // Reset conditions if "None" is selected
  }
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
function removeCharacter
