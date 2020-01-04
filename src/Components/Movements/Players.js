import $ from "jquery";
import axe from "Scenes/Map/axe.png";

/**
 * components
 */
import Movements from './Movement'

class Players {
  constructor (positions) {
    this.positions = positions
    this.obstacles = [
      "player",
      "trap"
    ]
    this.health = 100
    this.winner = false
    this.turn = false
  }

  initPlayerOne () {
    console.log('initializing player 1')
    const playerOne = this.positions.pos1
    const player1Img = $(`<img src=${axe} alt="player1" />`)

    // add attributes
    Players.addAttributes({
      name: 'Player 2',
      id: 2,
      ...playerOne,
    })
    player1Img.addClass('weapon')
    // does this replace or append?
    // append or replace?
    $(playerOne).text('1')



  }

  initPlayerTwo () {
    console.log('initializing player 2')
    const playerTwo = this.positions.pos2
    const player2Img = $(`<img src=${axe} alt="player2" />`)

    // add attributes
    Players.addAttributes({
      name: 'Player 2',
      id: 2,
      ...playerTwo
    })
    player2Img.addClass('weapon')
    $(playerTwo).text('2')
  }

  static addAttributes (player) {
    const { id, name } = player
    $(player).attr('data-player-id', id)
    $(player).attr('data-type', 'player')
    $(player).attr('data-name', name)
  }

  static getAllowedMovements (pos) {
    console.log(`getting allowed movements for ${pos}`)
  }
}

export default Players
