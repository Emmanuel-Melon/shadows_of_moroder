import $ from 'jquery'
import Button from '../../Components/Buttons/Button'
import './Menu.css'

// how to pass data to components in jQuery?
// this is not a DOM element // make return a DOM  element?
// populate menu, display menu, control menu
const Menu = ({ Play, Instructions, Settings }) => {
  // loop through items, create a button for each?
  // so, these are views? why would you wanna pass it views?
  let controls = [
    Play,
    Instructions,
    Settings
  ]
  let menu = $('<div></div>').addClass('menu')
  let items = $('<ul></ul>').addClass('menu__items')
  let content = ''
  $.each(controls, (index, val) => {
    content += `<li class='menu__item'><button class=${val.type}>${val.name}</button></li>`
  })
  items.append(content)
  menu.append(items)
  return menu // DOM element <div></div>
}

// decouple presentation fro logic
// custom events
export default Menu
