import React from "react"
import ReactDOM from "react-dom"
import scrabbleHelpers from "../utils/scrabble_helpers.js"
import "../styles/index.css"
import { Link, graphql } from "gatsby"
import { version, Button, Input } from "antd"
import scrabbleWordFinder from "../components/word-finder"
import scrabbleWordList from "../utils/ScrabbleWordList"

// shuffles array order, used to randomise letter draw order from the 'bag'
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

// takes an array of characters and checks to see if there is a word in there
function wordSearch(lineArray, axisDirectionIsHorizontal, axisPosition) {
  let lineString = lineArray.reduce(
    (str, char) => (char === null ? str.concat(" ") : str.concat(char)),
    ""
  )
  let foundWords = lineString
    .trim()
    .split(/ +/g)
    .filter(word => word.length > 1)

  return foundWords.map(word => {
    let wordStart = lineString.indexOf(word)
    let wordEnd = wordStart + word.length

    let wordObj = {
      start: axisDirectionIsHorizontal
        ? `${wordStart}-${axisPosition}`
        : `${axisPosition}-${wordStart}`,
      letters: word,
      end: axisDirectionIsHorizontal
        ? `${wordEnd}-${axisPosition}`
        : `${axisPosition}-${wordEnd}`,
      axis: axisDirectionIsHorizontal ? "horizontal" : "vertical",
    }

    console.log(wordObj)
    return wordObj
  })
}

function gatherWords(lineArray, tray) {
  let placedLetters = lineArray.filter(char => char !== null && char !== "")
  let availableLetters = placedLetters.concat(tray)
  let foundWords = scrabbleWordFinder.find(
    String(availableLetters.join()).toLowerCase()
  )
  let potentialWords = foundWords.filter(
    word =>
      word
        .split("")
        .filter(char => placedLetters.indexOf(char.toUpperCase()) > -1).length
  )

  console.log(potentialWords)
}

function Tile(props) {
  function onChange(event, x, y) {
    var tiles = this.state.tiles
    tiles[y][x] = event.target.value.toUpperCase()
    this.setState({ tiles: tiles })
    console.log(
      `Tile update: ${x}-${y} is now '${event.target.value.toUpperCase()}'`
    )
  }
  let modifier = scrabbleHelpers.modifiers[x][y]
  return (
    <Input
      className={"square ".concat(modifier)}
      type="text"
      maxLength="1"
      id={`${props.x}-${props.y}`}
      modifier={modifier}
      onChange={event => onChange(event, x, y)}
    />
  )
}

class Board extends React.Component {}

class Game extends React.Component {
  constructor(props) {
    super(props)

    // construct tile matrix
    let tiles = []
    for (var i = 0; i < 15; i++) {
      tiles.push(new Array(15).fill(null))
    }

    // construct player tray
    let tray = new Array(7).fill(null)

    // construct letter bag
    var bag = scrabbleHelpers.letterDistribution
    shuffle(bag)

    // set initial game state
    this.state = {
      tiles: tiles,
      tray: tray,
      bag: bag,
      score: 0,
    }
  }

  renderSquare(x, y) {
    var modifier = scrabbleHelpers.modifiers[x][y]
    return (
      <Input
        className={"square ".concat(modifier)}
        type="text"
        maxLength="1"
        id={`${x}-${y}`}
        modifier={modifier}
        onChange={event => this.handleChange(event, x, y)}
      />
    )
  }

  renderRow(y) {
    return (
      <div>
        {Array(15)
          .fill("")
          .map((_, i) => this.renderSquare(i, y))}
      </div>
    )
  }

  renderBoard() {
    return (
      <div>
        {Array(15)
          .fill(null)
          .map((_, i) => this.renderRow(i))}
      </div>
    )
  }

  findWords() {
    console.log("running findWords")
    var letterInput = document.getElementById("tray").innerHTML
    var foundWords = document.getElementById("words")

    if (letterInput)
      foundWords.innerHTML = scrabbleWordFinder
        .find(String(letterInput).toLowerCase())
        .join("\n")
  }

  loadTray() {
    console.log("running loadTray")
    var trayElement = document.getElementById("tray")
    var bag = scrabbleHelpers.letterDistribution
    shuffle(bag)
    var tray = []
    for (let i = 0; i < 7; i++) {
      tray.push(bag.pop())
    }
    trayElement.innerHTML = tray.join(" ")
  }

  // TODO: record seen cordinates, skip in master forEach loops
  locateWords() {
    let tiles = this.state.tiles
    let words = []

    tiles.forEach((row, x) => {
      words = words.concat(wordSearch(row, true, x))
    })
    for (var i = 0; i < 14; i++) {
      let col = []
      tiles.forEach(row => {
        col.push(row[i])
      })
      words = words.concat(wordSearch(col, false, i))
    }
    console.log(words)
  }

  solveWords() {
    var tray = document.getElementById("tray").innerHTML.split(" ")
    let tiles = this.state.tiles

    tiles.forEach((row, x) => {
      console.log(`solving for row ${x}`)
      gatherWords(row, tray)
    })
    for (var i = 0; i < 14; i++) {
      let col = []
      tiles.forEach(row => {
        col.push(row[i])
      })
      console.log(`solving for col ${i}`)
      gatherWords(col, tray)
    }
  }

  firstTurn() {
    var foundWords = document.getElementById("words")
    foundWords.forEach(word => {})
  }

  wordExists(word) {
    return scrabbleWordList.includes(word)
  }

  checkTray(tray, word) {
    let validLetters = []
    tray.forEach(letter => {
      let currentWord = word.replace("_", letter)
      if (this.wordExists(currentWord)) validLetters.push(letter)
    })
    return validLetters
  }

  // checkTile(x, y, axis) {
  //   let tiles = this.state.tiles
  //   let tile = tiles[x][y]
  //   let highTile = axis == 'horizontal' ? tiles[x][y]
  // }

  findPlacements() {
    console.log("running findPlacements")
    // this.updateBoardState()
    console.log(this.state.tiles)
    var placementElements = document.getElementById("placements")
    placementElements.innerHTML = this.state.tiles[7][7]
  }

  render() {
    return (
      <div>
        <div className="game">
          <div className="game-board">{this.renderBoard()}</div>
        </div>
        <div>
          <Button type="primary" onClick={this.loadTray}>
            Load Tray
          </Button>
          <p id="tray" />
        </div>
        <div>
          <Button type="primary" onClick={this.findWords}>
            Find Words
          </Button>
          <p id="words" />
        </div>
        <div>
          <Button type="primary" onClick={() => this.findPlacements()}>
            Find Placements
          </Button>
          <p id="placements" />
        </div>
        <div>
          <Button type="primary" onClick={() => this.locateWords()}>
            Find Words (on board)
          </Button>
        </div>
        <div>
          <Button type="primary" onClick={() => this.listCheck("worasdd")}>
            index
          </Button>
        </div>
        <div>
          <Button type="primary" onClick={() => this.solveWords()}>
            make words
          </Button>
        </div>
      </div>
    )
  }
}

export default Game
