export type ElementType<T> = T extends readonly (infer U)[] ? U : never
export type ArchiveEdges = Queries.ArchiveQueryQuery["allMarkdownRemark"]["edges"]
export type ArchiveEdge = ElementType<ArchiveEdges>
export type ArchiveMonth = { [key: string]: ArchiveEdge[] }
export type Archives = {
  [key: string]: ArchiveMonth
}