import React from "react"
import {
  PocketShareButton,
  PocketIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
  HatenaShareButton,
  HatenaShareCount,
  HatenaIcon,
  FacebookShareButton,
  FacebookShareCount,
  FacebookIcon,
} from "react-share"

import Like from "../components/like"

// FIXME: ShareCountの型情報を合わせられなかったのでやむなくany+disableにした
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderShareCount: any = (shareCount: number) => <div className="share-count">{shareCount}</div>

const Reaction: React.FC<{ siteUrl: string; slug: string }> = ({ siteUrl, slug }) => {
  const url = `${siteUrl}${slug}`
  return (
    <div className="reaction">
      <Like slug={slug} />
      <HatenaShareButton url={url}>
        <HatenaIcon size={32} round={true} />
        <HatenaShareCount url={url}>{renderShareCount}</HatenaShareCount>
      </HatenaShareButton>
      <PocketShareButton url={url}>
        <PocketIcon size={32} round={true} />
      </PocketShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <LineShareButton url={url}>
        <LineIcon size={32} round={true} />
      </LineShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round={true} />
        <FacebookShareCount url={url}>{renderShareCount}</FacebookShareCount>
      </FacebookShareButton>
    </div>
  )
}

export default Reaction
