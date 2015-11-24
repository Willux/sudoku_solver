function Solver(grid) {
  this.grid = Array();
  this.openFields = Array();

  for(var x = 0; x < 9; x++) {
    this.grid[x] = Array();
    for(var y = 0; y < 9; y++) {
      this.grid[x][y] = grid[x][y];
      if(grid[x][y] == '') {
        this.openFields.push([x, y]);
      }
    }
  }
}

Solver.prototype.solve = function() {
  if(this.isSolvable()) {
    return this.solveHelper(0);
  } else {
    return false;
  } 
}

Solver.prototype.solveHelper = function(index) {
  var currX, currY, currNum;

  if(index == this.openFields.length) {
    return true;
  }

  currX = this.openFields[index][0];
  currY = this.openFields[index][1];

  currNum = 1;
  while(currNum <= 9 && !this.isPossible(currX, currY, currNum)) {
    currNum++;
  }

  if(currNum > 9) {
    return false;
  } else {
    this.grid[currX][currY] = currNum;
    while(!this.solveHelper(index + 1)) {
      currNum++;
      while(currNum <= 9 && !this.isPossible(currX, currY, currNum)) {
        currNum++;
      }

      if(currNum > 9) {
        this.grid[currX][currY] = '';
        return false;
      } else {
        this.grid[currX][currY] = currNum;
      }
    }
    return true;
  }
}

Solver.prototype.isSolvable = function() {
  for(var x = 0; x < 9; x++) {
    for(var y = 0; y < 9; y++) {
      if(this.grid[x][y] != '' && !this.isPossible(x, y, this.grid[x][y])) {
        return false;
      }
    }
  }
  return true;
}

Solver.prototype.isPossible = function(x, y, number) {
  var currX, currY, result;

  for(var row = 0; row < 9; row++) {
    // Ensure that we are not comparing the slot
    // to itself.
    if(row != x && this.grid[row][y] == number) {
      return false;
    }
  }

  for(var col = 0; col < 9; col++) {
    if(col != y && this.grid[x][col] == number) {
      return false;
    }
  }

  if(x % 3 == 0 && y % 3 == 0) {
    result  = (this.grid[x][y + 1] == number)
    result = result || (this.grid[x][y + 2] == number);
    result = result || (this.grid[x + 1][y] == number);
    result = result || (this.grid[x + 1][y + 1] == number);
    result = result || (this.grid[x + 1][y + 2] == number);
    result = result || (this.grid[x + 2][y] == number);
    result = result || (this.grid[x + 2][y + 1] == number);
    result = result || (this.grid[x + 2][y + 2] == number);
  } else if(x % 3 == 0 && y % 3 == 1) {
    result  = (this.grid[x][y - 1] == number);
    result = result || (this.grid[x][y + 1] == number);
    result = result || (this.grid[x + 1][y] == number);
    result = result || (this.grid[x + 1][y - 1] == number);
    result = result || (this.grid[x + 1][y + 1] == number);
    result = result || (this.grid[x + 2][y] == number);
    result = result || (this.grid[x + 2][y - 1] == number);
    result = result || (this.grid[x + 2][y + 1] == number);
  } else if(x % 3 == 0 && y % 3 == 2) {
    result  = (this.grid[x][y - 1] == number);
    result = result || (this.grid[x][y - 2] == number);
    result = result || (this.grid[x + 1][y] == number);
    result = result || (this.grid[x + 1][y - 1] == number);
    result = result || (this.grid[x + 1][y - 2] == number);
    result = result || (this.grid[x + 2][y] == number);
    result = result || (this.grid[x + 2][y - 1] == number);
    result = result || (this.grid[x + 2][y - 2] == number);
  } else if(x % 3 == 1 && y % 3 == 0) {
    result  = (this.grid[x][y + 1] == number);
    result = result || (this.grid[x][y + 2] == number);
    result = result || (this.grid[x - 1][y] == number);
    result = result || (this.grid[x - 1][y + 1] == number);
    result = result || (this.grid[x - 1][y + 2] == number);
    result = result || (this.grid[x + 1][y] == number);
    result = result || (this.grid[x + 1][y + 1] == number);
    result = result || (this.grid[x + 1][y + 2] == number);
  } else if(x % 3 == 1 && y % 3 == 1) {
    result  = (this.grid[x][y - 1] == number);
    result = result || (this.grid[x][y + 1] == number);
    result = result || (this.grid[x - 1][y] == number);
    result = result || (this.grid[x - 1][y - 1] == number);
    result = result || (this.grid[x - 1][y + 1] == number);
    result = result || (this.grid[x + 1][y] == number);
    result = result || (this.grid[x + 1][y - 1] == number);
    result = result || (this.grid[x + 1][y + 1] == number);
  } else if(x % 3 == 1 && y % 3 == 2) {
    result  = (this.grid[x][y - 1] == number);
    result = result || (this.grid[x][y - 2] == number);
    result = result || (this.grid[x - 1][y] == number);
    result = result || (this.grid[x - 1][y - 1] == number);
    result = result || (this.grid[x - 1][y - 2] == number);
    result = result || (this.grid[x + 1][y] == number);
    result = result || (this.grid[x + 1][y - 1] == number);
    result = result || (this.grid[x + 1][y - 2] == number);
  } else if(x % 3 == 2 && y % 3 == 0) {
    result  = (this.grid[x][y + 1] == number);
    result = result || (this.grid[x][y + 2] == number);
    result = result || (this.grid[x - 1][y] == number);
    result = result || (this.grid[x - 1][y + 1] == number);
    result = result || (this.grid[x - 1][y + 2] == number);
    result = result || (this.grid[x - 2][y] == number);
    result = result || (this.grid[x - 2][y + 1] == number);
    result = result || (this.grid[x - 2][y + 2] == number);
  } else if(x % 3 == 2 && y % 3 == 1) {
    result  = (this.grid[x][y - 1] == number);
    result = result || (this.grid[x][y + 1] == number);
    result = result || (this.grid[x - 1][y] == number);
    result = result || (this.grid[x - 1][y - 1] == number);
    result = result || (this.grid[x - 1][y + 1] == number);
    result = result || (this.grid[x - 2][y] == number);
    result = result || (this.grid[x - 2][y - 1] == number);
    result = result || (this.grid[x - 2][y + 1] == number);
  } else { // (x % 3 == 2 && y % 3 == 2)
    result  = (this.grid[x][y - 1] == number);
    result = result || (this.grid[x][y - 2] == number);
    result = result || (this.grid[x - 1][y] == number);
    result = result || (this.grid[x - 1][y - 1] == number);
    result = result || (this.grid[x - 1][y - 2] == number);
    result = result || (this.grid[x - 2][y] == number);
    result = result || (this.grid[x - 2][y - 1] == number);
    result = result || (this.grid[x - 2][y - 2] == number);
  }

  return !result;
}

