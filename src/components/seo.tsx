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
  children?: React.ReactNode
}

const SEO: React.FC<Props> = ({ description, title, children }) => {
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

  const decodedTitle = decodeURI(title || "")
  const ogpImage = `https://res.cloudinary.com/dss6ly6hy/image/upload/s--CZpmof8E--/c_limit,h_600,w_1200/co_rgb:C800D4,l_text:arial_30_bold_normal_left:${decodedTitle}/fl_layer_apply,g_center/til/til-ogp_xsuuux.jpg`
  const titleTemplate = `%s | ${site.siteMetadata.title}`

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
