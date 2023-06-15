it('Creating a flow', () => {
  const sampleFlowTitle = 'Creating a new flow test'

  cy.createFlow({
    label: sampleFlowTitle,
    interactionTimeout: 500,
    languages: ['English', 'French'],
  })

  const getStore = () => cy.window().its('store')
  const flowModuleState = () => getStore().its('state.flow')
  const flowsListState = () => flowModuleState().its('flows')

  flowModuleState().its('isCreated').should('equal', true)
  flowsListState().its('[0].label').should('equal', sampleFlowTitle)
})
