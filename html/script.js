  let currentPlayer = 'X';
  let computerPlayer = 'O';

  // Laat de computer beginnen
  setTimeout(makeComputerMove, 500);

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
      // Probeer een dreigende winst te blokkeren
      const blockingMove = findBlockingMove();
      if (blockingMove) {
        blockingMove.textContent = computerPlayer;
      } else {
        // Doe anders een willekeurige zet
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerMove = emptyCells[randomIndex];
        computerMove.textContent = computerPlayer;
      }

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

  function findBlockingMove() {
    // Implementeer de logica om een dreigende winst van de speler te blokkeren
    const cells = document.querySelectorAll('td');
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      const values = [cells[a].textContent, cells[b].textContent, cells[c].textContent];
      const playerCount = values.filter(value => value === 'X').length;
      const computerCount = values.filter(value => value === 'O').length;
      if (playerCount === 2 && computerCount === 0) {
        // Blokkeer de dreigende winst
        if (values[0] === '') return cells[a];
        if (values[1] === '') return cells[b];
        if (values[2] === '') return cells[c];
      }
    }

    return null;
  }

  function checkWinner() {
    // Implementeer de logica voor het controleren van de winnaar
    const cells = document.querySelectorAll('td');
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
        return true;
      }
    }

    return false;
  }

  function isBoardFull() {
    const cells = document.querySelectorAll('td');
    return Array.from(cells).every(cell => cell.textContent !== '');
  }

  function resetGame() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';

    // Laat de computer opnieuw beginnen na reset
    setTimeout(makeComputerMove, 500);
  }