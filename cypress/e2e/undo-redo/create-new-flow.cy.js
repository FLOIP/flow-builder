describe('create flows', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/')
  })

  it('creates a valid new empty flow', () => {
    const getStore = () => cy.window().its('store')
    const flowModuleState = () => getStore().its('state.flow')
    const flowsListState = () => flowModuleState().its('flows')

    flowsListState().should('have.length', 0)

    cy.createFlow({
      label: 'This should be a valid empty flow',
      interactionTimeout: 500,
      languages: ['English', 'French'],
    })

    flowModuleState().its('isCreated').should('equal', true)
    flowsListState().its('[0].label').should('equal', 'This should be a valid empty flow')
  })
})
