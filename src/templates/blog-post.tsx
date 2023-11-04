import { Link, graphql, PageProps, HeadFC } from "gatsby"
import isNil from "lodash/isNil"
import kebabCase from "lodash/kebabCase"
import React from "react"

import { ElementType } from "../@types"
import Like from "../components/like"
import Reaction from "../components/reaction"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

type MarkdownNode = ElementType<Queries.AllMarkdownQuery["allMarkdownRemark"]["edges"]>["node"]
type PageContext = {
  previous: MarkdownNode
  next: MarkdownNode
}

const Divider = () => {
  return (
    <hr
      style={{
        marginTop: rhythm(1),
      }}
    />
  )
}

const BlogPostTemplate: React.FC<PageProps<Queries.BlogPostBySlugQuery, PageContext>> = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const relatedPosts = data.relatedMarkdownRemarks?.posts?.slice(0, 3)
  const { previous, next } = pageContext

  if (isNil(post) || isNil(post.html)) {
    return <></>
  }

  return (
    <div className="columns" style={{ height: "100%", marginBottom: 0, marginTop: 0, paddingLeft: "0.75em", paddingRight: "0.75em" }}>
      <div className="column is-1" style={{ background: "#EFEFEF" }}>
        <Reaction slug={post.fields.slug}></Reaction>
      </div>
      <main className="column is-11">
        <article>
          <header>
            <h1 className="title">{post.frontmatter.title}</h1>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Like slug={post.fields.slug} />
              <p
                style={{
                  ...scale(-1 / 5),
                  display: `block`,
                  marginBottom: rhythm(1),
                }}
              >
                {post.frontmatter.date}
                <span className="tags">
                  {post.frontmatter.tags.map(tag => (
                    <Link className="tag is-link is-light" key={tag} to={`/tags/${kebabCase(tag || "")}`}>
                      {tag}
                    </Link>
                  ))}
                </span>
              </p>
            </div>
          </header>
          <Divider />
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <Divider />
        </article>

        <div>
          <h3 className="title is-3">関連記事</h3>
          <ul>
            {relatedPosts?.map(relatedPost => {
              return (
                <li key={relatedPost?.fields.slug ?? ""}>
                  <Link to={relatedPost?.fields.slug ?? ""}>{relatedPost?.frontmatter.title}</Link>
                </li>
              )
            })}
          </ul>
          <Divider />
        </div>

        <nav>
          <ul className="before-after-navi">
            <li>
              {previous && (
                <Link to={previous.fields.slug || ""} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug || ""} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </main>
    </div>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
        description
        tags
      }
      fields {
        slug
      }
    }
    relatedMarkdownRemarks(parent: { id: { eq: $id } }) {
      posts {
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`

export const Head: HeadFC<Queries.BlogPostBySlugQuery> = props => {
  const post = props.data.markdownRemark
  return (
    <SEO
      title={post?.frontmatter.title}
      tags={post?.frontmatter.tags}
      description={post?.frontmatter.description || post?.excerpt || ""}
    />
  )
}
