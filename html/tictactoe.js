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

      // Laat de computer een zet doen met het Minimax-algoritme
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

  // Functie om de computer een zet te laten doen met het Minimax-algoritme
  function makeComputerMove() {
    const bestMove = getBestMove();
    boardState[bestMove.index] = computerSymbol;
  }

  // Functie om de beste zet te berekenen met het Minimax-algoritme
  function getBestMove() {
    // Definieer het Maximizer en Minimizer voor het Minimax-algoritme
    const maximizer = computerSymbol;
    const minimizer = playerSymbol;

    // Functie om de score te berekenen voor het Minimax-algoritme
    function minimax(board, depth, isMaximizer) {
      const scores = {
        X: -1,
        O: 1,
        tie: 0
      };

      // Controleer of het spel is afgelopen (gewonnen, verloren of gelijkspel)
      const winner = getWinner(board);
      if (winner !== null) {
        return scores[winner];
      }

      // Maximizer (computer)
      if (isMaximizer) {
        let bestScore = -Infinity;
        let bestMove = null;

        for (let i = 0; i < board.length; i++) {
          if (board[i] === '') {
            board[i] = maximizer;
            const score = minimax(board, depth + 1, false);
            board[i] = ''; // Maak de zet ongedaan

            if (score > bestScore) {
              bestScore = score;
              bestMove = i;
            }
          }
        }

        return depth === 0 ? { index: bestMove, score: bestScore } : bestScore;
      }
      // Minimizer (speler)
      else {
        let bestScore = Infinity;

        for (let i = 0; i < board.length; i++) {
          if (board[i] === '') {
            board[i] = minimizer;
            const score = minimax(board, depth + 1, true);
            board[i] = ''; // Maak de zet ongedaan

            bestScore = Math.min(bestScore, score);
          }
        }

        return bestScore;
      }
    }

    // Initialisatie van het Minimax-algorit
