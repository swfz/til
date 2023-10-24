interface Env {
  DB: D1Database
}

export const onRequestGet: PagesFunction<Env> = async context => {
  const likes = await context.env.DB.prepare("SELECT slug, count(*) AS c FROM likes GROUP BY slug").run()

  return Response.json(likes)
}
