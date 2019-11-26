import $ from 'jquery'
import './index.css'
import Game from './Game'
// look at aliases from webpack to prevent long relative paths

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

// $(document).ready(() => {

// load game data before everything
// persist user choices
// default values
// event handling, propagation
// clickable means a player could click on it, useful for turns?
// invalid movements?
// centralized event handling?
// deferred for loading async content
// like when user clicks on play
const game = new Game()
game.init()

// });
