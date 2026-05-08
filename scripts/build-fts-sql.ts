import fs from "fs"
import path from "path"

type Record = {
  objectID: string
  slug: string
  title: string
  description: string
  tags: string[]
  date: string
  timeToRead: number
  text: string
}

// SQLite (D1) の 1 statement あたり ~1MB 上限を踏まないように 1 行ずつ INSERT する。
// 1 記事の text が ~200KB 程度ある可能性があるため、安全側で 1 件ずつ。
const CHUNK_SIZE = 1
const projectRoot = path.resolve(__dirname, "..")
const inputPath = path.join(projectRoot, "public", "search-index.json")
const outputPath = path.join(projectRoot, "public", "fts.sql")

const log = (msg: string) => process.stdout.write(`${msg}\n`)
const errlog = (msg: string) => process.stderr.write(`${msg}\n`)

if (process.env.CONTENT_CHANGED === "false") {
  log("[build-fts-sql] CONTENT_CHANGED=false のためスキップ")
  process.exit(0)
}

if (!fs.existsSync(inputPath)) {
  errlog(`[build-fts-sql] ${inputPath} が存在しません。先に gatsby build を実行してください。`)
  process.exit(1)
}

const records: Record[] = JSON.parse(fs.readFileSync(inputPath, "utf-8"))

const escape = (value: string): string => `'${value.replace(/'/g, "''")}'`

const valuesFor = (r: Record): string =>
  [
    escape(r.slug),
    escape(r.title),
    escape(r.description),
    escape(r.text),
    escape(JSON.stringify(r.tags)),
    escape(r.date),
    String(r.timeToRead),
  ].join(", ")

const lines: string[] = ["DELETE FROM blog_fts;"]

for (let i = 0; i < records.length; i += CHUNK_SIZE) {
  const chunk = records.slice(i, i + CHUNK_SIZE)
  const values = chunk.map(r => `  (${valuesFor(r)})`).join(",\n")
  lines.push(`INSERT INTO blog_fts(slug, title, description, text, tags, date, timeToRead) VALUES\n${values};`)
}

fs.writeFileSync(outputPath, lines.join("\n") + "\n")
log(`[build-fts-sql] ${records.length} records → ${outputPath}`)
