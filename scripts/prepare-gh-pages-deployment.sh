#!/bin/bash

# This apply needed changes before running yarn build,
# as described in https://github.com/FLOIP/flow-builder/blob/master/gh-pages-deploy.md

echo "Prepare gh-pages deployment"
# We're applying patches to temporary edit few file during the deployment
# In case of conflict, we need to regenerate those patches
# - git diff src/router/index.ts > patches/gh-pages-prepare-router.patch
# - git diff vue.config.js > patches/gh-pages-prepare-vue-config.patch
git apply patches/gh-pages-prepare-router.patch
git apply patches/gh-pages-prepare-vue-config.patch
