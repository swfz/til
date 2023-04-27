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

const SEO: React.FC<Props> = ({ description, meta, title, children }) => {
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

  return (
    <>
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta=
      {[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `article`,
        },
        {
          property: `og:image`,
          content: ogpImage,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:image`,
          content: ogpImage,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        ...(meta || []),
      ]}
      {children}
    </>
  )
}

export default SEO
