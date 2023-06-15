describe('saving a flow', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'saving flows test',
    })
  })

  it('should be disabled when there are no changes', () => {
    cy.get('[data-cy="save--btn"]').should('be.disabled')
  })

  it('is working when there are changes', () => {
    cy.addBlock(['Content', 'Message'])
    cy.get('[data-cy="save--btn"]')
      .should('not.be.disabled')
      .click()
    cy.get('[data-cy="save--btn"]').should('be.disabled')
  })
})
