let currentPlayer = 'X';

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
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (currentPlayer === 'O') {
        setTimeout(makeComputerMove, 500);
      }
    }
  }
}

function makeComputerMove() {
  const emptyCells = document.querySelectorAll('td:not(:empty)');
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMove = emptyCells[randomIndex];
    computerMove.textContent = 'O';

    if (checkWinner()) {
      alert('Player O wins!');
      resetGame();
    } else if (isBoardFull()) {
      alert('It\'s a draw!');
      resetGame();
    } else {
      currentPlayer = 'X';
    }
  }
}

// Voeg de rest van je functies toe (checkWinner, isBoardFull, resetGame) hieronder
