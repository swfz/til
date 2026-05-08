CREATE VIRTUAL TABLE IF NOT EXISTS blog_fts USING fts5(
  slug UNINDEXED,
  title,
  description,
  text,
  tags UNINDEXED,
  date UNINDEXED,
  timeToRead UNINDEXED,
  tokenize = 'trigram'
);
