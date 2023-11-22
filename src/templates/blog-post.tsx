import { Link, graphql, PageProps, HeadFC } from "gatsby"
import isNil from "lodash/isNil"
import React from "react"

import { ElementType } from "../@types"
import Reaction from "../components/reaction"
import SEO from "../components/seo"
import { Tags } from "../components/tags"

type MarkdownNode = ElementType<Queries.AllMarkdownQuery["allMarkdownRemark"]["edges"]>["node"]
type PageContext = {
  previous: MarkdownNode
  next: MarkdownNode
}

const BlogPostTemplate: React.FC<PageProps<Queries.BlogPostBySlugQuery, PageContext>> = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const relatedPosts = data.relatedMarkdownRemarks?.posts?.slice(0, 3)
  const { previous, next } = pageContext

  if (isNil(post) || isNil(post.html)) {
    return <></>
  }

  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className="basis-1/12 bg-white md:bg-transparent">
        <Reaction siteUrl={data.site?.siteMetadata?.siteUrl || ""} slug={post.fields.slug}></Reaction>
      </div>
      <main className="grow basis-11/12 divide-y divide-zinc-100 bg-white p-4">
        <article className="divide-y divide-zinc-100 pb-4">
          <header className="py-4">
            <div className="mb-4 text-2xl font-bold">{post.frontmatter.title}</div>
            <div className="p-1">{post.frontmatter.date}</div>
            <div className="p-1">
              <Tags tags={post.frontmatter.tags}></Tags>
            </div>
          </header>
          <div className="prose max-w-4xl py-4" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>

        <div className="py-4 md:hidden">
          <Reaction siteUrl={data.site?.siteMetadata?.siteUrl || ""} slug={post.fields.slug}></Reaction>
        </div>

        <div className="py-4">
          <h3 className="text-xl font-bold">関連記事</h3>
          <ul>
            {relatedPosts?.map(relatedPost => {
              return (
                <li className="mb-1" key={relatedPost?.fields.slug ?? ""}>
                  <Link className="link" to={relatedPost?.fields.slug ?? ""}>
                    {relatedPost?.frontmatter.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <nav className="py-4">
          <ul className="flex flex-row flex-wrap justify-between">
            <li className="mb-0">
              {previous && (
                <Link className="link" to={previous.fields.slug || ""} rel="prev">
                  ⇦ {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li className="mb-0 grow text-right">
              {next && (
                <Link className="link" to={next.fields.slug || ""} rel="next">
                  {next.frontmatter.title} ⇨
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
        siteUrl
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
