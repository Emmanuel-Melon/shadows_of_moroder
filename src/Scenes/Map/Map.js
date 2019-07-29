import $ from "jquery";
import "./Map.css";
import axe from "./axe.png";

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
            const { target } = e;
            console.log(target);
            console.log($(target).attr("data-id"));
            const dataId = $(target).attr("data-id");
            // console.log(target.data-id);
            const img = $(`<img src=${axe} alt=${dataId} />`);
            img.addClass("weapon");
            $(target).html(img);
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
            for(let i = 0; i < this.columns; i++) {
                this.cells.push(emptyCell.clone());
            }
        }

        this.cells.map(cell => {
            cell.attr("data-id", `${(this.cells.indexOf(cell) + 1).toString()}`);
            cell.attr("data-type", `empty`);
            cell.attr("data-content", `image`);
            cell.attr("data-weapon", `image`);
            return cell;
        });

        this.content.append(this.cells);
        return this.body.html(this.content);
    }
}

export default Map;