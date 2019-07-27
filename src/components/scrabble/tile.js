import React from "react"
import Letter from "./letter.js"
import { Button } from "antd"
import scrabbleHelpers from "../../utils/scrabble_helpers.js"

function Tile(props) {
  var modifier = scrabbleHelpers.modifiers[props.x][props.y]
  return (
    <Button
      className={`square ${modifier}`}
      data-x={props.x}
      data-y={props.y}
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

export default Tile
