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

import { difference } from 'lodash'
import { UNDO_REDO_SNAPSHOT_DEBOUNCE_MS } from '../../src/lib/plugins/vuex-undo-redo-plugin'

const UNDO_REDO_WAIT_MS = UNDO_REDO_SNAPSHOT_DEBOUNCE_MS * 2

declare global {
  namespace Cypress {
    interface Chainable {
      // custom commands
      createFlow(options: Partial<ICreateFlowOptions>): Chainable<void>,
      getBlockUuids(): Chainable<string[]>,
      addBlock(menuChoices: string[]): Chainable<string>,
      selectBlock(uuid: string): Chainable<string>,
      undo(): Chainable<void>,
      redo(): Chainable<void>,
      save(): Chainable<void>,

      /**
       * Custom command to drag-n-drop an element
       * @example cy.get('.element-to-drag').dragAndDropTo('.drop-zone')
       */
      dragAndDropTo(targetSelectorOrAlias: string): Chainable<void>,
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
    cy.contains('.multiselect__option', language).click()
  }

  cy.get('[data-cy="create--btn"]').click()

  // Let the first undo-redo snapshot be taken
  cy.wait(UNDO_REDO_WAIT_MS)
})

Cypress.Commands.add('getBlockUuids', () => {
  const flowsListState = () => cy.window().its('store.state.flow.flows')

  return flowsListState().its('0.blocks').then((blocks) => {
    return cy.wrap(blocks.map((block: any) => block.uuid) as string[])
  })
})

Cypress.Commands.add('addBlock', (menuChoices: string[]) => {
  cy.getBlockUuids().then((before) => {
    // Create all the blocks
    for (const choice of menuChoices) {
      cy.get('[data-cy="blocks--menu"]')
      cy.contains('[data-cy="blocks--menu-item"]', choice).click()

      // Let the block's creation be registered in a snapshot
      cy.wait(UNDO_REDO_WAIT_MS)
    }

    // Double check the blocks were created to insure the return of this custom command would be correct
    cy.getBlockUuids().then((after) => {
      expect(after).to.have.length(before.length + 1)
      const blockUuid = difference(after, before)[0]

      cy.get(`[data-cy="block-id-${blockUuid}"]`)
        .should('exist')

        return cy.wrap(blockUuid)
    })
  })
})

Cypress.Commands.add('selectBlock', (uuid: string) => {
  cy.get(`[data-cy="block--${uuid}"]`)
    .as('block')

  cy.get('@block')
    .find('.block-draggable')
    .click({
      // May be obscured by the block editor
      force: true,
    })

  return cy.get('@block').then((block) => {
    return cy.wrap(block.attr('data-cy')!.replace('block--', ''))
  })
})

Cypress.Commands.add('selectBlockAndCheck', (uuid: string) => {
  cy.get(`[data-cy="block--${uuid}"]`)
    .as('block')

  cy.selectBlock(uuid)
  cy.get('@block')
    .find('[data-cy="block-toolbar--select-block--btn"]')
    .click({
      // May be obscured by the block editor
      force: true,
    })
})

Cypress.Commands.add('duplicateBlock', (uuid: string) => {
  const flowsListState = () => cy.window().its('store.state.flow.flows')

  let beforeDuplicateBlockNumber = 0
  flowsListState().its('0.blocks').then((blocks_1) => {
    beforeDuplicateBlockNumber = blocks_1.length

    cy.get(`[data-cy="block--${uuid}"]`)
      .as('block')

    cy.get('@block')
      .find('[data-cy="block-toolbar--duplicate--btn"]')
      .click({
        // May be obscured by the block editor
        force: true,
      })

    // Double check the blocks were created to insure the return of this custom command would be correct
    flowsListState().its('0.blocks').then((blocks_2) => {
      expect(blocks_2).to.have.length(beforeDuplicateBlockNumber + 1)
      const blockUuid = blocks_2[beforeDuplicateBlockNumber].uuid
      // make sure we see the configuration editor for this block
      cy.get(`[data-cy="block-id-${blockUuid}"]`).should('exist')
      return cy.wrap(blockUuid)
    })
  })
})

Cypress.Commands.add('deleteBlock', (uuid: string) => {
  cy.get(`[data-cy="block--${uuid}"]`)
    .as('block')

  cy.get('@block')
    .find('[data-cy="block-toolbar--delete--btn"]')
    .click({
      // May be obscured by the block editor
      force: true,
    })

  cy.get('@block')
    .find('[data-cy="block-toolbar--confirm-deletion--btn"]')
    .click({
      // May be obscured by the block editor
      force: true,
    })
})

Cypress.Commands.add('duplicateMultipleBlocks', (uuids: string[]) => {
  const flowsListState = () => cy.window().its('store.state.flow.flows')
  let beforeDuplicateBlocksNumber = 0
  flowsListState().its('0.blocks').then((blocks_1) => {
    beforeDuplicateBlocksNumber = blocks_1.length

    let newUuids: string[] = []
    // select and check one by one
    uuids.forEach((uuid) => {
      cy.selectBlockAndCheck(uuid)
    })

    // duplicate with one action
    cy.get('[data-cy="builder-toolbar--duplicate-x-block--btn"]')
      .click({
        // May be obscured by the block editor
        force: true,
      })

    // Double-check the blocks were created to insure the return of this custom command would be correct
    flowsListState().its('0.blocks').then((blocks_2) => {
      expect(blocks_2).to.have.length(beforeDuplicateBlocksNumber + uuids.length)
      // Check all duplicated blocks
      for (let index = beforeDuplicateBlocksNumber; index < beforeDuplicateBlocksNumber + uuids.length; index++) {
        const blockUuid = blocks_2[index].uuid
        newUuids.push(blockUuid)
        // the block on canvas does exist
        cy.get(`[data-cy="block--${blockUuid}"]`).should('exist')
      }

      return cy.wrap(newUuids)
    })
  })
})

Cypress.Commands.add('undo', () => {
  // Wait first, in case we call undo then redo actions too fast
  cy.wait(UNDO_REDO_WAIT_MS)
  cy.get('[data-cy="undo--btn"]')
    .as('undoBtn')
    .should('not.have.attr', 'disabled')

  cy.get('@undoBtn').click({
    // May be covered with a toast
    force: true,
  })
})

Cypress.Commands.add('redo', () => {
  // Wait first, in case we call undo then redo actions too fast
  cy.wait(UNDO_REDO_WAIT_MS)
  cy.get('[data-cy="redo--btn"]')
    .as('redoBtn')
    .should('not.have.attr', 'disabled')

  cy.get('@redoBtn').click({
    // Undoing the creation of the 1st block triggers Flow Details modal
    // May be covered with a toast
    force: true,
  })
})

Cypress.Commands.add('save', () => {
  cy.get('[data-cy="save--btn"]')
    .as('saveBtn')
    .should('not.have.attr', 'disabled')

  cy.get('@saveBtn').click({
    // May be covered with a toast
    force: true,
  })
})

Cypress.Commands.add('dragAndDropTo', {prevSubject: 'element'}, (subject, targetSelectorOrAlias) => {
  cy.wrap(subject).scrollIntoView()
  cy.wrap(subject).should('be.visible')
  cy.get(targetSelectorOrAlias).should('be.visible')

  cy.wrap(subject)
    .realHover()
    .realMouseDown()

  cy.get(targetSelectorOrAlias)
    .realMouseMove(0, 0, {position: 'center'})
    .realMouseUp({position: 'center'})
})
