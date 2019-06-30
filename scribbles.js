let lineArray = [
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  "E",
  " ",
  " ",
  "G",
  " ",
  " ",
  " ",
  " ",
]

let word = "ELEGANT"

let hotTiles = {}

word.split("").forEach(char => {})

// take lineArray
// add each char in lineArray to tray
// find words for current tray
// filter out words with no tile available on board to place around
// start at one end of your line
// place your word, keep track of if you're replacing a blank or using a tile already there
// if you're replacing a blank, pop from your tray!
// if your tray is empty, stop
// if you're trying to replace a tile already taken, stop
// if you've finished laying your word, and the end is touching another word, cancel (maybe check this at the start!)
// if you've picked a tile that has a tile behind it, cancel
