import $ from 'jquery'
import Fight from "./Scenes/Fight/Fight"

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

  newWeapon (object, person) {
    console.log(person)
    console.log(object)

    if($(person).hasClass('player-1')) {
      // get weapon information (strength, attack)
      // update player stats (attack, current weapon)
      // add player dashboards?

      const classes = $(object).attr("class").split(/\s+/);
      console.log(classes)
      console.log(classes[1])
      $(object).removeClass(`${classes[1]} ${classes[2]}`)

      const [weapon] = this.game.weapons.filter(weapon => weapon.name === classes[1])


      const dashboard = $('#player-1-attack')
      const text = dashboard.html().split(" ")
      dashboard.html(`${text[0]} ${(parseInt(text[1]) + weapon.effect)}`)

    } else if($(person).hasClass('player-2')) {
      // get weapon information (strength, attack)
      // update player stats (attack, current weapon)
      // add player dashboards?
      const classes = $(object).attr("class").split(/\s+/);
      $(object).removeClass(`${classes[1]} ${classes[2]}`)

      // loop through the weapons and update the properties
      console.log(this.game.weapons)
      const [weapon] = this.game.weapons.filter(weapon => weapon.name === classes[1])

      // weapon acquired
      // acquire current player dashboard and update stats
      const dashboard = $('#player-2-attack')
      const text = dashboard.html().split(" ")
      dashboard.html(`${text[0]} ${(parseInt(text[1]) + weapon.effect)}`)
    }
  }

  detectPlayer (player) {

  }

  // disables player movements towards a given direction
  // how do we determine this direction?
  // comparing against the other cells to see if this violating adjacent cell exists in any of them?
  disableMovements (player) {
    // it receives a player, right?
    // then it uses the adjacent player positions to determine how to block these movements?
    const { x, y} = this.getCoords(player)
    const adjacent = this.getAdjacentCells(x, y)
    console.log(adjacent)

    // loop throw this adjacent array and then figure out how to do things
    adjacent.forEach(cell => {
      if($(cell).hasClass('unavailable')) {
        console.log(cell)
      }
    })
  }

  getAllowedMoves (player) {
    // detect battle mode
    const { x, y} = this.getCoords(player)
    const pos = this.getPlayerPos(x, y, {
      steps: 1
    })

    // get nearby cells
    // this gets them before a player has moves!
    // this is the old position of the player
    // now that we got this, we check if any if is empty, allowed or has an object
    // this should be used in he next move?
    const adjacent = this.getAdjacentCells(x, y)
    console.log(adjacent)
    console.log(pos)

    this.disableMovements(player)

    const isCombat = ''

    // check if any of them contains a player
    console.log(isCombat)
  }

  // don't invoke this directly, check a few things before allowing a movement?
  // like a check to see if a player is near any obstacles, weapons and other players?
  movePlayer (oldPos, newPos) {

    // before or after?

    // handle picking weapons
    if($(newPos).hasClass('weapon')) {
      this.newWeapon(newPos, oldPos)
    }


    if($(newPos).hasClass('player-on')) {
      const classes = $(oldPos).attr("class").split(/\s+/);

      // remove classes from old player position
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

  beginCombat (player) {
    console.log(player)
    console.log('combat begins!')
    // combat starts with the second player
    // you need to add this to the main game screen, right?
    const container = this.game.gameContainer
    console.log(container)
    const fight = new Fight(this).beginFight()
    console.log(fight)
    const combat = $("<div></div>").addClass('combat-screen')
    // const header = $("<h3>Combat Mode!</h3>")
    // combat.html(header)
    $(container).html(fight)
  }

  getPlayerPos (row, col) {
    // use loops maybe?
    // this is not okay at all
    const topCell = $(`[data-pos='(${parseInt(row) - parseInt(1)}, ${col})'], [data-pos='(${parseInt(row) - parseInt(2)}, ${col})']`)
    const rightCell = $(`[data-pos='(${row}, ${parseInt(col) + parseInt(1)})'], [data-pos='(${row}, ${parseInt(col) + parseInt(2)})']`)
    const bottomCell =  $(`[data-pos='(${parseInt(row) + parseInt(1)}, ${col})'], [data-pos='(${parseInt(row) + parseInt(2)}, ${col})']`)
    const leftCell = $(`[data-pos='(${row}, ${parseInt(col) - parseInt(1)})'], [data-pos='(${row}, ${parseInt(col) - parseInt(2)})']`)

    // filter these cells and remove the cells that have obstacles and other players
    // these are the adjacent cells
    const adjacent = this.getAdjacentCells(row, col)

    // maybe add the logic in here!!!!
    adjacent.forEach(cell => {
      if($(cell).hasClass('player')) {
        // start combat mode!
        // $(cell).addClass('combat')
        this.beginCombat(cell)
      }
    })

    return [topCell, rightCell, bottomCell, leftCell]
  }

  getAdjacentCells (row, col) {
    const topCell = $(`[data-pos='(${parseInt(row) - parseInt(1)}, ${col})']`)
    const rightCell = $(`[data-pos='(${row}, ${parseInt(col) + parseInt(1)})']`)
    const bottomCell =  $(`[data-pos='(${parseInt(row) + parseInt(1)}, ${col})']`)
    const leftCell = $(`[data-pos='(${row}, ${parseInt(col) - parseInt(1)})']`)

    // filter these cells and remove the cells that have obstacles and other players
    return [topCell, rightCell, bottomCell, leftCell]
  }

  // you don't just highlight them like that bro!
  highLightAvailable (cells) {
    console.log(cells)
    cells.forEach(cell => {
      // this wouldn't work because it doesn't factor the real distance
      if($(cell).hasClass('unavailable')) {
        // do nothing
      } else if ($(cell).hasClass('player')) {
        // do combat mode
        $(cell).addClass('allowed')
        console.log('gotcha!')
      } else {
        $(cell).addClass('allowed')
      }
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
    // do something to prevent making places with obstacles allowed
    // remove all cells in a direction if there exists an immediate obstacle next to a player
    // player is in position x, y and there are 2 allowed moves to the left but the first is an obstacle so the whole array should be disabled
    // disabling array?
    // using objects?
    // use an object that contains information on each cell and what it could possibly contain?
    const { x, y } = this.getCoords(this.active)

    // get player positions
    // but you're getting everything
    // this i the guy that should decide which cells are allowed
    // it should return multiple arrays?
    // allowed, combat, weapons, etc
    // combat positions should be known before each move
    this.allowed = this.getPlayerPos(x, y)

    // highlight available cells
    // this is where things should run
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
        // check surroundings before invoking this method
        // get combat zones array?
        // if player steps on any then it's a wrap?
        self.getAllowedMoves(self.active)

        self.movePlayer(self.active, e.target)
      } else if ($(e.target).hasClass('player')) {
        // do nothing
        console.log(e.target)
      } else if ($(e.target).hasClass('weapon')) {
        // do nothing
        console.log('stepped on weapon')
        console.log(e.target)
      }
    })
  }
}

export default Game


/**
 *  i want to go to america
 */
