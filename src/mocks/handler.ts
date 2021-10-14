import { rest } from 'msw'
import svgImage from './pixela.svg'

export const handlers = [
  rest.get('https://pixe.la/v1/users/swfz/graphs/til-pageviews', async (req, res, ctx) => {
    const svgBuffer = await fetch(svgImage).then((res) => res.arrayBuffer())

    return res(ctx.status(200), ctx.body(svgBuffer))
  }),
  rest.post('https://undefined-*.algolianet.com/1/indexes/*/queries', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({results: {hits: []}}))
  })
]
