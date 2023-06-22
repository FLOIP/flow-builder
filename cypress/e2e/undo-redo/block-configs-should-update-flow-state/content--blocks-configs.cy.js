describe('mutate flow state for CONTENT blocks', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'adding blocks test',
    })
  })

  it('should validate setContactProperty', () => {
    const blockConfigs = {
      contactProperty: {
        key: 'age',
        expression: '@block.value',
      },
    }
    const getStore = () => cy.window().its('store')
    const flowModuleState = () => getStore().its('state.flow')
    const flowsListState = () => flowModuleState().its('flows')

    cy.addBlock(['Set Contact Property']).as('setContactPropertyBlock')
    const firstBlockState = () => flowsListState().its('[0].blocks[0]')
    const firstResourcesState = () => flowsListState().its('[0].resources[0]')

    // ####### Contact properties
    // Clear contact property
    cy.get('[data-cy="clear-contact-property--radio"]').check({force: true})
    firstBlockState().its('config.set_contact_property.[0].property_key').should('eq', null)
    firstBlockState().its('config.set_contact_property.[0].property_value').should('eq', '@(null)')

    cy.get('[data-cy="contact-property-key--input"]')
      .find('textarea')
      .type(blockConfigs.contactProperty.key)
    firstBlockState().its('config.set_contact_property.[0].property_key')
      .should('eq', blockConfigs.contactProperty.key)

    // Set contact property
    cy.get('[data-cy="set-contact-property--radio"]').check({force: true})
    firstBlockState().its('config.set_contact_property.[0].property_key').should('eq', blockConfigs.contactProperty.key)
    firstBlockState().its('config.set_contact_property.[0].property_value').should('eq', '')

    cy.get('[data-cy="contact-property-value--expression-input"]')
      .find('textarea')
      .type(blockConfigs.contactProperty.expression)
    firstBlockState().its('config.set_contact_property.[0].property_value')
      .should('eq', blockConfigs.contactProperty.expression)
  })
})
