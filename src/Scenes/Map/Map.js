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
    // markup
    this.body = $('<div></div>').addClass('map-scene__content-body')
    this.content = $('<div></div>').addClass('map-scene_content')

    // make the entire board clickable
    this.content.on('click', Movement.handleCellClick)

    //this.content.on('mouseover', Movement.handleCellHover)
    // this.content.on('mouseout', Movement.handleCellLeave)

    // logic
    this.columns = 5
    this.rows = 7
    this.cells = []
  }

  init () {
    const emptyCell = new EmptyCell().init()
    //
    for (let i = 0; i < this.rows; i++) {
      // this.cells.push(emptyCell.clone());
      for (let j = 0; j < this.columns; j++) {
        //
        this.cells.push(emptyCell.clone())
      }
    }


    this.cells.map(cell => {
      const index = (this.cells.indexOf(cell) + 1)
      cell.attr('data-id', `${index}`)
      // I could pick any n random cells and then set them to unavailable?
      cell.attr('data-type', `empty`)
      cell.attr('data-content', `image`)
      cell.attr('data-weapon', `image`)

      // const rowFormula = (x, m) => m * x - 2 * m + 6
      // const colFormula = (x, m) => m * x - 2 * m + 2
      // use inverse of row formula
      // const six = (x, m) => m * x - 2 * m + 6
      // const inverse = (x, m) => Math.floor(((x - 6) / m) + 2)
      const row = (x, m) => Math.floor(((x - 6) / m) + 2)

      // where is this six coming from?
      const col = (x, m) => Math.floor(((x - 7) / m) + 2)

      // set rows and columns
      // col 5, rows 7
      // use mod
      // const step_one = y - 6 = m (x - 2)
      // y - 6 = m (x - 2)
      // 11 = m * 3 - m + 6
      // console.log(`row ${index % 7}`)
      // cell.attr('row', index)
      // create function called detectPos
      cell.attr('points', () => {
        const rowFactor = 4
        // let rowPos
        const colFactor = 3
        //
        return `(${row(index, 5)}, ${col(index, 7)})`
      })
      return cell
    })

    // initialize player positions
    const pos = new Positioning(this.cells)
    pos.initPlayerPositions()
    this.content.html(this.cells)
    return this.body.html(this.content)
  }
}

export default Map
