import $ from 'jquery'

class Game {
  constructor (players, weapons, game) {
    this.game = game
    this.players = players
    this.weapons = weapons
    this.active = null
    this.turn = true
  }

  movePlayer (oldPos, newPos) {
    // where is active? can I use active instead of old pos?

    // remove highlights

    // transfer properties too?

    // add class player on newPos
    // only add if newPos has class allowed
    //$(oldPos).removeClass("allowed player-on")
    if($(newPos).hasClass('player-on')) {

      // check turn before making a move
      // remove class current player
      // double clicking on a player removes a player irregardless of their turn
      // try to check turns before moving forward
      $(oldPos).removeClass('current-player player')
      // console.log($(oldPos).data())

      $(newPos).removeClass('allowed player-on').addClass('player').data($(oldPos).data())

      // copy and remove attributes from one cell to another


      // only remove if event target has class player
      // don't remove class current player from old Pos
      console.log(oldPos)
      if($(oldPos).hasClass('player')) {
        $(oldPos).removeClass('current-player player')

        // remove allowed Positions after a movement
        console.log(oldPos)
        // only highlight if movement is confirmed
      }

      this.active = newPos
      $(newPos).removeClass('allowed player-on')
      $(newPos).addClass('player')
      // console.log(newPos)

      this.switchTurn(oldPos)
    }

    // switch turns

  }

  getPlayerPos (row, col) {
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
    console.log(player)
    const turn = $(player).attr('data-turn');
    // $('.cell').removeClass('allowed')
    if(parseInt(turn) === 1) {
      let other = $(`[data-turn='${parseInt(0)}']`).addClass('current-player')

      console.log("************************")
      console.log(other)
      this.active = other

      console.log("************************")
      console.log(this.active)
      const { x, y } = Game.getCoords(this.active)
      console.log(`x: ${x}, y: ${y}`)
      // get player positions
      this.getPlayerPos(x, y)
    } else if(parseInt(turn) === 0) {
      this.active = $(`[data-turn='${parseInt(1)}']`).addClass('current-player')
      const { x, y } = Game.getCoords(this.active)
      // get player positions
      console.log(`x: ${x}, y: ${y}`)
      this.getPlayerPos(x, y)
    }
  }

  init () {
    let self = this
    let cell = $('.cell')

    // get players
    const [first] = this.players

    // highlight active player
    this.active = $(`[data-turn='${parseInt(1)}']`)
    $(this.active).addClass('current-player')
    $(this.active).attr('data-turn', first.turn)

    // get nearby cells
    const { x, y } = Game.getCoords(this.active)

    // get player positions
    this.getPlayerPos(x, y)

    /************************************************************************
     * * **************************** HOVER EVENTS  ****************************
     ************************************************************************
     */
    const allowed = $('.allowed')
    allowed.hover(function () {

        $(this).removeClass('allowed')
        $(this).addClass('player-on')

    }, function () {
      $(this).removeClass('player-on')
      $(this).addClass('allowed')
    }).click( function(e) {
      // this might be the issue!
      // static, one value!
      // remove current player man!
      // $('.current-player').removeClass('current-player')
      // it should be the position of the currently active player, not a static value, son!
      self.movePlayer(self.active, e.target)
    })

    /************************************************************************
     * * **************************** CLICK EVENTS  ****************************
     ************************************************************************
     */
    cell.click(function (e) {
      const currentPlayer = $('.current-player')
      if($(e.target).hasClass('player')) {
        // self.movePlayer(currentPlayer, e.target)
      } else if($(e.target).hasClass('allowed')) {
        // self.movePlayer(currentPlayer, e.target)
      } else {
        // do nothing
        // $(e.target).addClass('empty-clicked')
      }
    })
  }
}

export default Game
