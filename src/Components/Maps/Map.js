import $ from 'jquery'

function Map () {
  this.title = 'Middle Earth'
  // ul with divs in it?
  // generate n divs basing on?
  this.grid = []
  // ids should be unique, concatenate number when generating
  this.gridItem = $('<div></div>').append('grid-item').attr(id, 'gridItem')
  this.wrapper = $('<div></div>').addClass('wrapper')
  this.content = ''
}

Map.prototype.generate = function () {
  this.content += ``
  return $(`<h1>Map</h1>`)
}

// look at stub functions man
export default Map
