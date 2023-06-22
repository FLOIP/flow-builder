import {IBlock} from '@floip/flow-runner'
import Chainable = Cypress.Chainable

describe('Moving a block', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'Moving a block',
    })

    cy.addBlock(['Content', 'Message']).then(blockId => {
      cy.get(`[data-cy="block--${blockId}"]`)
        .find('[data-cy^="block-handle--"]')
        .as('blockArea')
    })

    // wait for flow validation to succeed and flow validation toolbar to disappear
    // to avoid interference with block coordinates
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200)
  })

  it('moves the block', () => {
    const deltaX = 200
    const deltaY = 300

    // eslint-disable-next-line arrow-body-style
    return getBlockVisualCoordinates().then(({x: oldVisualX, y: oldVisualY}) => {
      return getBlockMetadataCoordinates().then(({x: oldMetadataX, y: oldMetadataY}) => {
        cy.get('@blockArea').move({deltaX, deltaY})

        // eslint-disable-next-line arrow-body-style
        return getBlockVisualCoordinates().then(({x: newVisualX, y: newVisualY}) => {
          return getBlockMetadataCoordinates().then(({x: newMetadataX, y: newMetadataY}) => {
            cy.log('old visual x,y:', oldVisualX, oldVisualY)
            cy.log('new visual x,y:', newVisualX, newVisualY)

            cy.wrap(newVisualX - oldVisualX).should('eq', deltaX)
            cy.wrap(newVisualY - oldVisualY).should('eq', deltaY)

            cy.log('old metadata x,y:', oldMetadataX, oldMetadataY)
            cy.log('new metadata x,y:', newMetadataX, newMetadataY)

            cy.wrap(newMetadataX - oldMetadataX).should('eq', deltaX)
            cy.wrap(newMetadataY - oldMetadataY).should('eq', deltaY)
          })
        })
      })
    })
  })
})

function getBlockVisualCoordinates(): Chainable<{x: number, y: number}> {
  return cy.get('[data-cy="builder-canvas--page"]').then(canvasEl => {
    const {left: leftSidebarWidth, top: topToolbarHeight} = canvasEl[0].getBoundingClientRect()

    return cy.get('@blockArea').then(block => {
      const {left, top} = block[0].getBoundingClientRect()

      const x = left - leftSidebarWidth
      const y = top - topToolbarHeight

      return {x, y}
    })
  })
}

function getBlockMetadataCoordinates(): Chainable<{x: number, y: number}> {
  return cy.window()
    .its('store.state.flow.flows[0].blocks[0]')
    .then((oldState: IBlock) => {
      const {x, y} = oldState.ui_metadata!.canvas_coordinates!
      return {x, y}
    })
}
