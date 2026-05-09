interface Env {
  DB: D1Database
}

const MIN_QUERY_LENGTH = 3
const LIMIT = 20

type Row = {
  slug: string
  title: string
  tags: string | null
  date: string
  timeToRead: number
  snippet: string
}

export const onRequestGet: PagesFunction<Env> = async context => {
  const url = new URL(context.request.url)
  const q = (url.searchParams.get("q") || "").trim()

  if (q.length < MIN_QUERY_LENGTH) {
    return Response.json({ hits: [], nbHits: 0 })
  }

  // FTS5 のクエリ構文をフレーズ化して全文一致のみ受け付ける
  // (二重引用符は SQLite FTS5 の文字列リテラル方式に従い "" でエスケープ)
  const match = `"${q.replace(/"/g, '""')}"`

  const result = await context.env.DB.prepare(
    `SELECT
       slug, title, tags, date, timeToRead,
       snippet(blog_fts, 3, '<mark>', '</mark>', '...', 60) AS snippet,
       bm25(blog_fts) AS rank
     FROM blog_fts
     WHERE blog_fts MATCH ?1
     ORDER BY rank
     LIMIT ?2`
  )
    .bind(match, LIMIT)
    .all<Row>()

  const hits = (result.results || []).map(r => ({
    slug: r.slug,
    title: r.title,
    tags: r.tags ? (JSON.parse(r.tags) as string[]) : [],
    date: r.date,
    timeToRead: r.timeToRead,
    snippet: r.snippet,
  }))

  return Response.json({ hits, nbHits: hits.length })
}
