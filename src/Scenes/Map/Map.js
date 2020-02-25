import $ from 'jquery'
import './Map.css'

/**
 *
 */
class Map {
  constructor (game) {
    this.game = game
    this.draw()
  }

  /**
   *
   */
  draw () {
    for (let row = 0; row < this.game.gridSize; row++) {
      for (let col = 0; col < this.game.gridSize; col++) {
        this.game.gameContainer.append(Map.createGridItem(row, col))
        this.game.availableCells.push([row, col])
      }
    }
  }

  /**
   *
   * @param row
   * @param col
   * @returns {*|jQuery}
   */
  static createGridItem (row, col) {
    let cell = $('<div></div>').addClass('cell')
    cell.attr('data-row', row)
    cell.attr('data-col', col)
    cell.attr('data-type', `empty`)
    cell.attr('data-pos', `(${row}, ${col})`)
    return cell
  }
}

export default Map
