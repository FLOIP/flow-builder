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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

export interface ICreateFlowOptions {
  label: string
  interactionTimeout: number
  languages: string[]
  modes: string[]
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
})
