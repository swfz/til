#!/bin/bash

# さすがに100コミットまとめてデプロイはしないと判断して決め打ち
git fetch --depth 100

LATEST_DEPLOY_COMMIT_SHA=$(curl -X GET "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/pages/projects/til/deployments" \
  -H "Authorization: Bearer ${CF_API_KEY}" \
  -H "Content-Type:application/json" | jq '.result[]|select(.deployment_trigger.metadata.branch=="master")' | jq -scr '.[1]|.deployment_trigger.metadata.commit_hash')

echo "latest commit sha: $LATEST_DEPLOY_COMMIT_SHA"
echo "current commit sha: $CF_PAGES_COMMIT_SHA"

# 差分があると終了コード1
git diff --quiet $LATEST_DEPLOY_COMMIT_SHA $CF_PAGES_COMMIT_SHA content/blog/entries/

rc=$?

if [ "$rc" = "1" ]; then
  echo "content changed."
  CONTENT_CHANGED=true gatsby build
else
  echo "content not changed."
  CONTENT_CHANGED=false gatsby build
fi
