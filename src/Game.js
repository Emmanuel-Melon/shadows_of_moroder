import $ from 'jquery'

class Game {
  constructor (players, weapons, game) {
    this.game = game
    this.players = players
    this.weapons = weapons
    this.active = null
  }

  movePlayer (oldPos, newPos) {
    const oldCoords = this.getCoords(oldPos)
    const newCoords = this.getCoords(newPos)

    // remove class current player
    $(oldPos).removeClass('current-player player')
    console.log(oldPos)

    // remove highlights

    // add class player on newPos
    $('.cell').removeClass("allowed player-on")
    $(newPos).addClass('player')
    console.log(newPos)

    // switch turns
    this.switchTurn(oldPos)
  }

  getPlayerPos (row, col) {
    $(`[data-pos='(${parseInt(row) - parseInt(1)}, ${col})'], [data-pos='(${parseInt(row) - parseInt(2)}, ${col})']`).addClass('allowed')
    $(`[data-pos='(${row}, ${parseInt(col) + parseInt(1)})'], [data-pos='(${row}, ${parseInt(col) + parseInt(2)})']`).addClass('allowed')
    $(`[data-pos='(${parseInt(row) + parseInt(1)}, ${col})'], [data-pos='(${parseInt(row) + parseInt(2)}, ${col})']`).addClass('allowed')
    $(`[data-pos='(${row}, ${parseInt(col) - parseInt(1)})'], [data-pos='(${row}, ${parseInt(col) - parseInt(2)})']`).addClass('allowed')
  }

  getCoords (player) {
    const row = $(player).attr('data-row')
    const col = $(player).attr('data-col')
    return {
      x: row,
      y: col
    }
  }

  // get allowed cells
  switchTurn (player) {
    const turn = $(player).attr('data-turn');
    console.log(turn)
    // $('.cell').removeClass('allowed')
    console.log(parseInt(turn))
    if(turn == 1) {
      console.log('one')
      this.active = $(`[data-turn='${parseInt(0)}']`).addClass('current-player')

      const { x, y } = this.getCoords(this.active)
      console.log(this.active)
      // get player positions
      this.getPlayerPos(x, y)
    } else if(turn == 0) {
      console.log('two')
      this.active = $(`[data-turn='${parseInt(1)}']`).addClass('current-player')
      const { x, y } = this.getCoords(this.active)
      console.log(this.active)
      // get player positions
      this.getPlayerPos(x, y)
    }
  }

  init () {
    let active
    let past
    let allowed
    let self = this

    // get players
    const [first] = this.players

    // highlight active player
    this.active = $(`[data-turn='${parseInt(1)}']`)
    var attr = $(this.active).attr('data-name');
    $(this.active).addClass('current-player')
    $(this.active).attr('data-turn', first.turn)

    // get nearby cells
    const { x, y } = this.getCoords(this.active)

    // get player positions
    this.getPlayerPos(x, y)

    // click events
    allowed = $('.allowed')
    allowed.hover(function () {
      // $(this).removeClass('allowed')
      $(this).addClass('player-on')
    }, function () {
      // $(this).removeClass('allowed')
      $(this).removeClass('player-on')
    })

    allowed.click(function (e) {
      const currentPlayer = $('.current-player')
      self.movePlayer(currentPlayer, e.target)
    })
  }
}

export default Game
