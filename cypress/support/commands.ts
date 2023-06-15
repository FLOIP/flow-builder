/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { UNDO_REDO_SNAPSHOT_DEBOUNCE_MS } from '../../src/lib/plugins/vuex-undo-redo-plugin'

const UNDO_REDO_WAIT_MS = UNDO_REDO_SNAPSHOT_DEBOUNCE_MS * 2

declare global {
  namespace Cypress {
    interface Chainable {
      // custom commands
      createFlow(options: Partial<ICreateFlowOptions>): Chainable<void>,
      addBlock(menuChoices: string[]): Chainable<string>,
      selectBlock(uuid: string): Chainable<string>,
      undo(): Chainable<void>,
      redo(): Chainable<void>,
      save(): Chainable<void>,
      // connectExitToBlock(exitUuid: string, targetBlockUuid: string): Chainable<void>,
      // dragBlock(blockUuid: string): Chainable<void>,
    }
  }
}

export interface ICreateFlowOptions {
  label: string,
  interactionTimeout: number,
  languages: string[],
  modes: string[],
}

Cypress.Commands.add('createFlow', (options: Partial<ICreateFlowOptions>) => {
  const optionsWithDefaults: ICreateFlowOptions = {
    label: 'Test flow',
    interactionTimeout: 1000,
    languages: ['English'],
    modes: ['IVR', 'SMS', 'USSD'],
    ...options,
  }

  cy.visit('http://localhost:8081')

  cy.get('#app').should('exist')
  cy.get('[data-cy="create-flow--btn"]').click()

  cy.get('[data-cy="create--btn"]').click()

  cy.get('[data-cy="flow-label--editor"]')
    .find('textarea')
    .type(optionsWithDefaults.label)

  cy.get('[data-cy="interaction-timeout--editor"]')
    .find('input')
    .type(String(optionsWithDefaults.interactionTimeout))

  for (const language of optionsWithDefaults.languages) {
    cy.get('[data-cy="languages--selector"]').click()
    cy.contains('.multiselect__option', language).click();
  }

  cy.get('[data-cy="create--btn"]').click()

  // Let the first undo-redo snapshot be taken
  cy.wait(UNDO_REDO_WAIT_MS)
})

Cypress.Commands.add('addBlock', (menuChoices: string[]) => {
  for (const choice of menuChoices) {
    cy.get('[data-cy="blocks--menu"]')
    cy.contains('[data-cy="blocks--menu-item"]', choice).click()

    // Let the block's creation be registered in a snapshot
    cy.wait(UNDO_REDO_WAIT_MS)
  }

  // This relies on appending new blocks to the DOM, unsure how fragile this may be
  return cy.get('[data-cy^="block--"]').last().then((block) => {
    return cy.wrap(block.attr('data-cy')!.replace('block--', ''))
  })
})

Cypress.Commands.add('selectBlock', (uuid: string) => {
  cy.get(`[data-cy="block--${uuid}"] .block-draggable`)
    .scrollIntoView()
    .click()

  return cy.get(`[data-cy="block--${uuid}"]`).then((block) => {
    return cy.wrap(block.attr('data-cy')!.replace('block--', ''))
  })
})

Cypress.Commands.add('undo', () => {
  cy.get('[data-cy="undo--btn"]')
    .as('undoBtn')
    .should('not.have.attr', 'disabled')

  cy.get('@undoBtn').click()
})

Cypress.Commands.add('redo', () => {
  cy.get('[data-cy="redo--btn"]')
    .as('redoBtn')
    .should('not.have.attr', 'disabled')

  cy.get('@redoBtn').click({
    // Undoing the creation of the 1st block triggers Flow Details modal
    force: true,
  })
})

Cypress.Commands.add('save', () => {
  cy.get('[data-cy="save--btn"]')
    .should('not.have.attr', 'disabled')
    .click()
})
