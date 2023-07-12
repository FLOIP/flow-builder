describe('mutate flow state for CONTENT blocks', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'adding blocks test',
    })
  })

  it('should validate Location Response Block', () => {
    const blockConfigs = {
      accuracy: {
        threshold: 25,
        timeout: 134
      },
    }
    const getStore = () => cy.window().its('store')
    const flowModuleState = () => getStore().its('state.flow')
    const flowsListState = () => flowModuleState().its('flows')

    cy.addBlock(['Location Response'])
    const firstBlockState = () => flowsListState().its('[0].blocks[0]')

    cy.get('[data-cy="accuracy-threshold--editor"]')
      .find('input')
      .clear()
      .type(blockConfigs.accuracy.threshold)
    firstBlockState().its('config.accuracy_threshold_meters').should('equal', blockConfigs.accuracy.threshold)

    cy.get('[data-cy="accuracy-timeout--editor"]')
      .find('input')
      .clear()
      .type(blockConfigs.accuracy.timeout)
    firstBlockState().its('config.accuracy_timeout_seconds').should('eq', blockConfigs.accuracy.timeout)
  })

  it('should validate Numeric Response Block', () => {
    const blockConfigs = {
      minimum: 13,
      maximum: 950,
      maxiDigit: 4
    }
    const getStore = () => cy.window().its('store')
    const flowModuleState = () => getStore().its('state.flow')
    const flowsListState = () => flowModuleState().its('flows')

    cy.addBlock(['Numeric Response'])
    const firstBlockState = () => flowsListState().its('[0].blocks[0]')

    // ######## Num values
    cy.get('[data-cy="minimum-numeric--editor"]')
      .find('input')
      .clear()
      .type(blockConfigs.minimum)
    firstBlockState().its('config.validation_minimum').should('equal', blockConfigs.minimum)

    cy.get('[data-cy="maximum-numeric--editor"]')
      .find('input')
      .clear()
      .type(blockConfigs.maximum)
    firstBlockState().its('config.validation_maximum').should('equal', blockConfigs.maximum)

    cy.get('[data-cy="max-digit--editor"]')
      .find('input')
      .clear()
      .type(blockConfigs.maxiDigit)
  })

  it('should validate Open Response Block', () => {
    const blockConfigs = {
      maxDuration: 15,
      endRecordingKey: '3'
    }
    const getStore = () => cy.window().its('store')
    const flowModuleState = () => getStore().its('state.flow')
    const flowsListState = () => flowModuleState().its('flows')

    cy.addBlock(['Open Response'])
    const firstBlockState = () => flowsListState().its('[0].blocks[0]')

    cy.get('[data-cy="max-duration--input"]')
      .find('input')
      .clear()
      .type(blockConfigs.maxDuration)
    firstBlockState().its('config.ivr.max_duration_seconds').should('equal', blockConfigs.maxDuration)

    cy.get('[data-cy="end-recording-digit--selector"]').as('digitSelector').click()
      .type(blockConfigs.endRecordingKey)
    cy.get('@digitSelector').contains('.multiselect__option', blockConfigs.endRecordingKey).click()
    firstBlockState().its('config.ivr.end_recording_digits').should('eq', blockConfigs.endRecordingKey)
  })
})
