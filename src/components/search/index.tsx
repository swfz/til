import { MultipleQueriesResponse, MultipleQueriesQuery } from "@algolia/client-search"
import algoliasearch from "algoliasearch/lite"
import { Link } from "gatsby"
import { default as React, useState, useRef } from "react"
import { InstantSearch, SearchBox, Index, Highlight, Snippet, useSearchBox, useHits, Hits } from "react-instantsearch"

import useClickOutside from "./use-click-outside"

import type { Hit, SearchClient } from "instantsearch.js"
import type { UseSearchBoxProps } from "react-instantsearch"

type PageHitProps = {
  hit: Hit
}

type SearchProps = {
  indices: Indices[]
}

type Indices = {
  name: string
}

// NOTE: queryHookはSearchBoxConnectorParamsを持ってきたかったが持ってくる方法がわからなかったのでコピーしている
type CustomSearchProps = {
  indices: Indices[]
  queryHook: UseSearchBoxProps["queryHook"]
}

type SearchResultProps = {
  indices: Indices[]
  className: string
  show: string | boolean
}

const PageHit = ({ hit }: PageHitProps) => (
  <div className="search-result-item" data-testid="search-result-item">
    <Link className="link" to={hit.slug}>
      <Highlight attribute="title" hit={hit} />
    </Link>
    <br />
    <Snippet
      attribute="text"
      hit={hit}
      classNames={{
        root: "search-result-item-snippet",
      }}
    />
  </div>
)

const SearchResult = ({ indices, className, show }: SearchResultProps) => {
  const { results } = useHits({})

  return (
    <div data-testid="search-result" className={className} style={{ display: show ? `block` : `none` }}>
      <div data-testid="search-result-count">{results?.nbHits} results</div>
      {indices.map(index => (
        <Index key={index.name} indexName={index.name}>
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
  const { query } = useSearchBox({})
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
      <SearchResult show={query && query.length > 0 && hasFocus} className="popover" indices={indices}></SearchResult>
    </div>
  )
}

const Search = ({ indices }: SearchProps) => {
  const timerId = useRef<ReturnType<typeof setTimeout>>()

  const algoliaClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID || "",
    process.env.GATSBY_ALGOLIA_SEARCH_KEY || ""
  )

  const searchClient: SearchClient = {
    ...algoliaClient,
    // NOTE: https://www.algolia.com/doc/guides/building-search-ui/going-further/conditional-requests/react-hooks/
    // クエリ文字列が空の場合はリクエストを送らずダミーのレスポンスを返す実装を挟んでいる
    search: <SearchResponse,>(requests: Readonly<MultipleQueriesQuery[]>) => {
      if (requests.every(({ params }) => !params?.query)) {
        return Promise.resolve<MultipleQueriesResponse<SearchResponse>>({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: true,
            query: "",
            params: "",
          })),
        })
      }

      return algoliaClient.search(requests)
    },
  }

  // NOTE: https://www.algolia.com/doc/guides/building-search-ui/going-further/improve-performance/react-hooks/#disabling-as-you-type
  // 入力確定判断まで1秒待つ
  const queryHook: CustomSearchProps["queryHook"] = (query, search) => {
    if (timerId.current) {
      clearTimeout(timerId.current)
    }

    timerId.current = setTimeout(() => search(query), 1000)
  }

  return (
    <InstantSearch searchClient={searchClient} indexName={indices[0].name}>
      <CustomSearch queryHook={queryHook} indices={indices}></CustomSearch>
    </InstantSearch>
  )
}

export default Search
