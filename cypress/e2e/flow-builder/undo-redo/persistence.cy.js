describe('Persistence', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'Undo-redo test',
    })
  })

  it('does not produce a snapshot when saving a flow', () => {
    // The undo history is empty
    cy.get('[data-cy="undo--btn"]')
      .should('have.attr', 'disabled')

    cy.addBlock(['Message']).then(() => {
      cy.save()
      cy.get('[data-cy="save--btn"]').should('have.attr', 'disabled')

      // Has one snapshot
      cy.undo()
      cy.get('[data-cy="undo--btn"]').should('have.attr', 'disabled')
    })
  })
})
