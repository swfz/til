import React from "react"
import { Link, graphql, PageProps } from "gatsby"
import kebabCase from "lodash/kebabCase"
import isNil from "lodash/isNil"

import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import {
  BlogPostBySlugQuery,
  AllMarkdownQuery,
} from "../../types/graphql-types"

declare type ElementType<T> = T extends (infer U)[] ? U : never
type PageContext = {
  previous: ElementType<AllMarkdownQuery["allMarkdownRemark"]["edges"]>["node"]
  next: ElementType<AllMarkdownQuery["allMarkdownRemark"]["edges"]>["node"]
}

const BlogPostTemplate: React.FC<
  PageProps<BlogPostBySlugQuery, PageContext>
> = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const relatedPosts = data.relatedMarkdownRemarks?.posts?.slice(0, 3)
  const { previous, next } = pageContext

  if (
    !isNil(post) &&
    !isNil(post.html) &&
    !isNil(post.frontmatter) &&
    !isNil(post.frontmatter.tags)
  ) {
    return (
      <>
        <SEO
          title={post.frontmatter.title ?? ""}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <h1 className="title">{post.frontmatter.title}</h1>
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
                  <Link
                    className="tag is-link is-light"
                    key={tag}
                    to={`/tags/${kebabCase(tag || "")}`}
                  >
                    {tag}
                  </Link>
                ))}
              </span>
            </p>
          </header>
          <hr
            style={{
              marginTop: rhythm(1),
            }}
          />
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
        </article>

        <div>
          <h2>関連記事</h2>
          <ul>
            {relatedPosts?.map(relatedPost => {
              return (
                <li>
                  <Link to={relatedPost?.fields?.slug ?? ""}>
                    {relatedPost?.frontmatter?.title}
                  </Link>
                </li>
              )
            })}
          </ul>
          <hr
            style={{
              marginTop: rhythm(1),
            }}
          />
        </div>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous?.fields?.slug || ""} rel="prev">
                  ← {previous?.frontmatter?.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next?.fields?.slug || ""} rel="next">
                  {next?.frontmatter?.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </>
    )
  } else {
    return <></>
  }
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
        date(formatString: "YYYY-MM-DD")
        description
        tags
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
