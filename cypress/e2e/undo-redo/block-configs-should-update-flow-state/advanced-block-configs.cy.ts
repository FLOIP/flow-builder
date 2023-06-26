describe('mutate flow state for ADVANCED blocks', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'testing Advanced blocks',
    })
  })

  it('should validate Log block', () => {
    const blockConfigs = {
      logMessageOrExpression: 'Hello',
    }

    cy.addBlock(['Log'])

    firstBlockState().its('config.message').should('eq', '')

    cy.get('[data-cy="log-message--input"]')
      .find('textarea')
      .type(blockConfigs.logMessageOrExpression)

    firstBlockState().its('config.message').should('eq', blockConfigs.logMessageOrExpression)
  })

  it('should validate Output block', () => {
    const blockConfigs = {
      outputExpression: 'contact.phone',
    }

    cy.addBlock(['Output'])

    firstBlockState().its('config.value').should('eq', '@')

    cy.get('[data-cy="output-expression--input"]')
      .find('textarea')
      .type(blockConfigs.outputExpression)

    firstBlockState().its('config.value').should('eq', '@'.concat(blockConfigs.outputExpression))
  })

  it('should validate Run Flow block', () => {
    const blockConfigs = {
      flowId: '0c767ec7-1bd7-4f99-8ce1-7807c28ac8c7',
    }
    cy.addBlock(['Run Flow'])

    firstBlockState().its('config.flow_id').should('eq', '')

    cy.get('[data-cy="destination-flow-id--input"]')
      .find('textarea')
      .type(blockConfigs.flowId)

    firstBlockState().its('config.flow_id').should('eq', blockConfigs.flowId)
  })
})

const getStore = () => cy.window().its('store')
const flowModuleState = () => getStore().its('state.flow')
const flowsListState = () => flowModuleState().its('flows')
const firstBlockState = () => flowsListState().its('[0].blocks[0]')
