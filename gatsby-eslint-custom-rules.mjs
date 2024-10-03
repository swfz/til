import limitedExports from './node_modules/gatsby/dist/utils/eslint-rules/limited-exports-page-templates.js'  
import noAnonymousExports from './node_modules/gatsby/dist/utils/eslint-rules/no-anonymous-exports-page-templates.js'  

const plugin = {
  meta: {
    name: 'gatsby-custom-rules',
    version: '1.0.0',
  },
  rules: {
    'limited-exports': limitedExports,
    'no-anonymous-exports': noAnonymousExports,
  },
}

export default plugin;