describe('Mutate flow state for the case (branching) block', () => {
  const EXIT_NAME = 'My Exit'
  const EXIT_EXPRESSION = 'TRUE'

  const DEFAULT_EXIT_NAME = 'Default'
  const DEFAULT_EXIT_EXPRESSION = ''

  beforeEach(() => {
    cy.createFlow({
      label: 'case block test',
    })

    cy.addBlock(['Branching']).as('branchingBlock')

    cy.get('[data-cy="add-exit--btn"]').click()
    cy.get('[data-cy="advanced-exit-name--input"]').type(EXIT_NAME)
    cy.get('[data-cy="advanced-exit-test-expression--input"]').type(EXIT_EXPRESSION)
  })

  it('should add choices', () => {
    const getStore = () => cy.window().its('store')
    const flowModuleState = () => getStore().its('state.flow')
    const flowsListState = () => flowModuleState().its('flows')

    const firstBlockState = () => flowsListState().its('[0].blocks[0]')

    firstBlockState().its('exits').should('have.length', 2)
    firstBlockState().its('exits[0].name').should('eq', EXIT_NAME)
    firstBlockState().its('exits[0].test').should('eq', EXIT_EXPRESSION)

    firstBlockState().its('exits[1].name').should('eq', DEFAULT_EXIT_NAME)
    firstBlockState().its('exits[1].test').should('eq', DEFAULT_EXIT_EXPRESSION)
  })

  it('should remove choices', () => {
    const getStore = () => cy.window().its('store')
    const flowModuleState = () => getStore().its('state.flow')
    const flowsListState = () => flowModuleState().its('flows')

    const firstBlockState = () => flowsListState().its('[0].blocks[0]')

    cy.get('[data-cy="advanced-exit-delete--btn"]').click()

    firstBlockState().its('exits').should('have.length', 1)
    firstBlockState().its('exits[0].name').should('eq', DEFAULT_EXIT_NAME)
    firstBlockState().its('exits[0].test').should('eq', DEFAULT_EXIT_EXPRESSION)
  })
})
