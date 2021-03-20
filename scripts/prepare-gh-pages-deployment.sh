#!/bin/bash

# This apply needed changes before running yarn build,
# as described in https://github.com/FLOIP/flow-builder/blob/master/gh-pages-deploy.md

echo "Prepare gh-pages deployment"
# We're applying patches to temporary edit few file during the deployment

abort()
{
    echo >&2 '
******************************************************************************************
*** Patching aborted, there could be a conflict, you may need to re-generate patches manually
*** - Edit manually desired files, then
*** - Regenerate patches:
***     $ git diff src/router/index.ts > patches/gh-pages-prepare-router.patch
***     $ git diff vue.config.js > patches/gh-pages-prepare-vue-config.patch
*** - commit changes for future usage
*****************************************************************************************
'
    echo "An error occurred. Exiting..." >&2
    exit 1
}

trap 'abort' 0

set -e # abort on errors

#----------------------------------------------------------
# If an error occurs, the abort() function will be called.
#----------------------------------------------------------
git apply -v patches/gh-pages-prepare-router.patch
git apply -v patches/gh-pages-prepare-vue-config.patch

# End of custom script!
trap : 0

echo >&2 '
************************
*** Patches applied ****
************************
'