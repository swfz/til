module.exports = {
  "**/*.md": ["textlint"],
  "**/*.{ts,tsx}": ["bash -c 'yarn typecheck'"],
  "*.@(js|ts|tsx)": filenames =>
    `bash -c 'yarn eslint -f compact -c .eslintrc.json ${filenames.join(
      " "
    )} | reviewdog -f=eslint-compact -fail-on-error -diff="git diff --cached" -reporter=local'`,
}
