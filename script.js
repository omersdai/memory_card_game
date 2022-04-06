// Game elements
const difficultyEl = document.getElementById('difficulty');
const cardCountEl = document.getElementById('cardCount');
const clockEl = document.getElementById('clock');
const gameEl = document.getElementById('game');

console.log(difficultyEl, cardCountEl, clockEl);

const uniqueCards = [
  { id: 2, color: 'grass' },
  { id: 5, color: 'fire' },
  { id: 8, color: 'water' },
  { id: 12, color: 'bug' },
  { id: 15, color: 'bug' },
  { id: 25, color: 'electric' },
  { id: 37, color: 'fire' },
  { id: 44, color: 'grass' },
  { id: 50, color: 'rock' },
  { id: 54, color: 'water' },
  { id: 65, color: 'psychic' },
  { id: 91, color: 'water' },
  { id: 94, color: 'ghost' },
  { id: 95, color: 'rock' },
  { id: 103, color: 'grass' },
  { id: 125, color: 'electric' },
  { id: 126, color: 'fire' },
  { id: 127, color: 'bug' },
  { id: 143, color: 'normal' },
  { id: 150, color: 'psychic' },
];

console.log(uniqueCards);

const difficulties = {
  easy: {
    cardCount: 10,
  },
  medium: {
    cardCount: 15,
  },
  hard: {
    cardCount: 20,
  },
};

let difficulty;
let cards;
let gameStarted;
let gameEnded;
let cardCount;
let matchCount;
let time;
let interval;

function initializeGame() {
  console.log(difficultyEl.value);
  difficulty = difficulties[difficultyEl.value];
  gameStarted = false;
  gameEnded = false;
  cardCount = difficulty.cardCount;
  clearInterval(interval);
  time = 0;

  cardCountEl.innerText = cardCount;
  clockEl.innerText = '0:00';

  placeCards();
}

initializeGame();

function clickCard(e) {
  console.log(e.target);
}

function startGame() {
  //activate clock
  interval = setInterval(updateClock, tick);
}

function updateClock() {
  time += tick;
  const seconds = parseInt(time / 1000) % 60;
  const minutes = parseInt(time / (1000 * 60));
  clockEl.innerText = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function placeCards() {
  cards = [];
  for (let i = 0; i < cardCount; i++) {
    const { id, color } = uniqueCards[i];
    cards.push(createCard(id, color));
    cards.push(createCard(id, color));
  }

  console.log(cards);

  cards.forEach((card) => gameEl.appendChild(card));
}

function createCard(id, color) {
  const card = document.createElement('div');
  card.className = 'flip-card';
  card.innerHTML = `
    <div class="flip-card-inner">
    <div class="flip-card-front ${color}">
      <div class="circle">
        <img src="./pokemon pictures/pokemon_${id}.png" alt="pokemon_${id}" />
      </div>
    </div>
    <div class="flip-card-back">
      <div class="circle"></div>
    </div>
  </div>
    `;

  return card;
}

difficultyEl.addEventListener('change', initializeGame); // change difficulty and reset game
