import $ from 'jquery'

class Character {
  constructor (player, game) {
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
    return !this.game.unavailableCells.includes(`${row},${col}`)
  }

  placeItem (row, col) {
    const cell = $(`[data-pos='(${row}, ${col})']`)
    cell.addClass('player')
    cell.addClass(this.player.player)
    if (this.player.active) {
      cell.addClass('active')
    } else {
      cell.addClass('next')
    }
    cell.attr('data-type', 'player')
    cell.attr('data-name', this.player.name)
    cell.attr('data-turn', this.player.turn)

    this.game.unavailableCells.push(`${row},${col}`)
  }

  add () {
    let randCellRow = Character.getRandomInt(0, this.game.gridSize - 1)
    let randCellCol = Character.getRandomInt(0, this.game.gridSize - 1)

    if (
      this.rowMin <= randCellRow &&
      randCellRow <= this.rowMax &&
      this.colMin < randCellCol &&
      randCellCol < this.colMax
    ) {
      if (this.isAvailableCell(randCellRow, randCellCol)) {
        this.placeItem(randCellRow, randCellCol, this.className)
      } else {
        return this.add()
      }
    } else {
      return this.add()
    }
  }
}

export default Character
