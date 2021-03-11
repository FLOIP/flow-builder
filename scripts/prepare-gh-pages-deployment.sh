#!/bin/bash

# This apply needed changes before running yarn build,
# as described in https://github.com/FLOIP/flow-builder/blob/master/gh-pages-deploy.md

echo "Prepare gh-pages deployment"
git apply patches/gh-pages-prepare-router.patch
git apply patches/gh-pages-prepare-vue-config.patch
