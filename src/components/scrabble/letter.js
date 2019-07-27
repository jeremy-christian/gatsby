import React from "react"
const Letter = props => {
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

export default Letter
