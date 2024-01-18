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
      setTimeout(makeComputerMove, 500);
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

// De rest van de code blijft ongewijzigd
