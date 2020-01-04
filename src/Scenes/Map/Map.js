import $ from 'jquery'
import './Map.css'

/**
 * components
 */
import EmptyCell from '../../Components/Cells/EmptyCell'
import Positioning from '../../Components/Movements/Positioning'
import Movement from '../../Components/Movements/Movement'

class Map {
  constructor () {
    this.body = $('<div></div>').addClass('map-scene__content-body')
    this.content = $('<div></div>').addClass('map-scene_content')

    // logic
    this.columns = 5 // change to 6
    this.rows = 7 // change to 7
    this.cells = []


    // do stuff here
    const movement = new Movement(this.cells)

    // make the entire board clickable
    this.body.click(Movement.handleCellClick)

    this.content.mouseover(() => {
      console.log("hovering")
    })
    // this.content.on('mouseout', Movement.handleCellLeave)
  }

  resizeCell () {
    // resize cell depending on the size of screen
  }

  // places an Item in a given location
  placeItem (row, col, item) {

  }

  init () {
    const emptyCell = new EmptyCell().init()

    // use an even number of rows and columns
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.cells.push(emptyCell.clone())
      }
    }

    const row = (x, m) => Math.floor(((x - 6) / m) + 2)
    // hardcoded solution
    const col = (x, m) => {
      if(x <= 5) {
        return x
      } else if (x <= 10) {
        return x - m
      } else if (x <= 15) {
        return x - m * 2
      } else if (x <= 20) {
        return x - m * 3
      } else if (x <= 25) {
        return x - m * 4
      } else if (x <= 30) {
        return x - m * 5
      } else if (x <= 35) {
        return x - m * 6
      }
    }


    this.cells.map(cell => {
      const index = (this.cells.indexOf(cell) + 1)
      cell.attr('data-id', `${index}`)
      cell.attr('data-type', `empty`)
      cell.attr('data-content', `image`)
      cell.attr('data-weapon', `image`)
      cell.attr('points', () => {
        return `${row(index, 5)},${col(index, 5)}`
      })
      return cell
    })

    const pos = new Positioning(this.cells)
    pos.initPlayerPositions()
    this.content.html(this.cells)
    return this.body.html(this.content)
  }
}

export default Map
