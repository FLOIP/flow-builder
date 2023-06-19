describe('Block resources', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'Undo-redo test',
    })
  })

  it('undo adding a resource', () => {
    cy.addBlock(['Content', 'Message']).then((uuid) => {
      const sampleText = 'hello sms'

      cy.setBlockText(uuid, 'eng', 'sms', sampleText).then((editor) => {
        cy.get(editor)
          .should('have.value', sampleText)
        cy.undo()
        cy.get(editor)
          .should('have.value', '')
      })
    })
  })

  it('redo adding a resource', () => {
    cy.addBlock(['Content', 'Message']).then((uuid) => {
      const sampleText = 'hello sms'

      cy.setBlockText(uuid, 'eng', 'sms', sampleText).then((editor) => {
        cy.undo()
        cy.redo()
        cy.get(editor)
          .should('have.value', sampleText)
      })
    })
  })
})
