import React from "react"
import {
  XShareButton,
  XLegacyIcon,
  LineShareButton,
  LineLegacyIcon,
  HatenaShareButton,
  HatenaLegacyIcon,
  FacebookShareButton,
  FacebookLegacyIcon,
} from "react-share"

import Like from "../components/like"

const Reaction: React.FC<{ siteUrl: string; slug: string }> = ({ siteUrl, slug }) => {
  const url = `${siteUrl}${slug}`
  return (
    <div className="sticky top-1 flex flex-row items-start justify-center gap-2 p-1 md:flex-col md:items-center">
      <Like slug={slug} />
      <HatenaShareButton url={url}>
        <HatenaLegacyIcon size={32} round={true} />
      </HatenaShareButton>
      <XShareButton url={url}>
        <XLegacyIcon size={32} round={true} />
      </XShareButton>
      <LineShareButton url={url}>
        <LineLegacyIcon size={32} round={true} />
      </LineShareButton>
      <FacebookShareButton url={url}>
        <FacebookLegacyIcon size={32} round={true} />
      </FacebookShareButton>
    </div>
  )
}

export default Reaction
