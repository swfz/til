#!/bin/bash

yarn
CONTENT_CHANGED=true CF_PAGES_BRANCH=master yarn build
