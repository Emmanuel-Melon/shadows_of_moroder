import $ from 'jquery'

/**
 * @description manages fights between players
 */
class Fight {
  constructor (game) {
    this.game = game
  }

  checkVictory (score) {
    if (score <= 0) {
      this.game.victory(this.game.active)
    }
  }

  /**
   *
   */
  attack () {
    if ($(this.game.active).hasClass('player-1')) {
      // add to previous moves
      this.addToPreviousActions({ type: 'attack' })

      let attack = $('.attack-bar-one')
      let points = attack.text()

      // get attackers current weapon
      const opponent = $('.health-bar-two')
      opponent.addClass('attacked')

      const text = opponent.text()

      const previousAction = this.getPreviousAction(this.game.next)

      // calculate score based on previous opponent move
      let score = 0

      if (!previousAction) {
        score = (text - points)
      } else {
        if (previousAction.type === 'defense') {
          score = text - (points / 2)
        } else {
          score = (text - points)
        }
      }

      // announce victory when score drops to zero or below
      this.checkVictory(score)

      // highlight active player?
      opponent.html(score)

      // update profile info
      const profileOne = $('.profile-1')
      const profileTwo = $('.profile-2')

      profileOne.removeClass('attacker-one')
      profileTwo.addClass('attacker-two')

      // swap turns
      this.swapTurns()
    } else if ($(this.game.active).hasClass('player-2')) {
      // add to previous moves
      this.addToPreviousActions({ type: 'attack' })

      // extract into a function that gives you all of the necessary information
      let attack = $('.attack-bar-two')
      let points = attack.text()

      const opponent = $('.health-bar-one')
      opponent.addClass('attacked')
      const text = opponent.text()

      // determine previous action to deduct scores accordingly
      const previousAction = this.getPreviousAction(this.game.next)

      // calculate score based on previous opponent move
      let score = 0

      // what if previousAction is null?
      if (!previousAction) {
        score = (text - points)
      } else {
        if (previousAction.type === 'defense') {
          score = text - (points / 2)
        } else {
          score = (text - points)
        }
      }

      // announce victory when score drops to zero or below
      this.checkVictory(score)

      // round score
      opponent.html(score)

      // update profile info
      const profileOne = $('.profile-1')
      const profileTwo = $('.profile-2')

      profileOne.addClass('attacker-one')
      profileTwo.removeClass('attacker-two')

      // swap turns
      this.swapTurns()
    }
  }

  highLightActivePlayer () {

  }

  swapTurns () {
    // swaps active and next by using temporary variable
    const temp = this.game.next
    this.game.next = this.game.active
    this.game.active = temp
  }

  disableOtherPlayer (player) {
    if ($(player).hasClass('player-1')) {
      $('.attack-button-one').prop('disabled', true)
      $('.defense-button-one').prop('disabled', true)
    } else if ($(player).hasClass('player-2')) {
      console.log('disabling player 1')
      $('.attack-button-two').prop('disabled', true)
      $('.defense-button-two').prop('disabled', true)
    }
  }

  addToPreviousActions (action) {
    if ($(this.game.active).hasClass('player-1')) {
      this.game.playerOne.moves.push(action)
    } else if ($(this.game.active).hasClass('player-2')) {
      this.game.playerTwo.moves.push(action)
    }
  }

  getPreviousAction (player) {
    // get previous action for this player
    if ($(player).hasClass('player-1')) {
      const moves = this.game.playerOne.moves
      const action = moves[moves.length - 1]
      return action || null
    } else if ($(player).hasClass('player-2')) {
      const moves = this.game.playerTwo.moves
      const action = moves[moves.length - 1]
      return action || null
    }
  }

  defend () {
    if ($(this.game.active).hasClass('player-1')) {
      // add this to player moves array
      this.addToPreviousActions({ type: 'defense' })

      // update profile info
      const profileOne = $('.profile-1')
      const profileTwo = $('.profile-2')

      profileOne.removeClass('attacker-one')
      profileTwo.addClass('attacker-two')

      // swap turns
      this.swapTurns()
    } else if ($(this.game.active).hasClass('player-2')) {
      // add this to player moves array
      this.addToPreviousActions({ type: 'defense' })

      // update profile info
      const profileOne = $('.profile-1')
      const profileTwo = $('.profile-2')

      profileOne.addClass('attacker-one')
      profileTwo.removeClass('attacker-two')

      // swaps turns
      this.swapTurns()
    }
  }

  // attacker, defender?
  beginFight () {
    // change game mode
    this.game.mode = 'fight'

    // hide map
    $('.map').css('display', 'none')

    // show fight screen
    $('.fight-screen').css('display', 'block')

    // $(this.game.active).addClass("attacker")
    if ($(this.game.active).hasClass('player-1')) {
      const profile = $('.profile-1')
      profile.addClass('attacker-one')

      // highlight pane
      // const pane = $('.pane-2').addClass('active-pane')

      // highlight active player?
      return this.game.active
    } else if ($(this.game.active).hasClass('player-2')) {
      // enlarge profile
      const profile = $('.profile-2')
      profile.addClass('attacker-two')

      // highlight pane
      // const pane = $('.pane-2').addClass('active-pane')
      // highlight active player?
      return this.game.active
    }
  }
}

export default Fight
