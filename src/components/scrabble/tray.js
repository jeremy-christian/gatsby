import React from "react"
import { Button } from "antd"
import Letter from "./letter.js"
import scrabbleHelpers from "../../utils/scrabble_helpers.js"

function TrayItem(props) {
  return (
    <Button className={`square`}>
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
          <TrayItem />
        ))}

        {/*load tray*/}
        <Button type="primary" icon="download" trayId="tray">
          Load Tray
        </Button>
      </div>
    )
  }
}

export default Tray
