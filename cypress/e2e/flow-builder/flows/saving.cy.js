describe('Saving flows', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'Saving flows test',
    })
  })

  it('is disabled when there are no changes', () => {
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
