describe('Deep linking on block config & flow config', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'my test flow',
    })
  })

  it('can undo/redo block config & flow config with deep linking remains working', () => {
    // #### Add a block
    cy.addBlock(['Content', 'Message']).then((messageBlockUuid) => {
      // ######## add 1st block
      // block on canvas
      cy.get(`[data-cy="block--${messageBlockUuid}"]`).should('exist')
      // block id on block config
      cy.get(`[data-cy="block-id-${messageBlockUuid}"]`).should('exist')

      // ######## Update flow config
      cy.get(`[data-cy="builder-toolbar--flow-details--btn"`)
        .click()
      cy.get(`[data-cy="flow-label--editor`)
        .find('textarea')
        .type(' - updated')

      cy.get(`[data-cy="flow-editor--modal--close-btn"`).click()

      // ######### add 2nd block
      cy.addBlock(['Content', 'Numeric Response']).then((numericBlockUuid) => {
        // block on canvas
        cy.get(`[data-cy="block--${numericBlockUuid}"]`).should('exist')
        // block id on block config
        cy.get(`[data-cy="block-id-${numericBlockUuid}"]`).should('exist')

        cy.undo()
        cy.get(`[data-cy="flow-editor"]`).should('be.visible')
        cy.get(`[data-cy="flow-editor--modal--close-btn"`).click()

        cy.undo()
        cy.get(`[data-cy="block-id-${messageBlockUuid}"]`).should('exist')

        cy.redo()
        cy.get(`[data-cy="flow-editor"]`).should('be.visible')
        cy.get(`[data-cy="flow-editor--modal--close-btn"`).click()

        cy.redo()
        cy.get(`[data-cy="block-id-${numericBlockUuid}"]`).should('exist')
      })
    })
  })
})
