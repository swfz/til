import { GatsbyNode } from "gatsby"
import path from "path"
import moment from "moment"
import kebabCase from "lodash/kebabCase"
import { createFilePath } from "gatsby-source-filesystem"

export const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  const tagTemplate = path.resolve(`./src/templates/tags.tsx`)
  const archiveTemplate = path.resolve(`./src/templates/archives.tsx`)
  const result = await graphql(
    `
      {
        postsRemark: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
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
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.postsRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        id: post.node.id,
        previous,
        next,
      },
    })
  })

  const archives = posts.reduce((acc, cur) => {
    const date = cur.node.frontmatter.date
    const [year, month] = date.split("-")
    acc[year] = acc[year] ? acc[year] : {}
    acc[year][month] = acc[year][month] ? acc[year][month] : []
    acc[year][month].push(cur)
    return acc
  }, {})

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
    Object.entries(items).forEach(([month, nodes]) => {
      const startDate = moment(`${year}-${month}-01`).format("YYYY-MM-DD")
      const endDate = moment(`${year}-${month}-01`)
        .add(1, "months")
        .format("YYYY-MM-DD")
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

  const tags = result.data.tagsGroup.group
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}

export const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
