import $ from "jquery";
import "./splash.css";
import Axe from "../../Components/Loaders/Axe";
import IntroSong from "../../../assets/audio/Viktor Kraus - The Traveller.mp3";

/**
 * TODO: Animate Axe
 * TODO: Play intro song when this component gets loaded into the screen
 * @param splash
 * @constructor
 */
function Splash (splash) {
    this.body = $("<div></div>").addClass("splash-scene__content-body").addClass("centered");
    this.content = $("<div></div>").addClass("splash-scene__content");
    // cached DOM elements
    this.DOM = {};
    this.footer = $("<div></div>").addClass("splash-scene__content-footer").addClass("centered");
    this.scene = $("<div></div>").addClass("splash-scene").addClass("centered");
    this.title = splash.title;
    this.init();
}

/**
 * handle events
 * @return {*|jQuery}
 */
Splash.prototype.init = function () {
    this.body.html(`<h1>${this.title}</h1>`);
    this.footer.html(Axe);

    this.content.append(this.body);
    this.content.append(this.footer);
    /**
     * appends content to scene at once
     */
    return this.scene.append(this.content);
};

export default Splash;