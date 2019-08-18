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
    return (
      <div className="tray" id="tray">
        {this.props.tray.map(char => (
          <TrayItem value={char} />
        ))}

        {/*load tray*/}
        <Button
          type="primary"
          icon="download"
          trayId="tray"
          onClick={event => this.props.loadTray(event)}
        >
          Load Tray
        </Button>
      </div>
    )
  }
}

export default Tray
