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

const players = {
  one: {
    name: 'El Shako',
    type: 'Human',
    rowMin: 0,
    rowMax: Math.floor(12 / 3),
    colMin: 0,
    colMax: 12 - 1,
    health: 100,
    attack: 10,
    shield: 10
  },
  two: {
    name: 'Eman',
    rowMin: Math.floor(12 / 2),
    rowMax: 12 - 1,
    colMin: 0,
    colMax: 12 - 1,
    health: 100,
    attack: 10,
    shield: 10
  }
}

const WEAPONS = [
  {
    type: 'defense',
    className: 'weapon-defense',
    effect: 10
  },
  {
    type: 'attack',
    className: 'weapon-attack',
    effect: 10
  },
  {
    type: 'health',
    className: 'weapon-health',
    effect: 10
  },
  {
    type: 'attack',
    className: 'weapon-attack-super',
    effect: 20
  }
]

class Main {
  constructor () {
    this.gameContainer = $('#game')
    this.availableCells = []
    this.unavailableCells = []
    this.gridSize = 12
    this.DISABLED_CELLS = 15
    this.WEAPONS_COUNT = 5
  }

  init () {
    // initialize a new map
    new Map(this.gameContainer, this.gridSize, this)
    console.log(this.unavailableCells)

    // initialize dimmed cells
    const unavailableCell = new UnavailableCell(this.gridSize, this)
    for (let i = 0; i < this.DISABLED_CELLS; i++) {
      unavailableCell.dimCell()
    }

    // initialize players
    new Character(this.gridSize, players.one, this)
    new Character(this.gridSize, players.two, this)

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
const main = new Main()
main.init()
