import $ from 'jquery'

/**
 *
 */
class Game {
  constructor (players, weapons, game) {
    this.game = game
    this.players = players
    this.weapons = weapons
    this.active = null
    this.turn = true
    this.allowed = []
  }

  detectObstacle (player) {

  }

  detectWeapon (player) {

  }

  detectPlayer (player) {

  }

  movePlayer (oldPos, newPos) {

    if($(newPos).hasClass('weapon')) {
      console.log('landing on weapon')
      console.log(newPos)
      $(newPos.removeClass('weapon'))

      // get weapon information (strength, attack)
      // update player stats (attack, current weapon)
      // add player dashboards?
    }


    if($(newPos).hasClass('player-on')) {
      const classes = $(oldPos).attr("class").split(/\s+/);

      // remove classes from old player positiino
      $(oldPos).removeClass(`${classes[1]} ${classes[2]} ${classes[3]} ${classes[4]}`)

      $(newPos).removeClass('allowed player-on')


      // add class player-number to new position
      $(newPos).addClass('player').addClass(classes[2])

      // remove highlighted cells
      this.removeHighlight(this.allowed)


      // remove allowed Positions after a movement
      this.switchTurn(newPos)

    }
  }

  getPlayerPos (row, col) {
    const topCell = $(`[data-pos='(${parseInt(row) - parseInt(1)}, ${col})'], [data-pos='(${parseInt(row) - parseInt(2)}, ${col})']`)
    const rightCell = $(`[data-pos='(${row}, ${parseInt(col) + parseInt(1)})'], [data-pos='(${row}, ${parseInt(col) + parseInt(2)})']`)
    const bottomCell =  $(`[data-pos='(${parseInt(row) + parseInt(1)}, ${col})'], [data-pos='(${parseInt(row) + parseInt(2)}, ${col})']`)
    const leftCell = $(`[data-pos='(${row}, ${parseInt(col) - parseInt(1)})'], [data-pos='(${row}, ${parseInt(col) - parseInt(2)})']`)
    return [topCell, rightCell, bottomCell, leftCell]
  }

  highLightAvailable (cells) {
    cells.forEach(cell => {
      $(cell).addClass('allowed')
    })
  }

  removeHighlight (cells) {
    cells.forEach(cell => {
      $(cell).removeClass('allowed')
    })
  }

  getCoords (player) {
    const row = $(player).attr('data-row')
    const col = $(player).attr('data-col')
    return {
      x: row,
      y: col
    }
  }

  switchTurn (player) {
    if($(player).hasClass('player-1')) {
      let other = $('.player-2')
      this.active = $(other).addClass('active').addClass('current-player').removeClass('next')

      // get nearby positions
      const { x, y } = this.getCoords(this.active)

      // get allowed player positions
      this.allowed = this.getPlayerPos(x, y)

      // highlight available positions
      this.highLightAvailable(this.allowed)

    } else if($(player).hasClass('player-2')) {
      let other = $('.player-1').addClass('current-player')
      this.active = $(other).addClass('active').removeClass('next')

      // get nearby positions
      const { x, y } = this.getCoords(this.active)

      // get allowed player positions
      this.allowed = this.getPlayerPos(x, y)

      // highlight available positions
      this.highLightAvailable(this.allowed)
    }
  }

  init () {
    let self = this
    let cell = $('.cell')

    // get first player
    const [first] = this.players


    // highlight active player
    this.active = $('.active')
    $(this.active).addClass('current-player')
    $(this.active).attr('data-turn', first.turn)

    // get nearby cells
    const { x, y } = this.getCoords(this.active)

    // get player positions
    this.allowed = this.getPlayerPos(x, y)

    // highlight available cells
    this.highLightAvailable(this.allowed)

    /************************************************************************
     * * **************************** HOVER EVENTS  ****************************
     ************************************************************************
     */
    cell.hover(function () {
      if($(this).hasClass('allowed')) {
        // $(this).removeClass('allowed')
        $(this).addClass('player-on')
      }
    }, function () {
      if($(this).hasClass('allowed')) {
        // $(this).removeClass('allowed')
        // $(this).addClass('player-on')
      }
      // account for when there's a player
       $(this).removeClass('player-on')
       if($(this).hasClass('player')) {
        // $(this).removeClass('allowed')
      } else {
        // $(this).addClass('allowed')
      }
    })

    /************************************************************************
     * * **************************** CLICK EVENTS  ****************************
     ************************************************************************
     */
    cell.click(function (e) {
      if($(e.target).hasClass('player-on')) {
        // call the same function again?
        self.movePlayer(self.active, e.target)
      } else if ($(e.target).hasClass('player')) {
        // do nothing
        console.log(e.target)
      }
    })
  }
}

export default Game
