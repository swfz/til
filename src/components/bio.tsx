/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import React from "react"

import { rhythm } from "../utils/typography"

const Bio: React.FC = () => {
  const data: Queries.BioQuery = useStaticQuery(graphql`
    query Bio {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          gatsbyImageData(
            width: 50
            height: 50
            placeholder: BLURRED
            layout: FIXED
          )
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

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { author, social } = data!.site!.siteMetadata!
  const image =
    data.avatar?.childImageSharp?.gatsbyImageData || ({} as IGatsbyImageData) // FIXME: not good

  return (
    <>
      <h3>Profile</h3>
      <GatsbyImage
        image={image}
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
      <div>日々学んだことを残していく</div>
      <div>Today I Learned</div>
      <div>コード片置き場</div>
      <hr />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <h3>Account</h3>
          <div style={{ display: "flex" }}>
            <a
              href={`https://twitter.com/${social?.twitter || ""}`}
              target="_blank"
              rel="noreferrer"
              style={{ padding: "0.1em 0.3em" }}
            >
              <img src="/twitter.svg" style={{ width: "2em" }} />
            </a>
            <a
              href={`https://github.com/${social?.github || ""}`}
              target="_blank"
              rel="noreferrer"
              style={{ padding: "0.1em 0.3em" }}
            >
              <img src="/github-120.png" style={{ width: "2em" }} />
            </a>
          </div>
        </div>
        <div>
          <h3>RSS</h3>
          <Link to={`/rss.xml`}>
            <img src="/rss.png" style={{ width: "2em" }} />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Bio
