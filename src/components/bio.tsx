import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import React from "react"

const Bio: React.FC = () => {
  const data: Queries.BioQuery = useStaticQuery(graphql`
    query Bio {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          gatsbyImageData(width: 50, height: 50, placeholder: BLURRED, layout: FIXED)
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
  const image = data.avatar?.childImageSharp?.gatsbyImageData || ({} as IGatsbyImageData) // FIXME: not good

  return (
    <>
      <div className="py-4">
        <h3>Profile</h3>
        <GatsbyImage image={image} alt={author?.name || ""} className="mb-0 mr-2 rounded-full" />
        <strong>{author?.name}</strong>
      </div>
      <div className="py-4">
        <div>日々学んだことを残していく</div>
        <div>Today I Learned</div>
        <div>コード片置き場</div>
      </div>

      <div className="flex flex-row gap-2 py-4">
        <div>
          <h3 className="py-1">Account</h3>
          <div className="flex gap-2">
            <a href={`https://twitter.com/${social?.twitter || ""}`} target="_blank" rel="noreferrer">
              <img className="w-8" src="/twitter.svg" />
            </a>
            <a href={`https://github.com/${social?.github || ""}`} target="_blank" rel="noreferrer">
              <img className="w-8" src="/github-120.png" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="py-1">RSS</h3>
          <Link to={`/rss.xml`}>
            <img className="w-8" src="/rss.png" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Bio
