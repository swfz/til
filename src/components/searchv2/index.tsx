import { default as React, useState } from "react"
import { Link } from "gatsby"
import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  SearchBox,
  Index,
  Highlight,
  Snippet,
  useSearchBox,
  useHits,
  Hits,
} from "react-instantsearch-hooks-web"
import type { UseSearchBoxProps } from "react-instantsearch-hooks-web"
import { Search as SearchIcon } from "@styled-icons/fa-solid"

const PageHit = ({ hit }) => (
  <div>
    <Link to={hit.slug}>
      <Highlight attribute="title" hit={hit} />
    </Link>
    <Snippet attribute="excerpt" hit={hit} />
  </div>
)

const SearchResult = ({ indices, className, show }) => (
  <div className={className} style={{ display: show ? `block` : `none` }}>
    {indices.map(index => (
      <Index indexName={index.name}>
        <Hits hitComponent={PageHit}></Hits>
      </Index>
    ))}
  </div>
)

const CustomSearch = ({ indices }) => {
  const { query, refine, clear, isSearchStalled } = useSearchBox({})
  const [hasFocus, setFocus] = useState(false)

  return (
    <>
      <SearchBox
        onFocus={() => setFocus(true)}
        className="search-input"
      ></SearchBox>
      <SearchIcon className="search-icon" />
      <SearchResult
        show={query && query.length > 0 && hasFocus}
        className="popover"
        indices={indices}
      ></SearchResult>
    </>
  )
}

const SearchV2 = ({ indices }: Props) => {
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID || "",
    process.env.GATSBY_ALGOLIA_SEARCH_KEY || ""
  );
  // const [query, setQuery] = useState("")

  // const { hits, results, sendEvent } = useHits(props);
  return (
    <InstantSearch
      // onStateChange={({ query }) => {setQuery(query)}}
      searchClient={searchClient}
      stalledSearchDelay={1000}
      indexName={indices[0].name}
    >
      <CustomSearch indices={indices}></CustomSearch>
    </InstantSearch>
  )
}

export default SearchV2
