import React from "react"
import scrabbleHelpers from "../utils/scrabble_helpers.js"
import { Modal, Button, Input, Select } from "antd"
import scrabbleWordFinder from "../components/word-finder"
import scrabbleWordList from "../utils/ScrabbleWordList"

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
      onClick={event => props.onClick(event)}
    >
      {props.value ? (
        <Letter
          letter={props.value}
          score={scrabbleHelpers.letterScores[props.value]}
        />
      ) : (
        ""
      )}
    </Button>
  )
}

function Letter(props) {
  return (
    <div
      className="letter"
      data-x={props.x}
      data-y={props.y}
      data-char={props.letter}
      onClick={props.onClick}
    >
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
    console.log(event.currentTarget.dataset)
    this.setState({
      modal_open: true,
      current_x: event.currentTarget.dataset.x,
      current_y: event.currentTarget.dataset.y,
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
                x={this.state.current_x}
                y={this.state.current_y}
                score={scrabbleHelpers.letterScores[char]}
                onClick={event => this.props.tileChange(event)}
              />
            ))}
          </div>
        </Modal>
        {row.map((_, y) => (
          <div className="board-row">
            {row.map((_, x) => (
              <Tile
                x={x}
                y={14 - y}
                value={this.props.tiles[x][14 - y]}
                onClick={event => this.showModal(event)}
              />
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
      currentTile: null,
    }
  }

  tileChange(event, current_tile) {
    let tiles = this.state.tiles
    let data = event.currentTarget.dataset
    tiles[data.x][data.y] = data.char
    this.setState({ tiles: tiles })
    console.log(`Tile update: ${data.x}-${data.y} is now '${data.char}'`)
  }

  loadTray() {
    let bag = this.state.bag
  }

  render() {
    return (
      <div>
        <Board
          tiles={this.state.tiles}
          tileChange={event => this.tileChange(event)}
        />
        <Tray />
      </div>
    )
  }
}

export default Game
