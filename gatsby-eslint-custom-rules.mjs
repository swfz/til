import limitedExports from './node_modules/gatsby/dist/utils/eslint-rules/limited-exports-page-templates.js'
import noAnonymousExports from './node_modules/gatsby/dist/utils/eslint-rules/no-anonymous-exports-page-templates.js'

// ESLint 10でcontext.getFilename()が削除されcontext.filenameに変更されたため
// Gatsbyの古いルールとの互換性を保つラッパー
function wrapRuleForEslint10(rule) {
  return {
    ...rule,
    create(context) {
      const wrappedContext = new Proxy(context, {
        get(target, prop) {
          if (prop === 'getFilename') {
            return () => target.filename;
          }
          return target[prop];
        },
      });
      return rule.create(wrappedContext);
    },
  };
}

const plugin = {
  meta: {
    name: 'gatsby-custom-rules',
    version: '1.0.0',
  },
  rules: {
    'limited-exports': wrapRuleForEslint10(limitedExports),
    'no-anonymous-exports': wrapRuleForEslint10(noAnonymousExports),
  },
}

export default plugin;