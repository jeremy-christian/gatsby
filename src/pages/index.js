import React from "react"
// import "antd/dist/antd.css"
import "../styles/index.css"
import Scrabble from "../components/scrabble/index.js"

class App extends React.Component {
  render() {
    return (
      <div class="page-content">
        <Scrabble />
      </div>
    )
  }
}

export default App
