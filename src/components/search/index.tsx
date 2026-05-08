import DOMPurify from "dompurify"
import { Link } from "gatsby"
import { default as React, useState, useRef, useEffect, useCallback } from "react"

import useClickOutside from "./use-click-outside"

type Hit = {
  slug: string
  title: string
  tags: string[]
  date: string
  timeToRead: number
  snippet: string
}

const DEBOUNCE_MS = 1000
const MIN_QUERY_LENGTH = 3

const sanitize = (html: string) => DOMPurify.sanitize(html, { ALLOWED_TAGS: ["mark"], ALLOWED_ATTR: [] })

const Search = () => {
  const [query, setQuery] = useState("")
  const [hits, setHits] = useState<Hit[]>([])
  const [nbHits, setNbHits] = useState(0)
  const [hasFocus, setFocus] = useState(false)

  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const rootRef = useRef<HTMLDivElement>(null)
  useClickOutside(rootRef, () => setFocus(false))

  // クエリ更新時は1秒のデバウンスを挟んでからリクエスト/リセットを行う(既存のas-you-type抑制と揃える)
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(async () => {
      // trigram は3文字未満では実用的にマッチしないので空結果に倒す
      if (query.length < MIN_QUERY_LENGTH) {
        setHits([])
        setNbHits(0)
        return
      }

      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const json = (await res.json()) as { hits: Hit[]; nbHits: number }
        setHits(json.hits)
        setNbHits(json.nbHits)
      } catch {
        setHits([])
        setNbHits(0)
      }
    }, DEBOUNCE_MS)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query])

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }, [])

  const onReset = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQuery("")
  }, [])

  const show = query.length > 0 && hasFocus

  return (
    <div className="search-root" ref={rootRef}>
      <form
        className={hasFocus ? "search-input open" : "search-input close"}
        role="search"
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <input
          className="search-input"
          type="search"
          placeholder="Search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocus(true)}
        />
        <button type="submit" title="Submit the search query" className="search-button">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M11.5 11.5L15 15M1 7a6 6 0 1012 0 6 6 0 00-12 0z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button type="reset" title="Clear the search query" className="reset-button" hidden={query.length === 0}>
          ×
        </button>
      </form>
      <div data-testid="search-result" className="popover" style={{ display: show ? "block" : "none" }}>
        <div data-testid="search-result-count">{nbHits} results</div>
        <ul className="search-result-list">
          {hits.map(hit => (
            <li key={hit.slug} className="search-result-item" data-testid="search-result-item">
              <Link className="link" to={hit.slug}>
                <span dangerouslySetInnerHTML={{ __html: sanitize(hit.title) }} />
              </Link>
              <br />
              <span
                className="search-result-item-snippet"
                dangerouslySetInnerHTML={{ __html: sanitize(hit.snippet) }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Search
