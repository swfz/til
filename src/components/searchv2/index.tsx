import { default as React, useState, useRef } from "react"
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
import type { Hit } from "instantsearch.js"

type PageHitProps = {
  hit: Hit
}

type SearchProps = {
  indices: Indices[]
}

type Indices = {
  name: string
  title: string
}

// NOTE: queryHookはSearchBoxConnectorParamsを持ってきたかったが持ってくる方法がわからなかったのでコピーしている
type CustomSearchProps = {
  indices: Indices[]
  queryHook: (query: string, hook: (value: string) => void) => void
}

type SearchResultProps = {
  indices: Indices[]
  className: string
  show: string | boolean
}

const PageHit = ({ hit }: PageHitProps) => (
  <div className="search-result-item">
    <Link to={hit.slug}>
      <Highlight attribute="title" hit={hit} />
    </Link>
    <br />
    <Snippet
      attribute="rawMarkdownBody"
      hit={hit}
      classNames={{
        root: "search-result-item-snippet",
      }}
    />
  </div>
)

const SearchResult = ({ indices, className, show }: SearchResultProps) => {
  const { hits, results, sendEvent } = useHits({})

  return (
    <div className={className} style={{ display: show ? `block` : `none` }}>
      <div>{results?.nbHits} results</div>
      {indices.map(index => (
        <Index indexName={index.name}>
          <Hits
            classNames={{
              list: "search-result-list",
            }}
            hitComponent={PageHit}
          ></Hits>
        </Index>
      ))}
    </div>
  )
}

const CustomSearch = ({ indices, queryHook }: CustomSearchProps) => {
  const { query, refine, clear, isSearchStalled } = useSearchBox({})
  const [hasFocus, setFocus] = useState(false)

  const searchRootRef = useRef<HTMLDivElement>(null)
  useClickOutside(searchRootRef, () => setFocus(false))

  return (
    <div className="search-root" ref={searchRootRef}>
      <SearchBox
        placeholder="Search"
        onFocus={() => {
          setFocus(true)
        }}
        queryHook={queryHook}
        classNames={{
          form: hasFocus ? "search-input open" : "search-input close",
          input: "search-input",
          submit: "search-button",
          reset: "reset-button",
          submitIcon: "search-icon",
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

const SearchV2 = ({ indices }: SearchProps) => {
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID || "",
    process.env.GATSBY_ALGOLIA_SEARCH_KEY || ""
  )

  const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout>>()

  const queryHook: CustomSearchProps["queryHook"] = (query, search) => {
    if (timerId) {
      clearTimeout(timerId)
    }

    const id = setTimeout(() => search(query), 1000)
    setTimerId(id)
  }

  return (
    <InstantSearch
      searchClient={searchClient}
      stalledSearchDelay={1000}
      indexName={indices[0].name}
    >
      <CustomSearch queryHook={queryHook} indices={indices}></CustomSearch>
    </InstantSearch>
  )
}

export default SearchV2
