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
import type { Hit, SearchClient } from "instantsearch.js"
import {
  MultipleQueriesResponse,
  MultipleQueriesQuery,
} from "@algolia/client-search"
import useClickOutside from "./use-click-outside"

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

let timerId: ReturnType<typeof setTimeout>

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

const Search = ({ indices }: SearchProps) => {
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
        }) as Readonly<Promise<MultipleQueriesResponse<SearchResponse>>>
      }

      return algoliaClient.search(requests)
    },
  }

  // NOTE: https://www.algolia.com/doc/guides/building-search-ui/going-further/improve-performance/react-hooks/#disabling-as-you-type
  // 入力確定判断まで1秒待つ
  const queryHook: CustomSearchProps["queryHook"] = (query, search) => {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => search(query), 1000)
  }

  return (
    <InstantSearch searchClient={searchClient} indexName={indices[0].name}>
      <CustomSearch queryHook={queryHook} indices={indices}></CustomSearch>
    </InstantSearch>
  )
}

export default Search
