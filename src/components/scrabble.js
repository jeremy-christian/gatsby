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

class App extends React.Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = e => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  handleCancel = e => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
}

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
    />
  )
}

function Letter(props) {
  return (
    <div className="letter">
      <span>L</span>
      <span>1</span>
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

  showModal = () => {
    console.log("hmmm")
    this.setState({
      modal_open: true,
    })
  }

  handleOk = e => {
    console.log(e)
    this.setState({
      modal_open: false,
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
          title="Basic Modal"
          visible={this.state.modal_open}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Letter />
        </Modal>
        {row.map((_, y) => (
          <div className="board-row">
            {row.map((_, x) => (
              <Tile
                x={x}
                y={14 - y}
                onClick={this.showModal}
                onChange={event => this.props.tileChange(event)}
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
    }
  }

  tileChange(event) {
    let tiles = this.state.tiles
    let x = event.target.dataset.x
    let y = event.target.dataset.y
    console.log(event.target.dataset.x)
    tiles[x][y] = event.target.value.toUpperCase()
    this.setState({ tiles: tiles })
    console.log(
      `Tile update: ${
        event.target.id
      } is now '${event.target.value.toUpperCase()}'`
    )
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
