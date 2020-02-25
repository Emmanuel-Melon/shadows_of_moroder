import $ from 'jquery'

const Victory = (player) => {
  $('.fight-screen').css('display', 'none')
  $('.victory-screen').css('display', 'block').addClass('centered')
  // hide panes
  $('.pane').css('display', 'none')

  const heading = $('<h1></h1>').addClass('victory-heading')
  const victoryBody = $('.victory-body')

  const classes = $(player).attr('class').split(/\s+/)

  if (classes.includes('player-1')) {
    heading.text('Player One Wins!!')
    const avatar = $(`<figure><img alt="" src="https://cdn.vox-cdn.com/thumbor/IH54-8s30_EQXvwxYcogItOoFxo=/0x80:1920x1360/1400x1400/filters:focal(0x80:1920x1360):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/45614852/1920x1440-10170-orc-box-art-1140.0.0.jpg" /></figure>`).addClass('avatar')
    victoryBody.append(heading).append(avatar)
  } else if (classes.includes('player-2')) {
    heading.text('Player Two Wins!!')
    const avatar = $(`<figure><img alt="" src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" /></figure>`).addClass('avatar')
    victoryBody.append(heading).append(avatar)
  }
}

export default Victory
