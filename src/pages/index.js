import React from "react"
import { Link, graphql } from "gatsby"
import { version, Button } from "antd"
import "antd/dist/antd.css"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Game from "../components/scrabble"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import "../styles/index.css"
import scrabbleWordFinder from "../components/word-finder"

class BlogIndex extends React.Component {
  findWords() {
    var letterInput = document.getElementById("letters")
    var foundWords = document.getElementById("words")
    console.log(letterInput)
    if (letterInput)
      foundWords.innerHTML = scrabbleWordFinder
        .find(letterInput.value.toLowerCase())
        .join("\n")
  }
  render() {
    return (
      <div class="page-content">
        <Game />

        <div className="wrapper">
          <label for="letters">Letters</label>
          <input type="text" id="letters" />
          <Button type="primary" onClick={this.findWords}>
            Find Words
          </Button>
          <pre id="words" />
        </div>
      </div>
    )
  }
}

export default BlogIndex
