import React from "react"
import Board from "./board.js"
import Tray from "./tray.js"
import { Modal, Button } from "antd"
import Letter from "./letter.js"
import scrabbleHelpers from "../../utils/scrabble_helpers.js"

// shuffles array order, used to randomise letter draw order from the 'bag'
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function GameModal(props) {
  return (
    <Modal
      title="Select Letter"
      visible={props.visible}
      onCancel={props.hideModal}
      footer={props.footer}
    >
      {props.content}
    </Modal>
  )
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
      modal_open: false,
      modal_content: null,
      modal_footer: null,
    }
  }

  showModal(event) {
    console.log(event.currentTarget.dataset)
    let x = event.currentTarget.dataset.x
    let y = event.currentTarget.dataset.y
    this.setState({
      modal_open: true,
      modal_content: (
        <div className="letter-select">
          {scrabbleHelpers.alphabet.map(char => (
            <Letter
              letter={char}
              x={x}
              y={y}
              score={scrabbleHelpers.letterScores[char]}
              onClick={event => this.tileChange(event)}
            />
          ))}
        </div>
      ),
      modal_footer: [
        <Button
          data-x={x}
          data-y={y}
          data-char={null}
          onClick={event => this.tileChange(event)}
          type="danger"
        >
          Remove Letter
        </Button>,
      ],
    })
  }

  hideModal(event) {
    this.setState({
      modal_open: false,
      modal_content: null,
      modal_footer: null,
    })
  }

  tileChange(event) {
    let tiles = this.state.tiles
    let data = event.currentTarget.dataset
    tiles[data.x][data.y] = data.char
    this.setState({ tiles: tiles, modal_open: false, modal_content: false })
    console.log(`Tile update: ${data.x}-${data.y} is now '${data.char}'`)
  }

  loadTray() {
    let bag = this.state.bag
  }

  render() {
    return (
      <div>
        <GameModal
          visible={this.state.modal_open}
          content={this.state.modal_content}
          hideModal={event => this.hideModal(event)}
          footer={this.state.modal_footer}
        />
        <Board
          tiles={this.state.tiles}
          tileChange={event => this.tileChange(event)}
          showModal={event => this.showModal(event)}
        />
        <Tray />
      </div>
    )
  }
}

export default Game
