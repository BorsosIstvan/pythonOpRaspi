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
    }
  }
}

function checkWinner() {
  const cells = document.querySelectorAll('td');
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
  });
}

function isBoardFull() {
  const cells = document.querySelectorAll('td');
  return Array.from(cells).every(cell => cell.textContent !== '');
}

function resetGame() {
  const cells = document.querySelectorAll('td');
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
}
