# Deploy a new build to github pages

1. In `router/index.ts`, comment out `mode: 'history',`
1. In `vue.config.js`, add `publicPath: '/flow-builder/',` to top level export
1. In `package.json`, add `"build": "vue-cli-service build",` to `scripts` section
1. via https://cli.vuejs.org/guide/deployment.html#github-pages:
```
yarn build
cd dist && \n
  git init && \n 
  git add -A && \n
  git commit -m 'deploy' && \n
  git push -f git@github.com:FLOIP/flow-builder.git master:gh-pages; \n
  cd -
```

## Next

- Push above into a package.json command (under scripts) using `GH_PAGES` as our environment  
- Set up automatic updates via: https://cli.vuejs.org/guide/deployment.html#using-travis-ci-for-automatic-updates
