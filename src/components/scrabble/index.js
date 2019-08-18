import React from "react"
import Board from "./board.js"
import Tray from "./tray.js"
import Bag from "./bag.js"
import InfoBoard from "./infoboard.js"
import { Modal, Button } from "antd"
import Letter from "./letter.js"
import scrabbleHelpers from "../../utils/scrabble_helpers.js"
import { Tabs } from "antd"

const { TabPane } = Tabs
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

    let wordLog = [
      {
        author: "example_author",
        turn: "example_turn",
        word: "example_word",
        position: "example_coords",
        direction: "example_direction",
        score: "example_score",
        definition: "example_definition",
      },
    ]

    // set initial game state
    this.state = {
      tiles: tiles,
      tray: tray,
      bag: bag,
      wordLog: wordLog,
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
        <Tabs defaultActiveKey="1">
          <TabPane tab="Select Letter From Tray" key="1">
            <div className="letter-select">
              {this.state.tray
                .filter(char => typeof char == "string")
                .map(char => (
                  <Letter
                    letter={char}
                    x={x}
                    y={y}
                    score={scrabbleHelpers.letterScores[char]}
                    onClick={event => this.placeTrayItem(event)}
                  />
                ))}
            </div>
          </TabPane>
          <TabPane tab="Select Any Letter" key="2">
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
          </TabPane>
        </Tabs>
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

  wordCheck(tiles, data) {
    let sift = w => w.map(c => (c ? c : " "))
    let vWords = sift([...tiles[data.x]].reverse())
      .join("")
      .split(" ")
      .filter(w => w !== "")

    vWords.forEach(word =>
      fetch(`https://mydictionaryapi.appspot.com/?define=${word}`)
        .then(function(response) {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            )
            return
          }

          // Examine the text in the response
          response.json().then(function(data) {
            console.log("Word found: ", data)
          })
        })
        .catch(function(err) {
          console.log("Fetch Error :-S", err)
        })
    )

    console.log(vWords)
  }

  tileChange(event) {
    let tiles = this.state.tiles
    let data = event.currentTarget.dataset
    tiles[data.x][data.y] = data.char
    this.wordCheck(tiles, data)
    this.setState({
      tiles: tiles,
      modal_open: false,
      modal_content: false,
      // errorLog,
      // wordLog,
    })
    console.log(`Tile update: ${data.x}-${data.y} is now '${data.char}'`)
  }

  placeTrayItem(event) {
    let tiles = this.state.tiles
    let data = event.currentTarget.dataset
    let tray = this.state.tray
    tray[tray.indexOf(data.char)] = null
    tiles[data.x][data.y] = data.char
    this.setState({
      tiles: tiles,
      modal_open: false,
      modal_content: false,
      tray: tray,
    })
    console.log(`Tile update: ${data.x}-${data.y} is now '${data.char}'`)
  }

  loadTray() {
    let bag = this.state.bag
    let tray = this.state.tray.filter(char => typeof char === "string")
    while (tray.length < 7) {
      tray.push(bag.pop())
    }
    this.setState({ tray: tray, bag: bag })
    console.log(bag)
  }

  render() {
    return (
      <div className="game">
        <div className="game-pane">
          <Bag bag={this.state.bag} />
          <Tray
            tray={this.state.tray}
            loadTray={event => this.loadTray(event)}
          />
        </div>
        <div className="game-pane">
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
        </div>
        <div className="game-pane">
          <InfoBoard wordLog={this.state.wordLog} />
        </div>
      </div>
    )
  }
}

export default Game
