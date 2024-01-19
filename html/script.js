// script.js

document.addEventListener('DOMContentLoaded', () => {
  const ticTacToeContainer = document.getElementById('ticTacToeContainer');
  const playerSymbol = 'X';
  const computerSymbol = 'O';

  // Creëer een array om de status van elk vakje bij te houden
  const boardState = Array(9).fill('');

  // Functie om het bord op het scherm te tekenen
  function drawBoard() {
    ticTacToeContainer.innerHTML = '';

    for (let i = 0; i < boardState.length; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.textContent = boardState[i];
      cell.addEventListener('click', handleCellClick);
      ticTacToeContainer.appendChild(cell);
    }
  }

  // Functie die wordt aangeroepen wanneer een vakje wordt aangeklikt
  function handleCellClick(event) {
    const clickedIndex = event.target.dataset.index;

    // Voeg het symbool van de speler toe aan het vakje dat is aangeklikt
    if (boardState[clickedIndex] === '') {
      boardState[clickedIndex] = playerSymbol;

      // Controleer of de speler heeft gewonnen
      if (checkWinner(playerSymbol)) {
        alert('Gefeliciteerd! Je hebt gewonnen!');
        resetGame();
        return;
      }

      // Laat de computer een zet doen
      makeComputerMove();

      // Controleer of de computer heeft gewonnen
      if (checkWinner(computerSymbol)) {
        alert('Helaas, de computer heeft gewonnen.');
        resetGame();
        return;
      }

      // Controleer of het gelijkspel is
      if (boardState.every(cell => cell !== '')) {
        alert('Het is een gelijkspel!');
        resetGame();
        return;
      }

      // Tekenen van het bord na de zetten
      drawBoard();
    }
  }

  // Functie om de computer een willekeurige zet te laten doen
  function makeComputerMove() {
    const emptyCells = boardState.reduce((acc, cell, index) => {
      if (cell === '') {
        acc.push(index);
      }
      return acc;
    }, []);

    // Kies een willekeurige lege cel voor de computer
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMove = emptyCells[randomIndex];
    boardState[computerMove] = computerSymbol;
  }

  // Functie om te controleren of een speler heeft gewonnen
  function checkWinner(symbol) {
    // Definieer winnende combinaties
    const winCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontaal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticaal
      [0, 4, 8], [2, 4, 6]              // Diagonaal
    ];

    // Controleer of een van de winnende combinaties is bereikt
    return winCombos.some(combo => combo.every(index => boardState[index] === symbol));
  }

  // Functie om het spel te resetten
  function resetGame() {
    // Wis het bord en reset de bordstatus
    boardState.fill('');
    drawBoard();
  }

  // Tekenen van het initiële bord
  drawBoard();
});
