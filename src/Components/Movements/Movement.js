import $ from 'jquery'

/**
 * CellItem that could be extended by Player, Weapon or Obstacle
 */
class Movements {
  // program structure has to be changed
  constructor (cells) {
    console.log(cells)
    this.cells = cells
    this.maxSteps = 3
    this.stepTaken = 0
  }

  static extractCoords (point) {
    const pos = $(point).attr('points')
    const [x, y] = pos.split(',')
    return {
      x: parseInt(x),
      y: parseInt(y)
    }
  }

  static isCellAvailable (row, col) {
    // console.log(Movements.unavailableCells)
  }

  // moving the player
  static MovePlayer (pos, player) {

  }

  // handle differently if target isn't a cell
  // we only care about cells
  static handleCellClick (e) {
    console.log('clicked')
    const { target, delegateTarget } = e
    const type = $(target).attr('data-type') || $(delegateTarget).attr('data-type')
    console.log(type)
    if (type === 'player') {
      // the delegate of a populated div shouldn't be the map, it should instead be the div
      $(target).addClass('player-on')
      const { x, y } = Movements.extractCoords(target)
      console.log(target)
      Movements.isCellAvailable(x, y)
      console.log(`Current Location: (${x}, ${y})`)
      // get nearby cells
      // create or reference element?
      // let top = $()
      let topCell = `(${x - 1}, ${y})`
      console.log(`Top Cell: ${topCell}`)
      let bottomCell = `(${x + 1}, ${y})`
      console.log(`Bottom Cell: ${bottomCell}`)
      let rightCell = `(${x}, ${y + 1})`
      console.log(`Right Cell: ${rightCell}`)
      let leftCell = `(${x},${y - 1})`
      console.log(`Left Cell: ${leftCell}`)
    } else if (type === 'empty') {
      // $(delegateTarget).addClass('player-on')
      $(target).addClass('empty')
    }
  }

  static handleCellHover (e) {
    console.log('hovering')
    const { target, delegateTarget } = e
    const type = $(target).attr('data-type') || $(delegateTarget).attr('data-type')
    if (type === 'empty') {
      $(target).addClass('empty-hover')
      const { x, y } = Movements.extractCoords(target)
      console.log(x)
      console.log(y)
      // get nearby cells
      // let topCell = $(`.cell_${row - 1}_${col}`);
      // let bottomCell = $(`.cell_${row + 1}_${col}`);
      // let rightCell = $(`.cell_${row}_${col + 1}`);
      // let leftCell = $(`.cell_${row}_${col - 1}`);
    } else if (type === 'player') {
      $(target).addClass('player-hover')
    }
  }

  static handleCellLeave (e) {
    const { target, delegateTarget } = e
    const type = $(target).attr('data-type') || $(delegateTarget).attr('data-type')
    if (type === 'empty') {
      $(target).removeClass('cell-hovered')
    } else if (type === 'player') {
      $(delegateTarget).removeClass('player-on')
    }
  }
}
export default Movements
