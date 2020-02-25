import $ from 'jquery'
import './Map.css'

/**
 * components
 */
// import EmptyCell from '../../Components/Cells/EmptyCell'
// import Positioning from '../../Components/Movements/Positioning'
// import Movement from '../../Components/Movements/Movement'

class Map {
  constructor (map, gridSize, game) {
    this.gameContainer = map
    this.gridSize = gridSize
    this.game = game

    this.content = $('<div></div>').addClass('map-scene_content')
    // initialization
    this.draw()
  }

  draw () {
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        this.gameContainer.append(Map.createGridItem(row, col))
        this.game.availableCells.push([row, col])
      }
    }
  }

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
