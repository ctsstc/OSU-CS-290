
const DIRECTIONS = Object.freeze({
  UP: Symbol('up'),
  DOWN: Symbol('down'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right')
});

// #region prototypes

// https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
String.prototype.titleCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

// https://stackoverflow.com/questions/3387427/remove-element-by-id
Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
}

// https://stackoverflow.com/questions/3387427/remove-element-by-id
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for(var i = this.length - 1; i >= 0; i--) {
      if(this[i] && this[i].parentElement) {
          this[i].parentElement.removeChild(this[i]);
      }
  }
}

// #endregion

class Cellor {

  constructor(width = 4, height = 4) {
    // Properties
    this.width = width;
    this.height = height;
    this.cells = [];

    /**
     * Properties through inits
     * Elements: body, marker, table
     * - direction, currentCell
     */

    // UI
    this._initTable();
    this._initHeaderRows();
    this._initBoard();
    this._initCurrentCell();
    this._initInput();

    // Some Style
    this.styles = new Style();
    this.styles.addStyle('tr>td { border: 1px solid black; }');
    this.styles.addStyle('.selected { border: 3px solid black; }');
    this.styles.addStyle('.marked { background-color: yellow; }');
    this.styles.addStyle('td { box-sizing: border-box; }')

    // Events
    this._eventsDirectionButtons();
    this._eventsMarkButton();
  }

  move(direction) {

    let curX = this.currentCell.x;
    let curY = this.currentCell.y;

    switch(direction) {
      case DIRECTIONS.UP:
        if (curY > 1) {
          this.currentCell.y--;
        }
        break;
      case DIRECTIONS.DOWN:
        if (curY < this.height) {
          this.currentCell.y++;
        }
        break;
      case DIRECTIONS.LEFT:
        if (curX != 1) {
          this.currentCell.x--;
        }
        break;
      case DIRECTIONS.RIGHT:
        if (curX < this.width) {
          this.currentCell.x++;
        }
        break;
    };


    this._selectCurrentCell();
  }

  markCurrentCell() {
    let x = this.currentCell.x;
    let y = this.currentCell.y;
    let cell = this._getCell(x, y);
    cell.setAttribute('class', 'selected marked');
  }

  _initTable() {
    this.table = document.createElement('table');
    this.body = document.querySelector('body');
    this.body.appendChild(this.table);
  }

  _initHeaderRows() {
    let cols = [];
    for (let i = 1; i < 5; i++) {
      cols.push(`Header ${i}`);
    }
    this._addRow(cols, true);
  }

  _initBoard() {
    for(let y = 1; y <= this.height; y++) {
      let cols = [];
      for(let x = 1; x <= this.width; x++) {
        cols.push(`${x}, ${y}`)
      }
      this._addRow(cols);
    }
  }

  _initInput() {
    // Directions
    this.direction = {};
    Object.keys(DIRECTIONS).forEach((direction) => {
      let button = document.createElement('button');
      let text = document.createTextNode(direction.titleCase());
      button.appendChild(text);
      this.body.appendChild(button);
      this.direction[direction.toLowerCase()] = button;
    });

    // Marking
    this.marker = document.createElement('button');
    let text = document.createTextNode('Mark Cell')
    this.marker.appendChild(text);
    this.body.appendChild(this.marker);
  }

  _initCurrentCell() {
    this.currentCell = {
      x: 1, 
      y: 1
    };
    this._selectCurrentCell();
  }

  _addRow(cols, header = false) {
    let row = document.createElement('tr');
    this.cells.push([]);
    let lastRow = this.cells.length - 1;
    cols.forEach((col) => {
      let cell = document.createElement(header ? 'th' : 'td');
      let text = document.createTextNode(col);
      cell.appendChild(text);
      row.appendChild(cell);
      this.cells[lastRow].push(cell);
    });
    this.table.appendChild(row);
  }

  _getCell(x, y) {
    return this.cells[y][x-1];
  }
  _selectCell(x, y) {
    // Unselect old cell
    document.querySelectorAll('td').forEach((td) => {
      td.classList.remove('selected');
    });

    // Select new cell
    this.currentCell.x = x;
    this.currentCell.y = y;
    let newCell = this._getCell(x, y);
    newCell.classList.add('selected');
  }

  _selectCurrentCell() {
    this._selectCell(this.currentCell.x, this.currentCell.y);
  }

  _eventsDirectionButtons() {
    Object.keys(DIRECTIONS).forEach((direction) => {
      this.direction[direction.toLowerCase()].onclick = () => {
        this.move(DIRECTIONS[direction]);
      };
    });
  }

  _eventsMarkButton() {
    this.marker.onclick = () => {
      this.markCurrentCell();
    };
  }


}

class Style {
  constructor() {
    Style.instances++;
    this.id = Style.instances;
    this.element = document.createElement('style');
    document.querySelector('body').appendChild(this.element);
  }

  addStyle(style) {
    let text = document.createTextNode(style);
    this.element.appendChild(text);
  }

  destroy() {
    this.element.remove();
  }

}

var board = new Cellor();
