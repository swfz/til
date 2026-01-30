#!/bin/bash

# script for update algolia index
# related swfz/article-search

pnpm install
CONTENT_CHANGED=true CF_PAGES_BRANCH=master pnpm build
