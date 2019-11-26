import $ from 'jquery'
import axe from '../../../assets/img/axe.png'
import './Axe.css'

const Axe = () => {
  return `
  <div class="axe">
    <img src=${axe} alt="Game is loading"/>
  </div>
  `
}

export default Axe() // exporting executed

// rotate, scale and repeat
// make it look natural
