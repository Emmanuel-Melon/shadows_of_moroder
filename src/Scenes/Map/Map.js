import $ from "jquery";
import "./Map.css";
import axe from "./axe.png";
import dwarf from "./dorf2.png";

/**
 * components
 */
import EmptyCell from "../../Components/Cells/EmptyCell";

class Map {
    constructor () {
        // markup
        this.body = $("<div></div>").addClass("map-scene__content-body");
        this.content = $("<div></div>").addClass("map-scene_content");

        this.content.on("click", (e) => {
            const { target } = e;
            console.log(target);
            console.log($(target).attr("data-id"));
            const dataId = $(target).attr("data-id");
            // console.log(target.data-id);
            const img = $(`<img src=${axe} alt=${dataId} />`);
            img.addClass("weapon");
           $(target).html(img);
        });

        this.content.on("mouseover", (e) => {

        });

        // logic
        this.columns = 5;
        this.rows = 7;
        this.cells = [];
        this.currentCell = null;
        this.nextCell = null;


    }

    init() {
        const emptyCell = new EmptyCell().init();
        //
        for(let i = 0; i < this.rows; i++) {
            // this.cells.push(emptyCell.clone());
            for(let j = 0; j < this.columns; i++) {
                //
                this.cells.push(emptyCell.clone());
            }
        }

        //
        this.cells.map(cell => {
            cell.attr("data-id", `${(this.cells.indexOf(cell) + 1).toString()}`);
            // I could pick any n random cells and then set them to unavailable?
            cell.attr("data-type", `empty`);
            cell.attr("data-content", `image`);
            cell.attr("data-weapon", `image`);
            return cell;
        });

        const player1 = this.cells[Math.floor(Math.random() * Math.floor(this.cells.length))];
        const player1Img = $(`<img src=${dwarf} alt="player1" />`);
        player1Img.addClass("weapon");
        $(player1).html(player1Img);

        const player2 = this.cells[Math.floor(Math.random() * Math.floor(this.cells.length))];
        const player2Img = $(`<img src=${dwarf} alt="player1" />`);
        player2Img.addClass("weapon");
        $(player2).html(player2Img);


        this.content.append(this.cells);
        return this.body.html(this.content);
    }
}

export default Map;