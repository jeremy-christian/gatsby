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

const { Option } = Select
// shuffles array order, used to randomise letter draw order from the 'bag'
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

class UserRemoteSelect extends React.Component {
  constructor(props) {
    super(props)
    this.lastFetchId = 0
    this.fetchLetters = debounce(this.fetchLetters, 800)
  }

  state = {
    data: [],
    value: [],
    fetching: false,
  }

  fetchLetters = value => {
    console.log("loading letters", value)

    this.setState({ data: [], fetching: true })

    const data = ["a", "b", "c"].map(char => ({
      text: char,
      value: char,
    }))

    this.setState({ data, fetching: false })
  }

  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false,
    })
  }

  render() {
    const { fetching, data, value } = this.state
    return (
      <Select
        mode="multiple"
        labelInValue
        value={value}
        placeholder=""
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchLetters}
        onChange={this.handleChange}
      >
        {data.map(d => (
          <Option key={d.value}>{d.text}</Option>
        ))}
      </Select>
    )
  }
}

function Tile(props) {
  var modifier = scrabbleHelpers.modifiers[props.x][props.y]
  return <UserRemoteSelect className={`square ${modifier}`} />
}

// {/*}<Input
//   className={`square ${modifier}`}
//   type="text"
//   maxLength="1"
//   x={props.x}
//   y={props.y}
//   id={`${props.x}-${props.y}`}
//   modifier={modifier}
//   onChange={event => props.onChange(event)}
// />*/}

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

  render() {
    let row = Array(15).fill(null)
    return (
      <div className="game-board">
        {row.map((_, y) => (
          <div className="board-row">
            {row.map((_, x) => (
              <Tile
                x={x}
                y={14 - y}
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
    tiles[event.target.y][event.target.x] = event.target.value.toUpperCase()
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
