import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { AllMarkdownQuery } from '../../types/graphql-types'
import '../styles.scss'

type Props = {
  data: AllMarkdownQuery
}

const BlogIndex: React.FC<Props> = ({ data, location }) => {
  const siteTitle = data.site?.siteMetadata?.title
  const posts = data.allMarkdownRemark?.edges

  return (
    <>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article className="card" key={node.fields.slug}>
            <header className="card-content">
              <small>[{node.frontmatter.date}]</small>
              <h2 className="subtitle"
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h2>
              {node.frontmatter.tags.map(tag => (
                  <Link className="button is-small" key={tag} to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
                )
              )}
            </header>
          </article>
        )
      })}
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query AllMarkdown {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            description
            tags
          }
        }
      }
    }
  }
`
