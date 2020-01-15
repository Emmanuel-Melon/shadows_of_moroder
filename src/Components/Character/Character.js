import $ from 'jquery'

class Character {
  constructor (GRID_SIZE, player, game) {
    this.GRID_SIZE = GRID_SIZE
    this.rowMin = player.rowMin
    this.rowMax = player.rowMax
    this.colMin = player.colMin
    this.colMax = player.colMax
    this.className = player.className
    this.game = game
    this.player = player
    this.add()
  }

  static getRandomInt (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  isAvailableCell (row, col) {
    return !this.game.unavailableCells.includes(`cell_${row}_${col}`)
  }

  placeItem (row, col, itemClassName) {
    const cell = $(`[data-pos='(${row}, ${col})']`)
    cell.addClass('player')
    cell.attr('data-type', 'player')
    cell.attr('data-name', this.player.name)
    cell.attr('data-turn', this.player.turn)

    // Make that cell unavailable for later use
    this.game.unavailableCells.push(`${row},${col}`)
  }

  add () {
    let randCellRow = Character.getRandomInt(0, this.GRID_SIZE - 1)
    let randCellCol = Character.getRandomInt(0, this.GRID_SIZE - 1)

    /* Keep players away */
    if (
      this.rowMin <= randCellRow &&
      randCellRow <= this.rowMax &&
      this.colMin < randCellCol &&
      randCellCol < this.colMax
    ) {
      // We've found an available cell
      if (this.isAvailableCell(randCellRow, randCellCol)) {
        this.placeItem(randCellRow, randCellCol, this.className)
      } else {
        // Try again!
        return this.add()
      }
    } else {
      // Try again!
      return this.add()
    }
  }
}

export default Character
