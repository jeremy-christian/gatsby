import React from "react"
class InfoBoard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="info-board">
        {this.props.wordLog.map(log => (
          <div>{`${log.word} worth ${log.score} points made by ${
            log.author
          } on turn ${log.turn}`}</div>
        ))}
      </div>
    )
  }
}

export default InfoBoard
