import $ from 'jquery'
import './Cell.css'

class UnavailableCell {
  constructor (game) {
    this.game = game
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
    cell.addClass('unavailable')
    cell.attr('data-type', 'unavailable')
    this.game.unavailableCells.push(`${row},${col}`)
  }

  dimCell () {
    let randCellRow = UnavailableCell.getRandomInt(0, this.game.gridSize - 1)
    let randCellCol = UnavailableCell.getRandomInt(0, this.game.gridSize - 1)

    if (this.isAvailableCell(randCellRow, randCellCol)) {
      this.placeItem(randCellRow, randCellCol, 'unavailable')
    } else {
      return this.dimCell()
    }
  }
}

export default UnavailableCell
