import {UNDO_REDO_WAIT_MS} from '../../../support/commands'

describe('Block resources', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'Undo-redo test',
    })
  })

  const sampleText = 'hello sms'
  const sampleChoice = 'sample choice'

  it('undo adding a resource', () => {
    cy.addBlock(['Content', 'Message']).then(() => {
      cy.setBlockText('eng', 'sms', sampleText).then((editor) => {
        cy.get(editor)
          .should('have.value', sampleText)
        cy.undo()
        cy.get(editor)
          .should('have.value', '')
      })
    })
  })

  it('redo adding a resource', () => {
    cy.addBlock(['Content', 'Message']).then(() => {
      cy.setBlockText('eng', 'sms', sampleText).then((editor) => {
        cy.undo()
        cy.redo()
        cy.get(editor)
          .should('have.value', sampleText)
      })
    })
  })

  it('should undo adding choices', () => {
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
    })
  })

  it('should redo adding choices', () => {
    cy.addBlock(['Content', 'Select One Response']).then(() => {
      cy.get('.choices-builder')
        .as('choicesBuilder')
        .find('textarea')
        .type(sampleChoice)

      cy.wait(UNDO_REDO_WAIT_MS)

      cy.undo()
      cy.redo()

      cy.get('@choicesBuilder')
        .find('textarea')
        .should('have.value', sampleChoice)
    })
  })
})
