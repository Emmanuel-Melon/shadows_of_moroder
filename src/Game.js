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
        // causes severe memory issues
        // const map = new Map();
        //
        // const generatedMap = map.init();
        // this.currentScreen.replaceWith(generatedMap);
        return this.currentScreen.html("<h3>Man Listen</h3>");
    }

    /**
     * hello
     * list of screens? back and forth?
     */
    changeScene () {

    }
}

export default Game;