module.exports = {
  "**/*.md": ["textlint"],
  "**/*.{ts,tsx}": ["bash -c 'yarn typecheck'"],
  "*.@(js|ts|tsx)": filenames => `yarn eslint ${filenames.join(" ")}`,
}
