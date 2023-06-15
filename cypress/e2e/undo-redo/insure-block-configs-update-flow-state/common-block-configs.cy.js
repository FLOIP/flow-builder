/**
 * In general, e2e should focus on what are VISIBLE from users perspective.
 * But, as we have a bunch of configs to test, we can assume that:
 * - if a block config UI updates the flow state, it should work with the UNDO/REDO feature
 *
 * Secondly, a working config UI doesn't mean the component is working with UNDO/REDO, it has to mutate the flow state and not use local state.
 */
describe('create flows', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'adding blocks test',
    })
  })

  it('should mutate flow state when the update comes from common block configs UI', () => {
    const blockConfigs = {
      label: 'my block',
      name: 'my_block',
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
      ]
    }
    const getStore = () => cy.window().its('store')
    const flowModuleState = () => getStore().its('state.flow')
    const flowsListState = () => flowModuleState().its('flows')

    cy.addBlock(['Content', 'Message'])
    const firstBlockState = () => flowsListState().its('[0].blocks[0]')
    const firstResourcesState = () => flowsListState().its('[0].resources[0]')

    // Block label & name
    cy.get('[data-cy="label--editor"]')
      .find('textarea')
      .type(String(blockConfigs.label))
    firstBlockState().its('label').should('equal', blockConfigs.label)
    firstBlockState().its('name').should('equal', blockConfigs.name)

    // Resource UIs
    cy.get('[data-cy="audio-library-search--btn"]').click()
    cy.contains('.dropdown-item', blockConfigs.resources.ivr).click()

    cy.get('[data-cy="SMS-resource-variant-text--editor"]')
      .find('textarea')
      .type(String(blockConfigs.resources.sms))

    cy.get('[data-cy="USSD-resource-variant-text--editor"]')
      .find('textarea')
      .type(String(blockConfigs.resources.ussd))
    firstResourcesState().its('values').should((values) => {
      console.debug('test rs', values)
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
      .type(String(blockConfigs.exits[0].name))
    cy.get('[data-cy="advanced-exit-test-expression--input"]')
      .find('textarea')
      .type(String(blockConfigs.exits[0].expression))
    // new exits are put at the index 0
    firstBlockState().its('exits.[0].name').should('eq', blockConfigs.exits[0].name)
    firstBlockState().its('exits.[0].test').should('eq', blockConfigs.exits[0].expression)

    cy.get('[data-cy="advanced-exit-delete--btn"]').click()
    firstBlockState().its('exits').should('have.length', 1)

    // ######### 2. UNIFIED branching #####
    cy.get('[data-cy="output-branching--unified--btn"]').click()
    firstBlockState().its('vendor_metadata.floip.ui_metadata.branching_type').should('equal', 'UNIFIED')
  })
})
