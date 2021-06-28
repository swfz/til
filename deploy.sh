#!/bin/bash

echo $CACHED_COMMIT_REF
echo $COMMIT_REF

# 差分があると終了コード1
git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF content/blog/entries/

rc=$?

if [ "$rc" = "1" ]; then
  echo "content changed."
  # CONTENT_CHANGED=true gatsby build
  CONTENT_CHANGED=false gatsby build
else
  echo "content not changed."
  CONTENT_CHANGED=false gatsby build
fi
