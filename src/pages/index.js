import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Game from "../components/tic-tac-toe"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import "../styles/index.css"

class BlogIndex extends React.Component {
  render() {
    return <Game />
  }
}

export default BlogIndex
