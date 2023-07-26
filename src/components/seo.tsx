/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { useStaticQuery, graphql } from "gatsby"
import React from "react"

type Props = {
  description?: string
  meta?: React.DetailedHTMLProps<
    React.MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[]
  title?: string
  tags?: readonly (string|null)[]|undefined
  children?: React.ReactNode
}

const SEO: React.FC<Props> = ({ description, title, tags, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query Site {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const titleTemplate = `${title} | ${site.siteMetadata.title}`

  const decodedTitle = decodeURI(title || "")
  const imageUrl = new URL("https://til-ogp.deno.dev/")
  imageUrl.searchParams.append("title", decodedTitle)
  if (tags) {
    imageUrl.searchParams.append("tags", tags.join(","))
  }
  const ogpImage = imageUrl.toString()

  return (
    <>
      <title>{titleTemplate}</title>
      <meta name="description" content={metaDescription} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:type" content="article" />
      <meta name="og:image" content={ogpImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={site.siteMetadata.social.twitter} />
      <meta name="twitter:image" content={ogpImage} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

export default SEO
