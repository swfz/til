module.exports = {
  "**/*.md": ["textlint"],
  "**/*.{ts,tsx}": ["bash -c 'pnpm typecheck'"],
  "*.@(js|ts|tsx)": filenames =>
    `pnpm eslint -c ./eslint.config.mjs ${filenames.join(" ")}`,
}
