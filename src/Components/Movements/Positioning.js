import Movement from './Movement'
import $ from 'jquery'
import axe from 'Scenes/Map/axe.png'

/**
 * components
 */
import Players from './Players'

class Positioning {
  constructor (positions) {
    this.positions = positions
    console.log(positions)
    Positioning.getPlayerPositions()
  }

  handleClick (e) {
    console.log(e.target)
  }

  initBoard () {
    const cells = this.positions

  }

  /**
   * initializes player positions
   */
  initPlayerPositions () {
    // select random player positions
    const pos1 = this.getRandomPosition()
    const pos2 = this.getRandomPosition()

    // init players
    const players = new Players({
      pos1,
      pos2
    })

    players.initPlayerOne()
    players.initPlayerTwo()

  }

  static getPlayerPositions () {
    console.log('getting these positions!!')
  }

  /**
   * gets a random position from the list of available positions
   * @returns {*}
   */
  getRandomPosition () {
    return this.positions[Math.floor(Math.random() * Math.floor(this.positions.length))]
  }

}

export default Positioning
