import $ from 'jquery'

/**
 * scenes
 */
import Fight from './Scenes/Fight/Fight'
import Victory from './Scenes/Victory/Victory'

/**
 *
 */
class Game {
  constructor (game) {
    this.game = game
    this.players = game.players
    this.playerOne = {
      ...game.players[1],
      moves: [],
      steps: [],
      weapons: [],

      // default weapon is sword
      currentWeapon: game.weapons[1]
    }

    this.playerTwo = {
      ...game.players[1],
      moves: [],
      steps: [],
      weapons: [],

      // default weapon is sword
      currentWeapon: game.weapons[1],
      previousWeapon: {
        name: 'gun'
        // weapon information and position
      }
    }
    this.weapons = game.weapons
    this.active = null
    this.next = null
    this.turn = true
    this.allowed = []
    this.fight = new Fight(this)
    this.victory = Victory
  }

  /**
   * TODO: do nothing if picked weapon is the same
   * @param object
   * @param person
   * ! bug player disappears when you revisit the same weapon
   */
  pickNewWeapon (object, person) {
    const classes = $(object).attr('class').split(/\s+/)

    // that's it?
    $(object).removeClass(`${classes[1]} ${classes[2]}`)

    // extract to a function?
    const [weapon] = this.game.weapons.filter(weapon => weapon.name === classes[1])

    if ($(person).hasClass('player-1')) {
      const lastWeapon = this.playerOne.weapons[this.playerOne.weapons.length - 1]
      const dashboard = $('.attack-bar-one')
      this.playerOne.currentWeapon = weapon
      const effect = dashboard.text()
      dashboard.html(`${(parseInt(effect) + (weapon.effect))}`)
      $(person).addClass(lastWeapon.name)
    } else if ($(person).hasClass('player-2')) {
      const lastWeapon = this.playerTwo.weapons[this.playerTwo.weapons.length - 1]
      const dashboard = $('.attack-bar-two')
      this.playerTwo.currentWeapon = weapon
      const effect = dashboard.text()
      dashboard.html(`${(parseInt(effect) + (weapon.effect))}`)
      $(person).addClass(lastWeapon.name)
    }
  }

  /**
   *
   * @param player
   */
  disableMovements (player) {
    const { x, y } = this.getCoords(player)
    const adjacent = this.getAdjacentCells(x, y)

    adjacent.forEach(cell => {
      if ($(cell).hasClass('unavailable')) {

      }
    })
  }

  /**
   *
   * @param player
   */
  getAllowedMoves (player) {
    // detect battle mode
    const { x, y } = this.getCoords(player)
    const pos = this.getPlayerPos(x, y, {
      steps: 1
    })

    const adjacent = this.getAdjacentCells(x, y)
    this.disableMovements(player)
  }

