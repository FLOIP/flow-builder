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

  it('should validate setGroupMembership', () => {
    const blockConfigs = {
      group: {
        key: '12',
        name: 'my group 1',
      },
    }
    const getStore = () => cy.window().its('store')
    const flowModuleState = () => getStore().its('state.flow')
    const flowsListState = () => flowModuleState().its('flows')

    cy.addBlock(['Set Group Membership']).as('setGroupMembershipBlock')
    const firstBlockState = () => flowsListState().its('[0].blocks[0]')

    // ####### Group membership
    firstBlockState().its('config.clear').should('eq', false)
    firstBlockState().its('config.groups').should('have.length', 0)
    firstBlockState().its('config.is_member').should('eq', true)

    // Clear from all groups
    cy.get('[data-cy="clearGroup--radio"]').check({force: true})
    firstBlockState().its('config.clear').should('eq', true)

    // Remove from selected groups
    cy.get('[data-cy="removeGroup--radio"]').check({force: true})
    firstBlockState().its('config.clear').should('eq', false)
    firstBlockState().its('config.is_member').should('eq', false)

    cy.get('[data-cy="group-membership--selector"]').click()
    cy.contains('.multiselect__option', blockConfigs.group.name).click()
    firstBlockState().its('config.groups.[0].group_key').should('eq', blockConfigs.group.key)
    firstBlockState().its('config.groups.[0].group_name').should('eq', blockConfigs.group.name)

    // Add to selected groups
    cy.get('[data-cy="addGroup--radio"]').check({force: true})
    firstBlockState().its('config.is_member').should('eq', true)
    // no need to test the select component again
  })
})
