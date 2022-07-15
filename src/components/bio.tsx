/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { rhythm } from "../utils/typography"

const Bio: React.FC = () => {
  const data: Queries.BioQuery = useStaticQuery(graphql`
    query Bio {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            base64
            width
            height
            src
            srcSet
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const { author, social } = data!.site!.siteMetadata!
  const childImageSharp = data.avatar?.childImageSharp
  const fixed = Array.isArray(childImageSharp?.fixed)
    ? childImageSharp?.fixed[0]
    : childImageSharp?.fixed

  return (
    <>
      <h3>Profile</h3>
      <Image
        fixed={fixed}
        alt={author?.name || ""}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <strong>{author?.name}</strong>
      <hr />
      <div>日々学んだことを残していく日記</div>
      <div>コード片置き場</div>
      <div>
        <Link to={`/rss.xml`}>RSS</Link>
      </div>
      <hr />
      <h3>Account</h3>
      <ul>
        <li>
          <a
            href={`https://twitter.com/${social?.twitter || ""}`}
            target="_blank"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href={`https://github.com/${social?.github || ""}`}
            target="_blank"
          >
            GitHub
          </a>
        </li>
      </ul>
    </>
  )
}

export default Bio
