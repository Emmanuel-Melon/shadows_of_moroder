import $ from 'jquery'
import './Cell.css'

class Weapon {
  constructor (GRID_SIZE, weapon, game) {
    this.GRID_SIZE = GRID_SIZE
    this.className = weapon.name
    this.game = game
    this.add()
  }

  static getRandomInt (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  isAvailableCell (row, col) {
    return !this.game.unavailableCells.includes(`${row},${col}`)
  }

  placeItem (row, col) {
    const cell = $(`[data-pos='(${row}, ${col})']`)
    cell.addClass(this.className)
    cell.attr('data-type', 'weapon')

    // Make that cell unavailable for later use
    this.game.unavailableCells.push(`${row},${col}`)
  }

  add () {
    let randCellRow = Weapon.getRandomInt(1, this.GRID_SIZE - 2)
    let randCellCol = Weapon.getRandomInt(1, this.GRID_SIZE - 2)

    // We've found an available cell
    if (this.isAvailableCell(randCellRow, randCellCol)) {
      return this.placeItem(randCellRow, randCellCol, 'weapon')
    }
  }
}

export default Weapon
