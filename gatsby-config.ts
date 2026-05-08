import { feedOptions, remarkRelatedPostsOptions } from "./src/gatsby/config"

import type { GatsbyConfig } from "gatsby"

const plugins: GatsbyConfig["plugins"] = [
  `gatsby-transformer-json`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/blog`,
      name: `blog`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/sample`,
      name: `sample`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/assets`,
      name: `assets`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/definitions`,
      name: `definitions`,
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 590,
            withWebp: true,
          },
        },
        {
          resolve: `gatsby-remark-responsive-iframe`,
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`,
          },
        },
        {
          resolve: "gatsby-remark-external-links",
          options: {
            rel: "noopener noreferrer",
          },
        },
        {
          resolve: "gatsby-remark-embed-gist",
          options: {},
        },
        {
          resolve: "gatsby-remark-prismjs",
          options: {
            showLineNumbers: true,
            noInlineHighlight: false,
          },
        },
        `gatsby-remark-copy-linked-files`,
        `gatsby-remark-smartypants`,
      ],
    },
  },
  `gatsby-plugin-image`,
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID || "dummy",
      head: true,
    },
  },
  {
    resolve: `gatsby-plugin-google-tagmanager`,
    options: {
      id: process.env.GOOGLE_TAGMANAGER_TRACKING_ID,
      includeInDevelopment: false,
      defaultDataLayer: { platform: "gatsby" },
    },
  },
  {
    resolve: `gatsby-plugin-feed`,
    options: feedOptions,
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Gatsby Starter Blog`,
      short_name: `GatsbyJS`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `content/assets/gatsby-icon.png`,
    },
  },
  `gatsby-plugin-sitemap`,
  `gatsby-plugin-sass`,
  {
    resolve: `@sentry/gatsby`,
    options: {
      dsn: `https://a52b2817a4214407b72c88d2d8d62ca7@o554110.ingest.sentry.io/5682225`,
      sampleRate: 0.7,
    },
  },
  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.dev/offline
  // `gatsby-plugin-offline`,
  {
    resolve: "gatsby-remark-related-posts",
    options: remarkRelatedPostsOptions,
  },
  "gatsby-plugin-postcss",
]

const config: GatsbyConfig = {
  siteMetadata: {
    title: `swfz[:memo] << TIL`,
    author: {
      name: `swfz`,
      summary: `Software Programmer`,
    },
    description: `Today I Learned`,
    siteUrl: `https://til.swfz.io`,
    social: {
      twitter: `swfz`,
      github: `swfz`,
    },
  },
  graphqlTypegen: true,
  plugins: plugins,
}

export default config
