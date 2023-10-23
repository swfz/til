interface Env {
  DB: D1Database
}

export const onRequestGet: PagesFunction<Env> = async context => {
  const url = new URL(context.request.url)
  const slug = url.searchParams.get("slug")
  const likes = await context.env.DB.prepare("SELECT COUNT(*) AS c FROM likes WHERE slug = ?1").bind(slug).run()

  return Response.json(likes)
}

export const onRequestPost: PagesFunction<Env> = async context => {
  const params = await context.request.json()
  const ip = context.request.headers.get("x-real-ip") || "unknown"
  const slug = params.slug

  if (!slug) {
    return Response.json({ success: false })
  }

  const { success } = await context.env.DB.prepare("INSERT INTO likes(slug, ip) VALUES(?1, ?2)").bind(slug, ip).run()

  return Response.json({ success })
}
