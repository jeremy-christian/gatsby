import React from "react"
import ReactDOM from "react-dom"
import scrabbleHelpers from "../utils/scrabble_helpers.js"
import "../styles/index.css"

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tiles: Array(15).fill(Array(15).fill(null)),
    }
  }

  renderSquare(x, y) {
    var modifier = scrabbleHelpers.modifiers[x][y]
    return (
      <input
        className={"square ".concat(modifier)}
        type="text"
        maxLength="1"
        modifier={modifier}
      />
    )
  }

  renderRow(y) {
    return (
      <div className="board-row">
        {Array(15)
          .fill("")
          .map((_, i) => this.renderSquare(i, y))}
      </div>
    )
  }

  render() {
    return (
      <div>
        {Array(15)
          .fill(null)
          .map((_, i) => this.renderRow(i))}
      </div>
    )
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    )
  }
}

export default Game
