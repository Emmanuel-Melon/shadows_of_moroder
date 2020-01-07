import $ from 'jquery'
// import game from "./game.json";

class Game {
  constructor (players, weapons, game) {
    this.game = game
    this.players = players
    this.weapons = weapons
    this.currentTurn = 0
    this.currentPlayer = null
    this.currentLocation = null
    this.nextLocation = null
    this.allowedTop = []
    this.allowedRight = []
    this.allowedLeft = []
    this.allowedBottom = []
  }

  init () {
    // get all cells
    const gridItems = $(".cell")

    // assign turn into player
    const [currentPlayer] = $(".player")

    // highlight current player
    $(currentPlayer).addClass('current-player')

    // get nearby cells
    const row = $(currentPlayer).attr('data-row')
    const col = $(currentPlayer).attr('data-col')

    // using a range in query selectors?
    let topCell = $(`[data-pos='(${parseInt(row) - parseInt(1)}, ${col})']`).addClass('allowed')
    this.allowedTop.push(topCell)
    let rightCell = $(`[data-pos='(${row}, ${parseInt(col) + parseInt(1)})']`).addClass('allowed')
    let bottomCell = $(`[data-pos='(${parseInt(row) + parseInt(1)}, ${col})']`).addClass('allowed')
    let leftCell = $(`[data-pos='(${row}, ${parseInt(col) - parseInt(1)})']`).addClass('allowed')

    // click events
    $(gridItems).click(e => {
      // $(e.target).addClass('unavailable')
      console.log(e.target)

      // one location or all possible locations?
      // I can legit use a stack, add a last location at the top
      this.currentLocation = $(e.target).attr('data-pos')
      console.log(this.currentLocation)
      console.log(this.allowedTop)
    })


  }
}

export default Game

