describe('undo-redo', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'undo-redo test',
    })
  })

  it('undo block creation', () => {
    cy.addBlock(['Content', 'Message']).then((uuid) => {
      cy.wait(1000)
      cy.undo()
      cy.get(`[data-cy="block--${uuid}"]`).should('not.exist')
    })
  })

  it('redo block creation', () => {
    cy.addBlock(['Branching']).then((uuid) => {
      cy.wait(1000)
      cy.undo()

      cy.wait(1000)
      cy.redo()

      cy.get(`[data-cy="block--${uuid}"]`).should('exist')
    })
  })
})
