/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"
import { BioQueryQuery } from "../../types/graphql-types"

const Bio: React.FC = () => {
  const data: BioQueryQuery = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
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

  const { author, social } = data.site.siteMetadata
  return (
    <>
      <h3>Profile</h3>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
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
      <p>
        <strong>{author.name}</strong>
        {` `}
        <div>日々学んだことを残していく日記</div>
        <h3>Account</h3>
        <ul>
          <li>
            <a href={`https://twitter.com/${social.twitter}`} target="_blank">
              Twitter
            </a>
          </li>
          <li>
            <a href={`https://github.com/${social.github}`} target="_blank">
              GitHub
            </a>
          </li>
        </ul>
      </p>
    </>
  )
}

export default Bio
