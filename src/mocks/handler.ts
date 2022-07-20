import { rest } from "msw"
import svgImage from "./pixela.svg"
// import mockJson from './search-response.json'
import mockJson from "./search-response2.json"

export const handlers = [
  rest.get(
    "https://pixe.la/v1/users/swfz/graphs/til-pageviews",
    async (req, res, ctx) => {
      const svgBuffer = await fetch(svgImage).then(res => res.arrayBuffer())

      return res(ctx.status(200), ctx.body(svgBuffer))
    }
  ),
  // rest.post('https://*.algolia.net/1/indexes/*/queries', (req, res, ctx) => {
  // return res(ctx.status(200), ctx.json({results: {hits: []}}))
  // return res(ctx.status(200), ctx.json(mockJson))
  // })
]