  /**
   * @description moves a player from an old position to a new position
   * @param oldPos
   * @param newPos
   */
  movePlayer (oldPos, newPos) {
    if ($(newPos).hasClass('weapon')) {
      // classes are used to determine the name of the weapon and its type
      const classes = $(newPos).attr('class').split(/\s+/)

      // array element number 2 (sword)
      const name = classes[1]

      // there's too much duplication and most of these snippets can be extracted into separate classes and methods
      if ($(this.active).hasClass('player-1')) {
        // default weapon is a sword
        const defaultWeapon = this.playerOne.weapons[0]

        if (defaultWeapon.name === name) {
          // $(oldPos).addClass(defaultWeapon.name)
        } else {
          // the weapon the player is about to pick
          const [newWeapon] = this.weapons.filter(weapon => weapon.name === classes[1])

          // get the last weapon a player had picked
          const lastWeapon = this.playerOne.weapons[this.playerOne.weapons.length - 1]

          // Only using this technique for demo purposes, the use of a JavaScript set would be more appropriate in here
          if (!this.playerOne.weapons.includes(newWeapon)) {
            this.playerOne.weapons.push(newWeapon)
            $(oldPos).addClass(lastWeapon.name)
          }
        }
      } else if ($(this.active).hasClass('player-2')) {
        // the weapon the player is about to pick
        const [newWeapon] = this.weapons.filter(weapon => weapon.name === classes[1])

        // get the last weapon a player had picked
        const lastWeapon = this.playerTwo.weapons[this.playerTwo.weapons.length - 1]

        // Only using this technique for demo purposes, the use of a JavaScript set would be more appropriate in here
        if (!this.playerTwo.weapons.includes(newWeapon)) {
          this.playerTwo.weapons.push(newWeapon)
          $(oldPos).addClass(lastWeapon.name)
        }
      }

      // after
      this.pickNewWeapon(newPos, oldPos)
    }

    if ($(newPos).hasClass('player-on')) {
      const classes = $(oldPos).attr('class').split(/\s+/)
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

  /**
   * @description begins combat mode
   */
  beginCombat () {
    const container = this.game.gameContainer
    const fight = new Fight(this).beginFight()
    $(container).html(fight)
  }

  /**
   * ! hardcoded selectors (not very maintainable)
   * @param row
   * @param col
   * @returns {(jQuery|HTMLElement)[]}
   */
  getPlayerPos (row, col) {
    const topCells = $(`[data-pos='(${parseInt(row) - parseInt(1)}, ${col})'], [data-pos='(${parseInt(row) - parseInt(2)}, ${col})']`)
    const rightCells = $(`[data-pos='(${row}, ${parseInt(col) + parseInt(1)})'], [data-pos='(${row}, ${parseInt(col) + parseInt(2)})']`)
    const bottomCells = $(`[data-pos='(${parseInt(row) + parseInt(1)}, ${col})'], [data-pos='(${parseInt(row) + parseInt(2)}, ${col})']`)
    const leftCells = $(`[data-pos='(${row}, ${parseInt(col) - parseInt(1)})'], [data-pos='(${row}, ${parseInt(col) - parseInt(2)})']`)

    // filter these cells and remove the cells that have obstacles and other players
    // these are the adjacent cells
    const adjacent = this.getAdjacentCells(row, col)

    // you can use this for movements too
    adjacent.forEach(cell => {
      if ($(cell).hasClass('player')) {
        this.beginCombat(cell)
      }
    })

    return [topCells, rightCells, bottomCells, leftCells]
  }

  /**
   * @description gets all of the adjacent cells to a player to determine when to start combat mode
   * @param row
   * @param col
   * @returns {(jQuery|HTMLElement)[]}
   */
  getAdjacentCells (row, col) {
    const topCells = $(`[data-pos='(${parseInt(row) - parseInt(1)}, ${col})']`)
    const rightCells = $(`[data-pos='(${row}, ${parseInt(col) + parseInt(1)})']`)
    const bottomCells = $(`[data-pos='(${parseInt(row) + parseInt(1)}, ${col})']`)
    const leftCells = $(`[data-pos='(${row}, ${parseInt(col) - parseInt(1)})']`)

    // filter these cells and remove the cells that have obstacles and other players
    return [topCells, rightCells, bottomCells, leftCells]
  }

  /**
   * @description highlights available cells
   * @param cells
   */
  highLightAvailable (cells) {
    cells.forEach(cell => {
      if ($(cell).hasClass('unavailable') || $(cell).hasClass('player')) {
        // don't use an index, use a better selector
        // used to determine allowed movements in adjacent cells
        const target = $(cell).hasClass('unavailable')
        $(cell[1]).addClass('allowed')
      } else if ($(cell).hasClass('weapon')) {
        $(cell).addClass('allowed')
      } else {
        $(cell).addClass('allowed')
      }
    })
  }

  /**
   * @description removes highlighted cells when a player's turn is over
   * @param cells
   */
  removeHighlight (cells) {
    cells.forEach(cell => {
      $(cell).removeClass('allowed')
    })
  }

  /**
   * @description gets the row and column of a player cell
   * @param player
   * @returns {{x: (*|jQuery|undefined), y: (*|jQuery|undefined)}}
   */
  getCoords (player) {
    const row = $(player).attr('data-row')
    const col = $(player).attr('data-col')
    return {
      x: row,
      y: col
    }
  }

  /**
   * @description switches turns by checking the current player
   * @param player
   */
  switchTurn (player) {
    if ($(player).hasClass('player-1')) {
      let other = $('.player-2')
      this.active = $(other).addClass('active').addClass('current-player').removeClass('next')
      this.next = $('.player-1')
      // get nearby positions
      const { x, y } = this.getCoords(this.active)

      // get nearby positions for next player
      const { x1, y2 } = this.getCoords(this.next)

      // get allowed player positions
      this.allowed = this.getPlayerPos(x, y)

      // highlight available positions
      this.highLightAvailable(this.allowed)
    } else if ($(player).hasClass('player-2')) {
      let other = $('.player-1').addClass('current-player')
      this.active = $(other).addClass('active').removeClass('next')
      this.next = $('.player-2')

      // get nearby positions for active player
      const { x, y } = this.getCoords(this.active)

      // get nearby positions for next player
      const { x1, y2 } = this.getCoords(this.next)

      // get allowed player positions
      this.allowed = this.getPlayerPos(x, y)

      // highlight available positions
      this.highLightAvailable(this.allowed)
    }
  }

  /**
   * @description initializer method
   */
  init () {
    let self = this
    let cell = $('.cell')
    const attack = $('.attack-button')
    const defend = $('.defense-button')
    const exit = $('.exit-button')
    const restart = $('.restart-button')

    // get first player
    const [first] = this.players

    // highlight active player
    this.active = $('.active')
    $(this.active).addClass('current-player')
    $(this.active).attr('data-turn', first.turn)

    const { x, y } = this.getCoords(this.active)

    this.allowed = this.getPlayerPos(x, y)

    this.highLightAvailable(this.allowed)

    /************************************************************************
     * * **************************** HOVER EVENTS  ****************************
     ************************************************************************
     */
    cell.hover(function () {
      if ($(this).hasClass('allowed')) {
        $(this).addClass('player-on')
      }
    }, function () {
      $(this).removeClass('player-on')
    })

    /************************************************************************
     * * **************************** CLICK EVENTS  ****************************
     ************************************************************************
     */
    attack.click(() => {
      self.fight.attack()
    })

    defend.click(() => {
      self.fight.defend()
    })

    exit.click(() => {
      window.close()
    })

    cell.click(function (e) {
      if ($(e.target).hasClass('player-on')) {
        self.getAllowedMoves(self.active)
        self.movePlayer(self.active, e.target)
      }
    })

    restart.click(() => {
      location.reload()
    })
  }
}

export default Game
