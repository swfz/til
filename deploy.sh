#!/bin/bash

# 差分があると終了コード1
git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF content/blog/entries/

rc=$?

if [ "$rc" = "1" ]; then
  CONTENT_CHANGED=true gatsby build
else
  CONTENT_CHANGED=false gatsby build
fi
