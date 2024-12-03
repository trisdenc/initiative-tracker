let characters = [];
let currentIndex = 0;

// Add a character to the initiative tracker
function addCharacter() {
  const name = document.getElementById('character-name').value;
  const initiative = parseInt(document.getElementById('initiative-score').value);

  if (name && !isNaN(initiative)) {
    characters.push({ name, initiative });
    characters.sort((a, b) => b.initiative - a.initiative); // Sort by initiative
    displayCharacters();
    document.getElementById('character-name').value = '';
    document.getElementById('initiative-score').value = '';
  } else {
    alert('Please enter a valid name and initiative score.');
  }
}

// Display the list of characters in turn order
function displayCharacters() {
  const characterList = document.getElementById('character-list');
  characterList.innerHTML = '';

  characters.forEach((char, index) => {
    const li = document.createElement('li');
    li.textContent = `${char.name} (Initiative: ${char.initiative})`;
    if (index === currentIndex) li.style.fontWeight = 'bold'; // Highlight current turn
    characterList.appendChild(li);
  });
}

// Advance to the next turn
function nextTurn() {
  if (characters.length === 0) return;

  currentIndex = (currentIndex + 1) % characters.length; // Loop back to the start
  const currentChar = characters[currentIndex];
  document.getElementById('current-turn').textContent = `Current Turn: ${currentChar.name}`;
  displayCharacters();
}
