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
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
          setTimeout(makeComputerMove, 500);
        }
      }
    }
  }

  function makeComputerMove() {
    const bestMove = getBestMove();
    bestMove.textContent = computerPlayer;

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

  function getBestMove() {
    const emptyCells = document.querySelectorAll('td:not(:empty)');
    const board = Array.from(document.querySelectorAll('td')).map(cell => cell.textContent);

    let bestScore = -Infinity;
    let bestMove;

    emptyCells.forEach(cell => {
      const index = parseInt(cell.dataset.index);
      board[index] = computerPlayer;

      const score = minimax(board, 0, false);

      board[index] = ''; // Maak de zet ongedaan

      if (score > bestScore) {
        bestScore = score;
        bestMove = cell;
      }
    });

    return bestMove;
  }

  function minimax(board, depth, isMaximizing) {
    const scores = {
      X: -1,
      O: 1,
      tie: 0,
    };

    if (checkWinner()) {
      return scores[board[getWinner()]];
    }

    if (isBoardFull()) {
      return scores.tie;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = computerPlayer;
          bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
          board[i] = '';
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = currentPlayer;
          bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
          board[i] = '';
        }
      }
      return bestScore;
    }
  }

  function getWinner() {
    const cells = document.querySelectorAll('td');
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
        return a; // Return the winning index
      }
    }

    return null; // Return null if no winner
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