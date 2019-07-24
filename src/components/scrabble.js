import React from "react"
import ReactDOM from "react-dom"
import scrabbleHelpers from "../utils/scrabble_helpers.js"
import "../styles/index.css"
import { Link, graphql } from "gatsby"
import { version, Button, Input } from "antd"
import scrabbleWordFinder from "../components/word-finder"
import scrabbleWordList from "../utils/ScrabbleWordList"
import { Select, Spin } from "antd"
import debounce from "lodash/debounce"
import { Modal } from "antd"

const { Option } = Select

// shuffles array order, used to randomise letter draw order from the 'bag'
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function Tile(props) {
  var modifier = scrabbleHelpers.modifiers[props.x][props.y]
  return (
    <Button
      className={`square ${modifier}`}
      type="text"
      maxLength="1"
      data-x={props.x}
      data-y={props.y}
      id={`${props.x}-${props.y}`}
      modifier={modifier}
      onChange={event => props.onChange(event)}
      onClick={event => props.onClick(event)}
    >
      <Letter />
    </Button>
  )
}

function Letter(props) {
  return (
    <div className="letter" data-char={props.letter} onClick={props.onClick}>
      <span>{props.letter}</span>
      <span>{props.score}</span>
    </div>
  )
}

function TraySlot(props) {
  return (
    <Input
      className={`square`}
      type="text"
      maxLength="1"
      id={`tray-slot-${props.index}`}
    />
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props)
  }

  state = { modal_open: false }

  showModal(event) {
    console.log(event)
    this.setState({
      modal_open: true,
      current_tile: event.currentTarget.dataset,
    })
  }

  handleCancel = e => {
    console.log(e)
    this.setState({
      modal_open: false,
    })
  }

  render() {
    let row = Array(15).fill(null)
    return (
      <div className="game-board">
        <Modal
          title="Select Letter"
          visible={this.state.modal_open}
          onCancel={this.handleCancel}
          footer={null}
        >
          <div className="letter-select">
            {scrabbleHelpers.alphabet.map(char => (
              <Letter
                letter={char}
                score={scrabbleHelpers.letterScores[char]}
                onClick={event => this.props.tileChange(event)}
              />
            ))}
          </div>
        </Modal>
        {row.map((_, y) => (
          <div className="board-row">
            {row.map((_, x) => (
              <Tile x={x} y={14 - y} onClick={event => this.showModal(event)} />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

class Tray extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let tray = Array(7).fill(null)
    return (
      <div className="tray" id="tray">
        {/*tray input*/}
        {tray.map((_, y) => (
          <TraySlot />
        ))}

        {/*load tray*/}
        <Button type="primary" icon="download" trayId="tray">
          Load Tray
        </Button>
      </div>
    )
  }
}

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

  tileChange(event, current_tile) {
    let tiles = this.state.tiles
    // let x = event.target.dataset.x
    // let y = event.target.dataset.y
    // console.log(event.target.dataset.x)
    // tiles[current_tile.x][current_tile.y] = "foo"
    this.setState({ tiles: tiles })
    console.log(tiles)
    console.log(event.currentTarget.dataset.char)
    // console.log(
    //   `Tile update: ${
    //     event.target.id
    //   } is now
    //   '${event.target.value.toUpperCase()}'`
    // )
  }

  loadTray() {
    let bag = this.state.bag
  }

  render() {
    return (
      <div>
        <Board tileChange={event => this.tileChange(event)} />
        <Tray />
      </div>
    )
  }
}

export default Game
