import React from "react"
import "antd/dist/antd.css"
import "../styles/index.css"
import Game from "../components/scrabble"

class App extends React.Component {
  render() {
    return (
      <div class="page-content">
        <Game />
      </div>
    )
  }
}

export default App
