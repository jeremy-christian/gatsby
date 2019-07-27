import React from "react"
import { Modal } from "antd"
import Letter from "./letter.js"
import Tile from "./tile.js"
import scrabbleHelpers from "../../utils/scrabble_helpers.js"

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
                value={this.props.tiles[x][14 - y]}
                onClick={event => this.props.showModal(event)}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default Board
