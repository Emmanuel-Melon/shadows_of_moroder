import $ from 'jquery'

class Game {
  constructor (players, weapons, game) {
    this.game = game
    this.players = players
    this.weapons = weapons
    this.active = null
  }

  movePlayer (oldPos, newPos) {
    // remove class current player
    // only remove if event target has class player
    if(!$(oldPos).hasClass('player')) {
      $(oldPos).removeClass('current-player player')
    }

    // where is active? can I use active instead of old pos?

    // remove highlights

    // transfer properties too?

    // add class player on newPos
    // only add if newPos has class allowed
    //$(oldPos).removeClass("allowed player-on")
    if($(newPos).hasClass('allowed')) {
      this.active = newPos
      $(newPos).removeClass('allowed')
      $(newPos).addClass('player')
      console.log(newPos)
    }

    // switch turns
    // this.switchTurn(oldPos)
  }

  static getPlayerPos (row, col) {
    $(`[data-pos='(${parseInt(row) - parseInt(1)}, ${col})'], [data-pos='(${parseInt(row) - parseInt(2)}, ${col})']`).addClass('allowed')
    $(`[data-pos='(${row}, ${parseInt(col) + parseInt(1)})'], [data-pos='(${row}, ${parseInt(col) + parseInt(2)})']`).addClass('allowed')
    $(`[data-pos='(${parseInt(row) + parseInt(1)}, ${col})'], [data-pos='(${parseInt(row) + parseInt(2)}, ${col})']`).addClass('allowed')
    $(`[data-pos='(${row}, ${parseInt(col) - parseInt(1)})'], [data-pos='(${row}, ${parseInt(col) - parseInt(2)})']`).addClass('allowed')
  }

  static getCoords (player) {
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
    // $('.cell').removeClass('allowed')
    if(parseInt(turn) === 1) {
      this.active = $(`[data-turn='${parseInt(0)}']`).addClass('current-player')

      const { x, y } = Game.getCoords(this.active)
      // get player positions
      Game.getPlayerPos(x, y)
    } else if(parseInt(turn) === 0) {
      this.active = $(`[data-turn='${parseInt(1)}']`).addClass('current-player')
      const { x, y } = Game.getCoords(this.active)
      // get player positions
      Game.getPlayerPos(x, y)
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
    $(this.active).addClass('current-player')
    $(this.active).attr('data-turn', first.turn)

    // get nearby cells
    const { x, y } = Game.getCoords(this.active)

    // get player positions
    Game.getPlayerPos(x, y)

    // click events
    allowed = $('.allowed')
    allowed.hover(function () {
      // $(this).removeClass('allowed')
      $(this).addClass('player-on')
    }, function () {
      // $(this).removeClass('allowed')
      $(this).removeClass('player-on')
    })

    $('.cell').click(function (e) {
      console.log(e.target)
      const currentPlayer = $('.current-player')
      if($(e.target).hasClass('player')) {
        self.movePlayer(currentPlayer, e.target)
      } else if($(e.target).hasClass('allowed')) {
        self.movePlayer(currentPlayer, e.target)
      } else {
        console.log('clicked regular cell')
      }
    })

    $('.player').click(function (e) {
      console.log(e.target)
      console.log('clicked on player')
    })
  }
}

export default Game
