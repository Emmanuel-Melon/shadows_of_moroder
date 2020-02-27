import $ from 'jquery'

/**
 * assets
 */
import elf from "Images/elf.jpg"
import orc from "Images/orc.jpg"
import victory from "Music/victory.mp3"

/**
 *
 * @param player
 * @constructor
 */
const Victory = (player) => {



  $('.fight-screen').css('display', 'none')

  $('.victory-screen').css('display', 'block').addClass('centered')
  // hide panes
  $('.pane').css('display', 'none')

  const heading = $('<h1></h1>').addClass('victory-heading')
  const victoryBody = $('.victory-body')

  const classes = $(player).attr('class').split(/\s+/)

  if (classes.includes('player-1')) {
    heading.text('The Orc Wins!!')
    const avatar = $(`<figure><img alt="orc, player 1" src=${orc}/></figure>`).addClass('avatar')
    victoryBody.append(heading).append(avatar)
  } else if (classes.includes('player-2')) {
    heading.text('The Elf Wins!!')
    const avatar = $(`<figure><img alt="elf, player 2" src=${elf} /></figure>`).addClass('avatar')
    victoryBody.append(heading).append(avatar)
  }
}

export default Victory
