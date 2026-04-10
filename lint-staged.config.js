module.exports = {
  "**/*.md": ["textlint"],
  "**/*.{ts,tsx}": ["bash -c 'pnpm typecheck'"],
  "*.@(js|ts|tsx)": filenames =>
    `bash -c 'pnpm eslint -f compact -c .eslintrc.json ${filenames.join(
      " "
    )} | reviewdog -f=eslint-compact -fail-on-error -diff="git diff --cached" -reporter=local'`,
}
