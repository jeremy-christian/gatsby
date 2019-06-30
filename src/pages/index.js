import React from "react"
import "antd/dist/antd.css"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Game from "../components/scrabble"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import "../styles/index.css"

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

class BlogIndex extends React.Component {
  render() {
    return (
      <div class="page-content">
        <Game />
      </div>
    )
  }
}

export default BlogIndex
