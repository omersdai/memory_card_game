// Game elements
const gameTitleEl = document.getElementById('gameTitle');
const difficultyEl = document.getElementById('difficulty');
const cardCountEl = document.getElementById('cardCount');
const clockEl = document.getElementById('clock');
const gameEl = document.getElementById('game');

const uniqueCards = [
  { id: 2, color: 'green' },
  { id: 5, color: 'red' },
  { id: 8, color: 'blue' },
  { id: 12, color: 'orange' },
  { id: 15, color: 'orange' },
  { id: 25, color: 'yellow' },
  { id: 37, color: 'red' },
  { id: 44, color: 'green' },
  { id: 50, color: 'gray' },
  { id: 54, color: 'blue' },
  { id: 65, color: 'pink' },
  { id: 91, color: 'blue' },
  { id: 94, color: 'purple' },
  { id: 95, color: 'gray' },
  { id: 103, color: 'green' },
  { id: 125, color: 'yellow' },
  { id: 126, color: 'red' },
  { id: 127, color: 'orange' },
  { id: 143, color: 'gray' },
  { id: 150, color: 'pink' },
];

const difficulties = {
  easy: {
    cardCount: 10,
    cardHeight: '200px',
    cardWidth: '180px',
    imgSize: '150px',
  },
  medium: {
    cardCount: 15,
    cardHeight: '165px',
    cardWidth: '150px',
    imgSize: '140px',
  },
  hard: {
    cardCount: 20,
    cardHeight: '150px',
    cardWidth: '125px',
    imgSize: '100px',
  },
};
const tick = 1000;
const flipDelay = 1500; // ms, time it takes for the cards to flip back again

let difficulty;
let cards;
let firstCard;
let cardsLocked;
let gameStarted;
let gameEnded;
let cardCount;
let matchCount;
let time;
let interval;
let matchedCards; // set

function initializeGame() {
  difficulty = difficulties[difficultyEl.value];
  firstCard = null;
  cardsLocked = false;
  gameStarted = false;
  gameEnded = false;
  cardCount = difficulty.cardCount;
  clearInterval(interval);
  time = 0;
  matchedCards = new Set();

  cardCountEl.innerText = cardCount;
  clockEl.innerText = '0:00';

  placeCards();
}

initializeGame();

function clickCard(e) {
  const card = e.currentTarget;
  if (cardsLocked || card === firstCard || matchedCards.has(card)) return;

  if (!gameStarted) {
    gameStarted = true;
    startGame();
  }

  if (!firstCard) {
    firstCard = card;
  } else if (
    firstCard.getAttribute('card-id') === card.getAttribute('card-id')
  ) {
    matchedCards.add(firstCard);
    matchedCards.add(card);
    firstCard = null;
    cardCountEl.innerText = --cardCount;
    if (cardCount === 0) stopGame();
  } else {
    cardsLocked = true;
    setTimeout(() => {
      cardsLocked = false;
      firstCard.classList.remove('flipped');
      card.classList.remove('flipped');
      firstCard = null;
    }, flipDelay);
  }

  card.classList.add('flipped');
}

function startGame() {
  //activate clock
  interval = setInterval(updateClock, tick);
}

function stopGame() {
  clearInterval(interval);
}

function updateClock() {
  time += tick;
  const seconds = parseInt(time / 1000) % 60;
  const minutes = parseInt(time / (1000 * 60));
  clockEl.innerText = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function placeCards() {
  gameEl.innerHTML = ''; // Clear previous cards
  const temp = [];
  for (let i = 0; i < cardCount; i++) {
    const { id, color } = uniqueCards[i];
    temp.push(createCard(id, color));
    temp.push(createCard(id, color));
  }

  // Choose a random permutation of the cards
  cards = [];

  for (let i = 0; i < cardCount * 2; i++) {
    const idx = Math.floor(Math.random() * temp.length);
    cards.push(temp[idx]);
    temp[idx] = temp[temp.length - 1];
    temp.pop();
  }

  console.log(cards);

  cards.forEach((card) => {
    card.addEventListener('click', clickCard);
    gameEl.appendChild(card);
  });
}

function createCard(id, color) {
  const card = document.createElement('div');
  const { cardHeight, cardWidth, imgSize } = difficulty;
  card.className = 'flip-card';
  card.style.height = cardHeight;
  card.style.width = cardWidth;
  card.setAttribute('card-id', id);
  card.innerHTML = `
    <div class="flip-card-inner">
    <div class="flip-card-front bg-${color}">
      <div class="circle">
        <img src="./pokemon pictures/pokemon_${id}.png" alt="pokemon_${id}" style="height: ${imgSize}; width: ${imgSize};" />
      </div>
    </div>
    <div class="flip-card-back">
      <div class="circle"></div>
    </div>
  </div>
    `;

  return card;
}

gameTitleEl.addEventListener('click', initializeGame); // change difficulty and reset game
difficultyEl.addEventListener('change', initializeGame);
