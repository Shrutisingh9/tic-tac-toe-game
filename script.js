const board = document.getElementById('board');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]            // Diagonals
];

function checkWin() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            status.textContent = `${gameState[a]} wins!`;
            return;
        }
    }
    if (!gameState.includes(null)) {
        gameActive = false;
        status.textContent = 'Draw!';
    }
}

function computerMove() {
    if (!gameActive) return;

    const availableCells = gameState.map((value, index) => value === null ? index : null).filter(index => index !== null);

    if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const cellIndex = availableCells[randomIndex];

        gameState[cellIndex] = 'O';
        const cell = document.querySelector(`[data-index='${cellIndex}']`);
        cell.textContent = 'O';
        cell.classList.add('taken');

        checkWin();

        if (gameActive) {
            currentPlayer = 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function handleClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (!gameActive || gameState[cellIndex]) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    checkWin();

    if (gameActive) {
        currentPlayer = 'O'; // Switch to computer's turn
        status.textContent = 'Computer\'s turn';
        setTimeout(computerMove, 500); // Add a delay for the computer's move
    }
}

function initializeGame() {
    board.innerHTML = '';
    gameState.fill(null);
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
    }
}

restartButton.addEventListener('click', initializeGame);

initializeGame();
