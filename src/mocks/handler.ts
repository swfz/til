import { rest } from "msw"

import query0Words from "./algolia-search-response-0-words.json"
import query1Words from "./algolia-search-response-1-words.json"
import query2Words from "./algolia-search-response-2-words.json"
import query3Words from "./algolia-search-response-3-words.json"
import query4Words from "./algolia-search-response-4-words.json"
import query5Words from "./algolia-search-response-5-words.json"
import query6Words from "./algolia-search-response-6-words.json"
import query7Words from "./algolia-search-response-7-words.json"
import query8Words from "./algolia-search-response-8-words.json"
import svgImage from "./pixela.svg"

export const handlers = [
  rest.get(
    "https://pixe.la/v1/users/swfz/graphs/til-pageviews",
    async (req, res, ctx) => {
      const svgBuffer = await fetch(svgImage).then(res => res.arrayBuffer())

      return res(ctx.status(200), ctx.body(svgBuffer))
    }
  ),
  rest.post("https://*.algolia.net/1/indexes/*/queries", (req, res, ctx) => {
    const empty = query0Words // First Request: 初回読み込み時に空のクエリでリクエストが走る

    const wordCountResponseMap = [
      empty, // 空
      query1Words, // B
      query2Words, // Bi
      query3Words, // Big
      query4Words, // BigQ
      query5Words, // BigQu
      query6Words, // BigQue
      query7Words, // BigQuer
      query8Words, // BigQuery
    ]

    const bodyString = req.body as string

    if (bodyString.length === 0) {
      return res(ctx.status(200), ctx.json(empty))
    }

    const body = JSON.parse(bodyString)
    const params = [
      ...new URLSearchParams(body.requests[0].params).entries(),
    ].reduce((obj, e) => ({ ...obj, [e[0]]: e[1] }), {} as { query: string })

    if (
      !params.query ||
      params.query.length === 0 ||
      params.query.length > wordCountResponseMap.length
    ) {
      return res(ctx.status(200), ctx.json(empty))
    }

    return res(
      ctx.status(200),
      ctx.json(wordCountResponseMap[params.query.length])
    )
  }),
]
