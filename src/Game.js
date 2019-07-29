import $ from "jquery";
// import game from "./game.json";

/**
 * scenes
 */
import Map from "./Scenes/Map/Map";
// import Menu from "./Scenes/Menu/Menu";
// import Splash from "./Scenes/Splash/Splash";

/**
 * assets
 */

class Game {
    constructor () {
        this.game = $("#game");
        this.currentScreen = $("#currentScreen");
        this.paused = false;
        this.nextScene = null;
    }

    /**
     * loads game assets
     */
    init () {
        const map = new Map();
        const generatedMap = map.init();
        return this.currentScreen.html(generatedMap);
    }

    /**
     * hello
     */
    changeScene () {

    }
}

export default Game;