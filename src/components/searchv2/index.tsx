import { default as React, useState, createRef } from "react"
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
import useClickOutside from "../search/use-click-outside"
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
  // const { hits, results, sendEvent } = useHits({});
  const [hasFocus, setFocus] = useState(false)

  const searchRootRef = createRef()
  useClickOutside(searchRootRef, () => setFocus(false))

  const refineHandler = (e) => {
    console.log(e.target.value);
    console.log(isSearchStalled);
    if(isSearchStalled) {
      refine(e.target.value)
    }
  }

  return (
    <div className="search-root" ref={searchRootRef}>
      <SearchBox
        placeholder="Search"
        onFocus={()=>{setFocus(true)}}
        classNames={{
          form: hasFocus ? 'search-input open' : 'search-input close',
          input: 'search-input',
          submit: 'search-button',
          reset: 'reset-button',
          submitIcon: 'search-icon',
        }}
      ></SearchBox>
      <SearchResult
        show={query && query.length > 0 && hasFocus}
        className="popover"
        indices={indices}
      ></SearchResult>
    </div>
  )
}

const SearchV2 = ({ indices }: Props) => {
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID || "",
    process.env.GATSBY_ALGOLIA_SEARCH_KEY || ""
  );

  return (
    <InstantSearch
      searchClient={searchClient}
      stalledSearchDelay={1000}
      indexName={indices[0].name}
    >
      <CustomSearch indices={indices}></CustomSearch>
    </InstantSearch>
  )
}

export default SearchV2
