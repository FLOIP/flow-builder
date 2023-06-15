describe('Undo and Redo', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'Undo-redo test',
    })
  })

  it('undo adding a block', () => {
    cy.addBlock(['Content', 'Message']).then((uuid) => {
      cy.undo()
      cy.get(`[data-cy="block--${uuid}"]`).should('not.exist')
    })
  })

  it('redo adding a block', () => {
    cy.addBlock(['Branching']).then((uuid) => {
      cy.undo()
      cy.redo()
      cy.get(`[data-cy="block--${uuid}"]`).should('exist')
    })
  })
})
