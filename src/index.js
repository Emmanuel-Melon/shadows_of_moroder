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
 * scenes
 */
// import Map from "./Scenes/Map/Map";
// import Menu from "./Scenes/Menu/Menu";
// import Splash from "./Scenes/Splash/Splash";
import Fight from "./Scenes/Fight/Fight"
import Victory from "./Scenes/Victory/Victory"

/**
 * assets
 */

/**
 * global game config!
 */
let config
config = {
  splash: {
    title: 'Shadows of Mordor'
  },
  version: '1.0.0',
  menu: {
    Play: {
      name: 'Play',
      type: 'button'
    },
    Instructions: {
      name: 'Instructions',
      type: 'button'
    },
    Settings: {
      name: 'Settings',
      type: 'button'
    }
  }
}

const players = [
  {
    turn: 1,
    name: 'El Shako',
    type: 'Human',
    rowMin: 0,
    rowMax: Math.floor(12 / 3),
    colMin: 0,
    colMax: 12 - 1,
    health: 100,
    attack: 10,
    shield: 10,
    active: true,
    player: 'player-1'
  },
  {
    turn: 0,
    name: 'Eman',
    rowMin: Math.floor(12 / 2),
    rowMax: 12 - 1,
    colMin: 0,
    colMax: 12 - 1,
    health: 100,
    attack: 10,
    shield: 10,
    active: false,
    player: 'player-2'
  }

]

const WEAPONS = [
  {
    name: 'axe',
    type: 'defense',
    className: 'weapon-defense',
    effect: 10
  },
  {
    name: 'sword',
    type: 'attack',
    className: 'weapon-attack',
    effect: 10
  },
  {
    name: 'spear',
    type: 'health',
    className: 'weapon-health',
    effect: 10
  },
  {
    name: 'health',
    type: 'attack',
    className: 'weapon-attack-super',
    effect: 20
  }
]

class Main {
  constructor () {
    this.gameContainer = $('.map')
    this.availableCells = []
    this.unavailableCells = []
    this.gridSize = 12
    this.DISABLED_CELLS = 15
    this.WEAPONS_COUNT = 4
    this.panes = $('.pane')
    this.weapons = WEAPONS
    this.fight = Fight
    this.victory = Victory
  }

  init () {
    // initialize a new map
    new Map(this.gameContainer, this.gridSize, this, players)

    // initialize dimmed cells
    const unavailableCell = new UnavailableCell(this.gridSize, this)
    for (let i = 0; i < this.DISABLED_CELLS; i++) {
      unavailableCell.dimCell()
    }

    // initialize players
    new Character(this.gridSize, players[0], this)
    new Character(this.gridSize, players[1], this)

    // initialize weapons
    for (let i = 0; i < this.WEAPONS_COUNT; i++) {
      new Weapon(this.gridSize, WEAPONS[0], this)
      new Weapon(this.gridSize, WEAPONS[1], this)
      new Weapon(this.gridSize, WEAPONS[2], this)
      new Weapon(this.gridSize, WEAPONS[3], this)
    }

    // Begin Game
    const game = new Game(players, WEAPONS, this)
    game.init()
  }
}

// initialize game
$(document).ready(() => {
  const main = new Main()
  main.init()
})
