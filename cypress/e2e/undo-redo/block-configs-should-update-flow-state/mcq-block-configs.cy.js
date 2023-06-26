describe('Mutate flow state for the case (branching) block', () => {
  const CHOICE_NAME = 'Foo'
  const SECOND_CHOICE_NAME = 'Bar'

  describe('common mcq block configs', () => {
    beforeEach(() => {
      cy.createFlow({
        label: 'mcq block test',
      })

      cy.addBlock(['Select One Response'])

      cy.get('[data-cy="choices-builder"]')
        .find('[data-cy="resource--text"]')
        .last()
        .type(CHOICE_NAME)

      cy.get('[data-cy="choices-builder"]')
        .find('[data-cy="resource--text"]')
        .last()
        .type(SECOND_CHOICE_NAME)
    })

    it('should add choices', () => {
      const getStore = () => cy.window().its('store')
      const flowModuleState = () => getStore().its('state.flow')
      const flowsListState = () => flowModuleState().its('flows')

      const firstBlockState = () => flowsListState().its('[0].blocks[0]')

      firstBlockState().its('config.choices').should('have.length', 2)

      firstBlockState().its('config.choices[0].name').should('eq', CHOICE_NAME)
      firstBlockState().its('config.choices[0].ivr_test.test_expression').should('eq', "block.response = '1'")
      firstBlockState().its('config.choices[0].text_tests[0].test_expression').should('eq', `@block.response = '${CHOICE_NAME}'`)

      firstBlockState().its('config.choices[1].name').should('eq', SECOND_CHOICE_NAME)
      firstBlockState().its('config.choices[1].ivr_test.test_expression').should('eq', "block.response = '2'")
      firstBlockState().its('config.choices[1].text_tests[0].test_expression').should('eq', `@block.response = '${SECOND_CHOICE_NAME}'`)
    })

    it('should remove choices', () => {
      const getStore = () => cy.window().its('store')
      const flowModuleState = () => getStore().its('state.flow')
      const flowsListState = () => flowModuleState().its('flows')

      const firstBlockState = () => flowsListState().its('[0].blocks[0]')

      cy.get('[data-cy="choices-builder"]')
        .find('[data-cy="resource--text"]')
        .eq(1)
        .clear()

      firstBlockState().its('config.choices').should('have.length', 1)
      firstBlockState().its('config.choices[0].name').should('eq', CHOICE_NAME)
    })

    it('should allow to set choice options', () => {
      const getStore = () => cy.window().its('store')
      const flowModuleState = () => getStore().its('state.flow')
      const flowsListState = () => flowModuleState().its('flows')

      const firstBlockState = () => flowsListState().its('[0].blocks[0]')

      cy.get('[data-cy="choices-builder"]')
        .find('[data-cy="set-choice-options"]')
        .click()

      cy.get('[data-cy="choice-mapping-modal"]')
        .as('choiceMappingModal')
        .find('[data-cy="voice-tab"]')
        .should('have.class', 'active')

      const ALT_VOICE_KEY = '3'
      const ALT_EXPRESSION = 'TODAY()'

      cy.get('@choiceMappingModal')
        .find('[data-cy="voice-mapping-entry"]')
        .eq(0)
        .find('select')
        .select(ALT_VOICE_KEY)

      cy.get('@choiceMappingModal')
        .find('[data-cy="voice-mapping-entry"]')
        .eq(1)
        .find('input[type="checkbox"]')
        .check({
          force: true,
        })

      cy.get('@choiceMappingModal')
        .find('[data-cy="voice-mapping-entry"]')
        .eq(1)
        .find('textarea')
        .type(ALT_EXPRESSION)

      firstBlockState().its('config.choices[0].ivr_test.test_expression').should('eq', `block.response = '${ALT_VOICE_KEY}'`)
      firstBlockState().its('config.choices[1].ivr_test.test_expression').should('eq', ALT_EXPRESSION)

      cy.get('@choiceMappingModal')
        .find('[data-cy="text-tab-eng"]')
        .click()

      const SUFFIX = '123'
      const SECOND_CHOICE_ALT = 'Baz'

      cy.get('@choiceMappingModal')
        .find('[data-cy="text-mapping-entry"]')
        .eq(0)
        .find('textarea')
        .first()
        .type(` ${SUFFIX}`)

      cy.get('@choiceMappingModal')
        .find('[data-cy="text-mapping-entry"]')
        .eq(1)
        .find('textarea')
        .last()
        .type(SECOND_CHOICE_ALT)

      firstBlockState().its('config.choices[0].text_tests[0].test_expression').should('eq', `@block.response = \'${CHOICE_NAME} ${SUFFIX}\'`)

      firstBlockState().its('config.choices[1].text_tests[0].test_expression').should('eq', `@block.response = '${SECOND_CHOICE_NAME}'`)
      firstBlockState().its('config.choices[1].text_tests[1].test_expression').should('eq', `@block.response = '${SECOND_CHOICE_ALT}'`)
    })

    it('should allow switching to standard mode', () => {
      const getStore = () => cy.window().its('store')
      const flowModuleState = () => getStore().its('state.flow')
      const flowsListState = () => flowModuleState().its('flows')

      const firstBlockState = () => flowsListState().its('[0].blocks[0]')

      firstBlockState().its('vendor_metadata.floip.ui_metadata.branching_type').should('equal', 'EXIT_PER_CHOICE')

      firstBlockState().its('exits').should('have.length', 3)
      firstBlockState().its('exits[0].name').should('eq', CHOICE_NAME)
      firstBlockState().its('exits[1].name').should('eq', SECOND_CHOICE_NAME)
      firstBlockState().its('exits[2].name').should('eq', 'Default')

      cy.get('[data-cy="output-branching--unified--btn"]').click()

      firstBlockState().its('vendor_metadata.floip.ui_metadata.branching_type').should('equal', 'UNIFIED')

      firstBlockState().its('exits').should('have.length', 2)
      firstBlockState().its('exits[0].name').should('eq', '1')
      firstBlockState().its('exits[1].name').should('eq', 'Default')
    })
  })

  it('should allow choosing min/max number of choices', () => {
    cy.createFlow({
      label: 'mcq block test',
    })

    cy.addBlock(['Select Many Responses'])

    const MINIMUM_CHOICES = 2
    const MAXIMUM_CHOICES = 5

    cy.get('[data-cy="minimum-choices-editor"]')
      .type(MINIMUM_CHOICES)

    cy.get('[data-cy="maximum-choices-editor"]')
      .type(MAXIMUM_CHOICES)

    const getStore = () => cy.window().its('store')
    const flowModuleState = () => getStore().its('state.flow')
    const flowsListState = () => flowModuleState().its('flows')

    const firstBlockState = () => flowsListState().its('[0].blocks[0]')

    firstBlockState().its('config.minimum_choices').should('eq', MINIMUM_CHOICES)
    firstBlockState().its('config.maximum_choices').should('eq', MAXIMUM_CHOICES)
  })
})
