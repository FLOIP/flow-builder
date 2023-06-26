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

    getBlockVisualCoordinates().then(({x: oldVisualX, y: oldVisualY}) => {
      getBlockMetadataCoordinates().then(({x: oldMetadataX, y: oldMetadataY}) => {
        cy.get('@blockArea').move({deltaX, deltaY})

        getBlockVisualCoordinates().then(({x: newVisualX, y: newVisualY}) => {
          getBlockMetadataCoordinates().then(({x: newMetadataX, y: newMetadataY}) => {
            cy.log('old visual x,y:', oldVisualX, oldVisualY)
            cy.log('new visual x,y:', newVisualX, newVisualY)

            cy.wrap(newVisualX - oldVisualX).should('eq', deltaX)
            cy.wrap(newVisualY - oldVisualY).should('eq', deltaY)

            cy.log('old metadata x,y:', oldMetadataX, oldMetadataY)
            cy.log('new metadata x,y:', newMetadataX, newMetadataY)

            cy.wrap(newMetadataX - oldMetadataX).should('eq', deltaX)
            cy.wrap(newMetadataY - oldMetadataY).should('eq', deltaY)

            cy.undo()

            getBlockVisualCoordinates().then(({x: undoneVisualX, y: undoneVisualY}) => {
              getBlockMetadataCoordinates().then(({x: undoneMetadataX, y: undoneMetadataY}) => {
                cy.wrap(undoneVisualX).should('eq', oldVisualX)
                cy.wrap(undoneVisualY).should('eq', oldVisualY)
                cy.wrap(undoneMetadataX).should('eq', oldMetadataX)
                cy.wrap(undoneMetadataY).should('eq', oldMetadataY)

                cy.redo()

                getBlockVisualCoordinates().then(({x: redoneVisualX, y: redoneVisualY}) => {
                  getBlockMetadataCoordinates().then(({x: redoneMetadataX, y: redoneMetadataY}) => {
                    cy.wrap(redoneVisualX).should('eq', newVisualX)
                    cy.wrap(redoneVisualY).should('eq', newVisualY)
                    cy.wrap(redoneMetadataX).should('eq', newMetadataX)
                    cy.wrap(redoneMetadataY).should('eq', newMetadataY)
                  })
                })
              })
            })
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
    .then((blockState: IBlock) => {
      const {x, y} = blockState.ui_metadata!.canvas_coordinates!
      return {x, y}
    })
}
