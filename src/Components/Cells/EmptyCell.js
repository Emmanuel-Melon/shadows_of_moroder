import $ from 'jquery'
import './Cell.css'

class EmptyCell {
  constructor () {
    this.body = $('<div></div>').addClass('cell')
    this.x = 0
    this.y = 0
    this.body.on('click', EmptyCell.handleClick)
    this.body.on('mouseover', EmptyCell.handleHover)
  }
  init () {
    // old return value: this.body.html("<h3>Cell!</h3>");
    return $('<div><h3></h3></div>').addClass('cell')
  }

  static handleClick () {
    console.log('ayoo, clicked cell!')
  }

  static handleHover () {
    console.log('ayoo, hovered on cell!')
  }
}

export default EmptyCell
