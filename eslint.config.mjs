import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import tailwindcss from "eslint-plugin-tailwindcss";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import gatsbyEslintCustomRules from "./gatsby-eslint-custom-rules.mjs";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/lint-staged.config.js",
        "**/loadershim.js",
        "**/jest.config.js",
        "**/jest.resolver.js",
        "**/jest-preprocess.js",
        "public/*",
    ],
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
)), {
    plugins: {
        react: fixupPluginRules(react),
        "react-hooks": fixupPluginRules(reactHooks),
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        import: fixupPluginRules(importPlugin),
        "unused-imports": unusedImports,
        tailwindcss: fixupPluginRules(tailwindcss),
        gatsby: gatsbyEslintCustomRules,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        eqeqeq: "error",
        "react/jsx-handler-names": ["error", {
            eventHandlerPrefix: "handle",
            eventHandlerPropPrefix: "on",
            checkInlineFunction: true,
            checkLocalVariables: false,
        }],
        "react/prop-types": "off",
        "import/order": ["warn", {
            groups: [
                "builtin",
                "external",
                "internal",
                "parent",
                "sibling",
                "index",
                "object",
                "type",
            ],
            "newlines-between": "always",
            alphabetize: {
                order: "asc",
                caseInsensitive: false,
            },
        }],
        "import/no-unresolved": "off",
        "react/no-array-index-key": "warn",
        "gatsby/limited-exports": "warn",
        "gatsby/no-anonymous-exports": "warn",
    },
}];