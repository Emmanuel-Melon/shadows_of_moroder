import './Cell.css'

class CellItem {
  constructor (row, col, itemClassName, game) {
    this.game = game
    this.row = row
    this.col = col
    this.itemClassName = itemClassName
    this.avoidItems = [
      'weapon-attack',
      'weapon-attack-super',
      'weapon-defense',
      'weapon-health',
      'player-1',
      'player-2'
    ]
  }
}

export default CellItem
