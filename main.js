const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
// Class representing the game field
class Field {
  // Constructor initializes the field and player position
  constructor(field) {
    this.field = field;
    this.playerRow = 0;
    this.playerCol = 0;
  }

  print() {
    this.field.forEach((row) => {
      console.log(row.join(""));
    });
  }

  isHat(row, col) {
    return this.field[row][col] === hat;
  }

  isHole(row, col) {
    return this.field[row][col] === hole;
  }

  isOutOfBounds(row, col) {
    return (
      row < 0 ||
      row >= this.field.length ||
      col < 0 ||
      col >= this.field[0].length
    );
  }

  askAndMove() {
    let move;
    do {
      move = prompt(
        "What is your next move? (u = up, d = down, l = left, r = right): "
      );
    } while (!["u", "d", "l", "r"].includes(move));
    if (move === "u") {
      this.playerRow -= 1;
    } else if (move === "d") {
      this.playerRow += 1;
    } else if (move === "l") {
      this.playerCol -= 1;
    } else if (move === "r") {
      this.playerCol += 1;
    }
  }

  runGame() {
    while (true) {
      this.playerRow = 0;
      this.playerCol = 0;
      while (true) {
        this.print();
        this.askAndMove();
        if (this.isOutOfBounds(this.playerRow, this.playerCol)) {
          console.log("Out of bounds! Game over.");
          break;
        } else if (this.isHole(this.playerRow, this.playerCol)) {
          console.log("You fell in a hole! Game over.");
          break;
        } else if (this.isHat(this.playerRow, this.playerCol)) {
          console.log("You found your hat! You win!");
          break;
        }
        this.field[this.playerRow][this.playerCol] = pathCharacter;
      }
      const again = prompt("Play again? (y/n): ");
      if (again !== "y") {
        break;
      }
    }
  }

  static generateField(height, width, percentage) {
    let field = [];
    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        if (Math.random() < percentage) {
          row.push("O");
        } else {
          row.push("░");
        }
      }
      field.push(row);
    }
    let hatRow, hatCol;
    do {
      hatRow = Math.floor(Math.random() * height);
      hatCol = Math.floor(Math.random() * width);
    } while (hatRow === 0 && hatCol === 0);
    field[hatRow][hatCol] = "^";
    field[0][0] = "*";
    return field;
  }
}

const randomField = Field.generateField(5, 5, 0.2);
const myField = new Field(randomField);
myField.runGame();
