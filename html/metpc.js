let currentPlayer = 'X';
let computerPlayer = 'O';

function handleClick(cell) {
  if (!cell.textContent) {
    cell.textContent = currentPlayer;
    if (checkWinner()) {
      alert(`Player ${currentPlayer} wins!`);
      resetGame();
    } else if (isBoardFull()) {
      alert('It\'s a draw!');
      resetGame();
    } else {
      currentPlayer = 'X';
      // Voeg een vertraging toe om de indruk te wekken dat de computer nadenkt
      setTimeout(makeComputerMove, 500);
    }
  }
}

function makeComputerMove() {
  const emptyCells = document.querySelectorAll('td:not(:empty)');
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMove = emptyCells[randomIndex];
    computerMove.textContent = computerPlayer;

    if (checkWinner()) {
      alert(`Player ${computerPlayer} wins!`);
      resetGame();
    } else if (isBoardFull()) {
      alert('It\'s a draw!');
      resetGame();
    } else {
      currentPlayer = 'X';
    }
  }
}

// De rest van de code blijft ongewijzigd
