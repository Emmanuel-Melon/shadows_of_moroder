import $ from 'jquery'
import './index.css'
import Game from './Game'

/**
 * components
 */
import Map from './Scenes/Map/Map'
import UnavailableCell from './Components/Cells/UnavailableCell'
import Character from './Components/Character/Character'
import Weapon from './Components/Cells/Weapon'

/**
 * game data
 */
import data from './game.json'

class Main {
  constructor () {
    this.gameContainer = $('.map')
    this.availableCells = []
    this.unavailableCells = []
    this.gridSize = 10
    this.DISABLED_CELLS = 11
    this.WEAPONS_COUNT = 4
    this.weapons = data.weapons
    this.players = data.players
  }

  init () {
    new Map(this)

    // initialize dimmed cells
    const unavailableCell = new UnavailableCell(this)
    for (let i = 0; i < this.DISABLED_CELLS; i++) {
      unavailableCell.dimCell()
    }

    // initialize players
    new Character(this.players[0], this)
    new Character(this.players[1], this)

    // initialize weapons
    for (let i = 0; i < this.WEAPONS_COUNT; i++) {
      new Weapon(this.weapons[0], this)
      new Weapon(this.weapons[1], this)
      new Weapon(this.weapons[2], this)
      new Weapon(this.weapons[3], this)
    }

    // Begin Game
    const game = new Game(this)
    game.init()
  }
}

// initialize game
$(document).ready(() => {
  new Main().init()
})
