#!/bin/bash
# Call this from project root dir `bash scripts/manually-deploy-gh-pages.sh`
# If it encounters an error, we can always follow steps here : https://github.com/FLOIP/flow-builder/blob/master/gh-pages-deploy.md

# abort on errors
set -e

# pre-build file changes
bash scripts/prepare-gh-pages-deployment.sh

# build
yarn build

# commit & push
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:FLOIP/flow-builder.git master:gh-pages
cd -

# rollback changes on flow-builder branch
git reset --hard