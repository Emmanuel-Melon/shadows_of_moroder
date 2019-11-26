import $ from 'jquery'

/**
 *
 */
class Movements {
  constructor () {
    console.log('about to move this player!!')
  }

  // handle differently if target isn't a cell
  // we only care about cells
  static handleCellClick (e) {
    const { target, delegateTarget } = e
    console.log(target)
    console.log(delegateTarget)

    const type = $(target).attr('data-type') || $(delegateTarget).attr('data-type')
    if (type === 'player') {
      console.log(target)
      // the delegate of a populated div shouldn't be the map, it should instead be the div
      $(target).addClass('player-on')
    }
  }

  static handleCellHover (e) {
    const { target, delegateTarget } = e

    // check types of target and delegates
    console.log(target)
    console.log(delegateTarget)
    const type = $(target).attr('data-type') || $(delegateTarget).attr('data-type')
    if (type === 'empty') {
      $(target).addClass('cell-hovered')
    } else if (type === 'player') {
      console.log(delegateTarget)
      $(delegateTarget).addClass('player-on')
    }
  }

  static handleCellLeave (e) {
    const { target, delegateTarget } = e
    console.log(target)
    console.log(delegateTarget)
    const type = $(target).attr('data-type') || $(delegateTarget).attr('data-type')
    if (type === 'empty') {
      $(target).removeClass('cell-hovered')
    } else if (type === 'player') {
      $(delegateTarget).removeClass('player-on')
    }
  }
}
export default Movements
