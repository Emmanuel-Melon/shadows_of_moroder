import $ from "jquery";
import "./Header.css";

const Header = name => {
    const header = $("<header></header>").addClass("header");
    return header.html(name);
};

export default Header;