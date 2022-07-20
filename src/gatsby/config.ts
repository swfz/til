// For Plugin Algolia
import { ElementType } from "../../types"
type MarkdownNode = {
  node: ElementType<
  Queries.AllPostAndTagsQuery["postsRemark"]["edges"]
>["node"]}

const escapeStringRegexp = (str: string): string => {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

  const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

	return str.replace(matchOperatorsRe, '\\$&');
}
const pagePath = `content/blog`

const algoliaQuery = `
{
  postsRemark: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/${escapeStringRegexp(pagePath)}/" },
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          date
          title
          tags
          description
        }
        fields {
          slug
        }
        rawMarkdownBody
        timeToRead
      }
    }
  }
}`

function pageToAlgoliaRecord({ node: { id, frontmatter, fields, ...rest }}: MarkdownNode) {
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest,
  }
}

type Data = {
  data: Queries.AllPostAndTagsQuery
}

export const algoliaQueries = [
  {
    query: algoliaQuery,
    transformer: ({ data }: Data) => data.postsRemark.edges.map(pageToAlgoliaRecord),
    indexName: process.env.ALGOLIA_INDEX_NAME, // overrides main index name, optional
    settings: { attributesToSnippet: [`rawMarkdownBody:30`] },
  },
]