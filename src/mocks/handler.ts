import { rest } from 'msw'


  // rest.get('https://pixe.la/v1/users/swfz/graphs/til-pageviews', (req, res, ctx) => {
export const handlers = [
  rest.get('https://pixe.la/v1/users/swfz/graphs/til-pageviews', (req, res, ctx) => {
    const mode = req.url.searchParams.get('mode')
    console.log('captured')
    const fetchSvg = async() => {
      const res = await fetch('./pixela.svg')
      const html: any = await res.text()

      return html
    }
    const html = fetchSvg()
    console.log(html);
    return res(ctx.status(200), ctx.body(html))
  }),
]