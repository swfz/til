#!/bin/bash

# script for update algolia index
# related swfz/article-search

yarn
CONTENT_CHANGED=true CF_PAGES_BRANCH=master yarn build
