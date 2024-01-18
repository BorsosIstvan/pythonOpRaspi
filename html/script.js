class TicTacToe {
  constructor() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.container = document.getElementById('ticTacToeContainer');
    this.render();
  }

  handleClick(index) {
    if (this.board[index] === '' && !this.checkWinner()) {
      this.board[index] = this.currentPlayer;
      this.render();
      if (this.checkWinner()) {
        alert(`Player ${this.currentPlayer} wins!`);
        this.resetGame();
      } else if (this.isBoardFull()) {
        alert('It\'s a draw!');
        this.resetGame();
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        if (this.currentPlayer === 'O') {
          setTimeout(() => this.makeComputerMove(), 500);
        }
      }
    }
  }

  makeComputerMove() {
    const emptyCells = this.getEmptyCells();
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const computerMove = emptyCells[randomIndex];
      this.board[computerMove] = 'O';
      this.render();
      if (this.checkWinner()) {
        alert('Player O wins!');
        this.resetGame();
      } else if (this.isBoardFull()) {
        alert('It\'s a draw!');
        this.resetGame();
      } else {
        this.currentPlayer = 'X';
      }
    }
  }

  getEmptyCells() {
    return this.board.reduce((emptyCells, cell, index) => {
      if (cell === '') {
        emptyCells.push(index);
      }
      return emptyCells;
    }, []);
  }

  checkWinner() {
    // Implementeer de logica voor het controleren van de winnaar
    // (deze kan vergelijkbaar zijn met de bestaande getWinner-functie)
    return false;
  }

  isBoardFull() {
    return this.board.every(cell => cell !== '');
  }

  resetGame() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.render();
    if (this.currentPlayer === 'O') {
      setTimeout(() => this.makeComputerMove(), 500);
    }
  }

  render() {
    this.container.innerHTML = '';
    const table = document.createElement('table');
    for (let i = 0; i < 3; i++) {
      const row = table.insertRow();
      for (let j = 0; j < 3; j++) {
        const cell = row.insertCell();
        const index = i * 3 + j;
        cell.textContent = this.board[index];
        cell.addEventListener('click', () => this.handleClick(index));
      }
    }
    this.container.appendChild(table);
  }
}

// Maak een instantie van TicTacToe wanneer de pagina laadt
document.addEventListener('DOMContentLoaded', () => {
  const game = new TicTacToe();
  game.render(); // Voeg hier render-aanroep toe
});
