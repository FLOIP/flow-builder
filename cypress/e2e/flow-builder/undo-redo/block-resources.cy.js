import { UNDO_REDO_WAIT_MS } from '../../../support/commands'

describe('Block resources', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'Undo-redo block resources test',
    })
  })

  it('should undo/redo content resources', () => {
    const sampleText = 'hello sms'

    cy.addBlock(['Content', 'Message']).then(() => {
      cy.setBlockTextResource('eng', 'sms', sampleText).then((editor) => {
        cy.get(editor)
          .should('have.value', sampleText)

        cy.undo()
        cy.get(editor)
          .should('have.value', '')

        cy.redo()
        cy.get(editor)
          .should('have.value', sampleText)
      })
    })
  })

  it('should undo/redo adding choices', () => {
    const sampleChoice = 'sample choice'

    cy.addBlock(['Content', 'Select One Response']).then(() => {
      cy.get('.choices-builder')
        .as('choicesBuilder')
        .find('textarea')
        .type(sampleChoice)

      cy.wait(UNDO_REDO_WAIT_MS)

      cy.undo()
      cy.get('@choicesBuilder')
        .find('textarea')
        .should('have.value', '')

      cy.redo()
      cy.get('@choicesBuilder')
        .find('textarea')
        .should('have.value', sampleChoice)
    })
  })
})
