function solve() {
  var grid = Array();
  var value;

  var possibleValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  for(var x = 0; x < 9; x++) {
    grid[x] = Array();
    for(var y = 0; y < 9; y++) {
      value = document.getElementById(x.toString() + y.toString()).value.replace(/\s/g,'');
      grid[x][y] = possibleValues.indexOf(value) == -1 ? '' : parseInt(value);
    }
  }

  solver = new Solver(grid);
  if(solver.solve()) {
    grid = solver.grid;
    for(var x = 0; x < 9; x++) {
      for(var y = 0; y < 9; y++) {
        document.getElementById(x.toString() + y.toString()).value = grid[x][y];
      }
    }
  } else {
    alert("This sudoku problem cannot be solved.");
  }
}

function clearField() {
  for(var x = 0; x < 9; x++) {
    for(var y = 0; y < 9; y++) {
      document.getElementById(x.toString() + y.toString()).value = '';
    }
  }
}
