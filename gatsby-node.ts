import path from "path"

import { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import isNil from "lodash/isNil"
import kebabCase from "lodash/kebabCase"
import moment from "moment"

import { Archives } from "./src/@types"

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  // Frontmatterは必ず全て入力している前提
  actions.createTypes(`
    type MarkdownRemark implements Node {
      fields: MarkdownRemarkFields!
      frontmatter: MarkdownRemarkFrontmatter!
    }
    type MarkdownRemarkFields {
      slug: String!
      collection: String!
    }
    type MarkdownRemarkFrontmatter {
      title: String!
      tags: [String]!
      date: Date!
      description: String!
    }
  `)
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  const tagTemplate = path.resolve(`./src/templates/tags.tsx`)
  const archiveTemplate = path.resolve(`./src/templates/archives.tsx`)

  const result = await graphql<Queries.AllPostAndTagsQuery>(`
    query AllPostAndTags {
      postsRemark: allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              date
              title
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
        }
      }
      categories: allCategoriesJson(limit: 1000) {
        edges {
          node {
            name
            tags
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result?.data?.postsRemark.edges || []

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post?.node?.fields?.slug || "",
      component: blogPost,
      context: {
        id: post.node.id,
        previous,
        next,
      },
    })
  })

  const archives = posts.reduce((acc, cur) => {
    if (isNil(cur) || isNil(cur.node)) {
      return acc
    }

    const date = cur.node.frontmatter.date
    const [year, month] = date.split("-")

    const ym = acc?.[year]?.[month] ? [...acc[year][month], cur] : [cur]
    const updateValue = { ...acc[year], [month]: ym }

    return { ...acc, [year]: updateValue }
  }, {} as Archives)

  Object.entries(archives).forEach(([year, items]) => {
    const startDate = moment(`${year}-01-01`).format("YYYY-MM-DD")
    const endDate = moment(`${year}-01-01`).add(1, "years").format("YYYY-MM-DD")
    createPage({
      path: `/archives/${year}`,
      component: archiveTemplate,
      context: {
        year: year,
        startDate: startDate,
        endDate: endDate,
      },
    })
    Object.entries(items).forEach(([month]) => {
      const startDate = moment(`${year}-${month}-01`).format("YYYY-MM-DD")
      const endDate = moment(`${year}-${month}-01`).add(1, "months").format("YYYY-MM-DD")
      createPage({
        path: `/archives/${year}/${month}`,
        component: archiveTemplate,
        context: {
          year: year,
          month: month,
          startDate: startDate,
          endDate: endDate,
        },
      })
    })
  })

  const tags = result?.data?.tagsGroup.group || []
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${kebabCase(tag?.fieldValue || "")}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  // check for unmapped categories
  const OTHER_CATEGORY_TAGS = 6
  const categories = result?.data?.categories.edges || []
  const otherCategoryTags = tags.filter(tag => !categories.find(c => c.node.tags?.includes(tag.fieldValue)))

  if (otherCategoryTags.length > OTHER_CATEGORY_TAGS) {
    reporter.warn(
      `${otherCategoryTags.map(c => c.fieldValue).join(", ")} are not mapped to any category ${otherCategoryTags.length}/${OTHER_CATEGORY_TAGS}`
    )
  }
}

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions, getNode }) => {
  const { createNodeField, deleteNode } = actions

  if (node.internal.type === `MarkdownRemark` && node.parent) {
    const parent = getNode(node.parent)
    const frontmatter = node.frontmatter as Queries.MarkdownRemarkFrontmatter
    const afterStart =
      process.env.START_DATE === undefined || (process.env.START_DATE && frontmatter.date >= process.env.START_DATE)
    const beforeEnd =
      process.env.END_DATE === undefined || (process.env.END_DATE && frontmatter.date < process.env.END_DATE)
    const inTerm = afterStart && beforeEnd
    const available = inTerm || parent?.sourceInstanceName === "sample"

    if (available) {
      const slug = createFilePath({ node, getNode })

      createNodeField({
        name: `slug`,
        node,
        value: slug,
      })

      createNodeField({
        name: "collection",
        node,
        value: parent?.sourceInstanceName,
      })
    } else {
      deleteNode(node, { name: "gatsby-transformer-remark" })
    }
  }
}
