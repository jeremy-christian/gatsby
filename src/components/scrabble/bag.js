import React from "react"
import Letter from "./letter.js"
import scrabbleHelpers from "../../utils/scrabble_helpers.js"

class Bag extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="bag" id="bag">
        {this.props.bag.map(char => (
          <Letter letter={char} score={scrabbleHelpers.letterScores[char]} />
        ))}
      </div>
    )
  }
}

export default Bag
