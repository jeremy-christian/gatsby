import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Game from "../components/scrabble"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import "../styles/index.css"

class BlogIndex extends React.Component {
  render() {
    return (<Game /><div class="page-content">
      <div class="wrapper">
        <label for="letters">Letters</label>
        <input type="text" id="letters"/>
        <button onclick="findWords()">Find Words</button>
        <pre id="words"></pre>
      </div>
    </div>)
  }
}

export default BlogIndex
