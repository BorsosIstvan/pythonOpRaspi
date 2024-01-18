let currentPlayer = 'X';

function handleClick(cell) {
  if (!cell.textContent) {
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}
