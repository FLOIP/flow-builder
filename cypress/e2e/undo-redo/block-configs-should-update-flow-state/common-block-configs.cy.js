describe('mutate flow state when the update comes from common block configs UI', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'adding blocks test',
    })
  })

  it('should validate non interactive blocks', () => {
    const blockConfigs = {
      label: 'my block',
      name: {
        beforeEdit: 'my_block',
        afterEditPostFix: '_updated',
      },
      resources: {
        ivr: ' 02_flowers_for_albert.mp3',
        sms: 'content for sms',
        ussd: 'content for ussd',
      },
      exits: [
        {
          name: 'banana',
          expression: '@block.value = "banana"',
        }
      ],
      tags: [
        {
          name: 'my tag 1',
        }
      ]
    }
    const getStore = () => cy.window().its('store')
    const flowModuleState = () => getStore().its('state.flow')
    const flowsListState = () => flowModuleState().its('flows')

    cy.addBlock(['Message'])
    const firstBlockState = () => flowsListState().its('[0].blocks[0]')
    const firstResourcesState = () => flowsListState().its('[0].resources[0]')

    // ####### Block label & name
    cy.get('[data-cy="label--editor"]')
      .find('textarea')
      .type(blockConfigs.label)
    firstBlockState().its('label').should('equal', blockConfigs.label)
    firstBlockState().its('name').should('equal', blockConfigs.name.beforeEdit)
    cy.get('[data-cy="name-editor--edit-btn"]').click()
    cy.get('[data-cy="name-editor--input"]')
      .type(blockConfigs.name.afterEditPostFix)
    cy.get('[data-cy="name-editor--save-btn"]').click()
    firstBlockState().its('name')
      .should('equal', `${blockConfigs.name.beforeEdit}${blockConfigs.name.afterEditPostFix}`)

    // ####### Resource UIs
    cy.get('[data-cy="audio-library-search--btn"]').click()
    cy.contains('.dropdown-item', blockConfigs.resources.ivr).click()

    cy.get('[data-cy="SMS-resource-variant-text--editor"]')
      .find('textarea')
      .type(blockConfigs.resources.sms)

    cy.get('[data-cy="USSD-resource-variant-text--editor"]')
      .find('textarea')
      .type(blockConfigs.resources.ussd)
    firstResourcesState().its('values').should((values) => {
      expect(values).to.have.length(3)
      // the order follows how we set the flow modes from createFlow() command
      expect(values[0].value).to.equal(blockConfigs.resources.sms)
      expect(values[1].value).to.equal(blockConfigs.resources.ussd)
      expect(values[2].value).to.contains('.mp3')
    })

    // ########### Output branching #################
    firstBlockState().its('exits').should('have.length', 1) // default exit for Message block
    // ######### 1. ADVANCED branching #####
    cy.get('[data-cy="output-branching--advanced--btn"]').click()
    firstBlockState().its('vendor_metadata.floip.ui_metadata.branching_type').should('equal', 'ADVANCED')

    cy.get('[data-cy="add-exit--btn"]').click()
    firstBlockState().its('exits').should('have.length', 2)

    cy.get('[data-cy="advanced-exit-name--input"]')
      .type(blockConfigs.exits[0].name)
    cy.get('[data-cy="advanced-exit-test-expression--input"]')
      .find('textarea')
      .type(blockConfigs.exits[0].expression)
    // new exits are put at the index 0
    firstBlockState().its('exits.[0].name').should('eq', blockConfigs.exits[0].name)
    firstBlockState().its('exits.[0].test').should('eq', blockConfigs.exits[0].expression)

    cy.get('[data-cy="advanced-exit-delete--btn"]').click()
    firstBlockState().its('exits').should('have.length', 1)

    // ######### 2. UNIFIED branching #####
    cy.get('[data-cy="output-branching--unified--btn"]').click()
    firstBlockState().its('vendor_metadata.floip.ui_metadata.branching_type').should('equal', 'UNIFIED')

    // ###### Tags ######
    firstBlockState().its('tags').should('have.length', 0)
    cy.get('[data-cy="tag--selector"]').as('tagSelector').click()
    cy.get('@tagSelector')
      .find('input')
      .type(blockConfigs.tags[0].name)
    cy.get('@tagSelector').contains('.multiselect__option', blockConfigs.tags[0].name).click()
    firstBlockState().its('tags').should('have.length', 1)
    firstBlockState().its('tags.[0]').should('eq', blockConfigs.tags[0].name)
  })

  it('should validate interactive blocks', () => {
    const blockConfigs = {
      contactProperties: [
        {
          key: 'age',
          name: 'Age (number)',
          value: '@contact.age',
        }
      ]
    }
    const getStore = () => cy.window().its('store')
    const flowModuleState = () => getStore().its('state.flow')
    const flowsListState = () => flowModuleState().its('flows')

    const firstBlockState = () => flowsListState().its('[0].blocks[0]')

    cy.addBlock(['Content', 'Numeric Response'])

    // ####### Contact properties
    cy.get('[data-cy="set-contact-property--checkbox"]').check({force: true})
    firstBlockState().its('config.set_contact_property.[0].property_key').should('eq', '')
    firstBlockState().its('config.set_contact_property.[0].property_value').should('eq', '')
    cy.get('[data-cy="contact-property--selector"]').as('contactPropertySelector').click()
    cy.get('@contactPropertySelector')
      .contains('.multiselect__option', blockConfigs.contactProperties[0].name).click()
    firstBlockState().its('config.set_contact_property.[0].property_key').should('eq', blockConfigs.contactProperties[0].key)
    cy.get('[data-cy="contact-property--expression-input"]')
      .type(blockConfigs.contactProperties[0].value)
    firstBlockState().its('config.set_contact_property.[0].property_value').should('eq', blockConfigs.contactProperties[0].value)
    cy.get('[data-cy="set-contact-property--from-current-block-response"]')
      .check({force: true})
    firstBlockState().its('config.set_contact_property.[0].property_value').should('eq', '@block.value')
  })
})
