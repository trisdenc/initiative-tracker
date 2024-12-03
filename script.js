let characters = [];
let currentIndex = 0;

// Add a character to the initiative tracker
function addCharacter() {
  const name = document.getElementById('character-name').value;
  const initiative = parseInt(document.getElementById('initiative-score').value);
  const hp = parseInt(document.getElementById('hp').value);

  if (name && !isNaN(initiative) && !isNaN(hp)) {
    characters.push({ name, initiative, hp });
    characters.sort((a, b) => b.initiative - a.initiative); // Sort by initiative
    displayCharacters();
    document.getElementById('character-name').value = '';
    document.getElementById('initiative-score').value = '';
    document.getElementById('hp').value = '';
  } else {
    alert('Please enter valid name, initiative score, and HP.');
  }
}

// Display the list of characters in turn order
function displayCharacters() {
  const characterList = document.getElementById('character-list');
  characterList.innerHTML = ''; // Clear the current list

  characters.forEach((char, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="character-info">
        <strong>${char.name}</strong> (Initiative: ${char.initiative})
        <span>HP: <strong>${char.hp}</strong></span>
      </div>
      <div class="hp-controls">
        <button class="minus" onclick="updateHP(${index}, -1)">-</button>
        <button class="plus" onclick="updateHP(${index}, 1)">+</button>
      </div>
    `;
    if (index === currentIndex) {
      li.style.fontWeight = 'bold'; // Highlight current turn
      li.style.backgroundColor = '#f0f8ff'; // Optional: Light highlight for active turn
    }
    characterList.appendChild(li);
  });
}

// Update HP for a character
function updateHP(index, change) {
  characters[index].hp += change;
  if (characters[index].hp < 0) characters[index].hp = 0; // Prevent negative HP
  displayCharacters();
}

// Advance to the next turn
function nextTurn() {
  if (characters.length === 0) return;

  currentIndex = (currentIndex + 1) % characters.length; // Loop back to the start
  const currentChar = characters[currentIndex];
  document.getElementById('current-turn').textContent = `Current Turn: ${currentChar.name}`;
  displayCharacters();
}
