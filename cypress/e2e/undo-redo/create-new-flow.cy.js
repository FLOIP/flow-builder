// Import store to allow us testing it with cypress
import store from '../../../src/store/index.ts'
// import flowStore from '../../../src/store/flow/index.ts'

describe('create flows', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/')
  })

  it('creates a valid new empty flow', () => {
    // ######## app is loaded ########
    cy.get('#app').should('exist')
    // cy.window().its('store.state.flow.flows').should('have.length.above', 0)

    cy.get('.cy--create-flow--btn').click()

    // ############ Create flow page ############
    const flowName = 'test flow'
    const interactionTimeout = 1000
    cy.get('.cy--create--btn').click()

    cy.get('.cy--flow-label--editor')
      .find('textarea')
      .type(flowName)

    cy.get('.cy--interaction-timeout--editor')
      .find('input')
      .type(interactionTimeout)

    cy.get('.cy--languages--selector').click()
    cy.contains('.multiselect__option', 'English').click();
  })

})
