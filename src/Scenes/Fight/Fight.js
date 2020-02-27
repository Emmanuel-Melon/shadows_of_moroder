import $ from 'jquery'

/**
 * assets
 */
import fight from "Music/fight.wav"


/**
 * @description manages fights between players
 * display weapon on the panes
 * and remove everything else
 * add health bars on top of player profiles in the main section
 */
class Fight {
  constructor (game) {
    this.game = game

    // learn how to switch and loop and do all of that stuff
    var obj = document.createElement("audio");
    obj.src = fight;
    // obj.play();
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

      profileOne.removeClass('attacker-one').addClass("hidden")
      profileTwo.removeClass("hidden").addClass('attacker-two')

      // disable buttons for this player
      $(".attack-button-one").attr("disabled", true).addClass("hidden")
      $(".defense-button-one").attr("disabled", true).addClass("hidden")

      // enable for other player
      $(".attack-button-two").attr("disabled", false).removeClass("hidden")
      $(".defense-button-two").attr("disabled", false).removeClass("hidden")

      // here's where you should call disableOtherPlayer
      $(".left").addClass("hidden")
      $(".right").removeClass("hidden")

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

      // this here
      profileOne.removeClass("hidden").addClass('attacker-one')
      profileTwo.removeClass('attacker-two').addClass("hidden")

      // disable buttons for this player
      $(".attack-button-two").attr("disabled", true).addClass("hidden")
      $(".defense-button-two").attr("disabled", true).addClass("hidden")

      // enable for other player
      $(".attack-button-one").attr("disabled", false).removeClass("hidden")
      $(".defense-button-one").attr("disabled", false).removeClass("hidden")


      $(".right").addClass("hidden")
      $(".left").removeClass("hidden")

      // swap turns
      this.swapTurns()
    }
  }

  highLightActivePlayer () {

  }

  swapTurns () {
    // swaps active and next by using temporary variable

    // this.disableOtherPlayer(this.game.active)

    const temp = this.game.next
    this.game.next = this.game.active
    this.game.active = temp
  }

  disableOtherPlayer (player) {
    if ($(player).hasClass('player-1')) {
      $('.left').addClass("fire")
    } else if ($(player).hasClass('player-2')) {
      $('.right').addClass("water")
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
      $('.pane-1').addClass('active-pane').removeClass("hidden")
      $('.pane-2').addClass("hidden")

      // highlight active player?

      $(".profile-2").addClass("hidden")
      return this.game.active
    } else if ($(this.game.active).hasClass('player-2')) {
      // enlarge profile
      const profile = $('.profile-2')
      profile.addClass('attacker-two')

      // highlight pane
      $('.pane-2').addClass('active-pane').removeClass("hidden")
      $('.pane-1').addClass("hidden").removeClass('active-pane')
      // highlight active player?


      $(".profile-1").addClass("hidden")
      return this.game.active
    }
  }
}

export default Fight
