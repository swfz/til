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
const renderShareCount: any = (shareCount: number) => <div className="text-xs">{shareCount}</div>

const Reaction: React.FC<{ siteUrl: string; slug: string }> = ({ siteUrl, slug }) => {
  const url = `${siteUrl}${slug}`
  return (
    <div className="sticky top-1 flex flex-row items-start justify-center gap-2 p-1 md:flex-col md:items-center">
      <Like slug={slug} />
      <div className="flex flex-col items-center">
        <HatenaShareButton url={url}>
          <HatenaIcon size={32} round={true} />
        </HatenaShareButton>
        <HatenaShareCount url={url}>{renderShareCount}</HatenaShareCount>
      </div>
      <PocketShareButton url={url}>
        <PocketIcon size={32} round={true} />
      </PocketShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <LineShareButton url={url}>
        <LineIcon size={32} round={true} />
      </LineShareButton>
      <div className="flex flex-col items-center">
        <FacebookShareButton url={url}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <FacebookShareCount url={url}>{renderShareCount}</FacebookShareCount>
      </div>
    </div>
  )
}

export default Reaction
