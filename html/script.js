document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('ticTacToeContainer');
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  for (let i = 0; i < 3; i++) {
    const row = tbody.insertRow();
    for (let j = 0; j < 3; j++) {
      const cell = row.insertCell();
      cell.textContent = '';
      cell.addEventListener('click', () => handleCellClick(cell));
    }
  }

  table.appendChild(tbody);
  container.appendChild(table);
});

function handleCellClick(cell) {
  // Voeg hier je logica toe voor de klikbehandeling
  console.log('Cell clicked:', cell.textContent);
}
