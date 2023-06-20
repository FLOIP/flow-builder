import {defineConfig} from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    experimentalRunAllSpecs: true,
    "viewportWidth": 1440,
    "viewportHeight": 900
  },
})
