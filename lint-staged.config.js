module.exports = {
  "**/*.md": ["textlint"],
  "**/*.{ts,tsx}": ["bash -c 'yarn typecheck'"],
  "*.@(js|ts|tsx)": filenames => `yarn eslint -c .eslintrc.json ${filenames.join(" ")} | reviewdog -f=eslint -fail-on-error -diff='git diff --cached' -reporter local`,
}
