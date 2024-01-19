// script.js

document.addEventListener('DOMContentLoaded', () => {
  const ticTacToeContainer = document.getElementById('ticTacToeContainer');

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

    // Voeg 'X' toe aan het vakje dat is aangeklikt (je kunt hier je eigen logica voor 'O' toevoegen)
    if (boardState[clickedIndex] === '') {
      boardState[clickedIndex] = 'X';
      drawBoard();
    }
  }

  // Tekenen van het initiële bord
  drawBoard();
});
