#!/bin/bash

# install jq
curl -o $HOME/.local/bin/jq -L https://github.com/jqlang/jq/releases/download/jq-1.7/jq-linux64 && chmod +x $HOME/.local/bin/jq

# さすがに100コミットまとめてデプロイはしないと判断して決め打ち
git fetch --depth 100

if [ "$BUILD" = "production" ]; then
  res=$(curl -X GET "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/pages/projects/til/deployments" \
    -H "Authorization: Bearer ${CF_API_KEY}" \
    -H "Content-Type:application/json")
  LATEST_DEPLOY_COMMIT_SHA=$(echo ${res} | jq '.result[]|select(.deployment_trigger.metadata.branch=="master")' | jq -scr '.[1]|.deployment_trigger.metadata.commit_hash')

  echo "latest commit sha: $LATEST_DEPLOY_COMMIT_SHA"
  echo "current commit sha: $CF_PAGES_COMMIT_SHA"
  echo ${res} | jq '.result[]|.deployment_trigger'

  # 差分があると終了コード1
  git diff --quiet $LATEST_DEPLOY_COMMIT_SHA $CF_PAGES_COMMIT_SHA content/blog/entries/

  rc=$?

  if [ "$rc" = "1" ]; then
    echo "content changed."
    CONTENT_CHANGED=true pnpm build
  else
    echo "content not changed."
    CONTENT_CHANGED=false pnpm build
  fi
else
  echo "this build is preview build."
  CONTENT_CHANGED=false pnpm build
fi
