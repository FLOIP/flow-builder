describe('create flows', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/')
  })

  it('creates a valid new empty flow', () => {
    // ######## app is loaded ########
    cy.get('#app').should('exist')
    const getStore = () => cy.window().its('store')
    const flowModuleState = () => getStore().its('state.flow')
    const flowsListState = () => flowModuleState().its('flows')
    flowsListState().should('have.length', 0)
    cy.get('[data-cy="create-flow--btn"]').click()

    // ############ Create flow page ############
    const flowName = 'test flow'
    const interactionTimeout = 1000
    cy.get('[data-cy="create--btn"]').click()

    cy.get('[data-cy="flow-label--editor"]')
      .find('textarea')
      .type(flowName)

    cy.get('[data-cy="interaction-timeout--editor"]')
      .find('input')
      .type(interactionTimeout)

    cy.get('[data-cy="languages--selector"]').click()
    cy.contains('.multiselect__option', 'English').click();

    flowModuleState().its('isCreated').should('equal', false)
    flowsListState().its('[0].label').should('equal', flowName)

    cy.get('[data-cy="create--btn"]').click()
    flowModuleState().its('isCreated').should('equal', true)
  })

})
