describe('Actions on blocks', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'my test flow',
    })
  })

  it('can undo/redo adding a block', () => {
    // #### Add a block
    let messageBlockUuid = null
    cy.addBlock(['Message']).then((blockUuid) => {
      messageBlockUuid = blockUuid
      cy.get(`[data-cy="block--${blockUuid}"]`).should('exist')
      cy.undo()
      cy.get(`[data-cy="block--${blockUuid}"]`).should('not.exist')
      cy.redo()
      cy.get(`[data-cy="block--${blockUuid}"]`).should('exist')
    })
  })

  it('can undo/redo deleting the first block', () => {
    cy.addBlock(['Content', 'Message']).then((blockUuid) => {
      cy.get(`[data-cy="block--${blockUuid}"]`).should('exist')

      cy.deleteBlock(blockUuid)
      cy.get(`[data-cy="block--${blockUuid}"]`).should('not.exist')

      cy.undo()
      cy.get(`[data-cy="block--${blockUuid}"]`).should('exist')

      cy.redo()
      cy.get(`[data-cy="block--${blockUuid}"]`).should('not.exist')
    })
  })

  it('can undo/redo deleting the last block', () => {
    cy.addBlock(['Content', 'Message']).then((blockUuid) => {
      cy.get(`[data-cy="block--${blockUuid}"]`).should('exist')

      cy.addBlock(['Content', 'Message']).then((blockUuid2) => {
        cy.get(`[data-cy="block--${blockUuid2}"]`).should('exist')

        cy.deleteBlock(blockUuid)
        cy.get(`[data-cy="block--${blockUuid}"]`).should('not.exist')

        cy.undo()
        cy.get(`[data-cy="block--${blockUuid}"]`).should('exist')

        cy.redo()
        cy.get(`[data-cy="block--${blockUuid}"]`).should('not.exist')
      })
    })
  })

  it('can undo/redo duplicating a block', () => {
    cy.addBlock(['Content', 'Message']).then((blockUuid) => {
      cy.get(`[data-cy="block--${blockUuid}"]`).should('exist')

      cy.duplicateBlock(blockUuid).then((duplicatedBlockUuid) => {
        cy.get(`[data-cy="block--${duplicatedBlockUuid}"]`).should('exist')

        cy.undo()
        cy.get(`[data-cy="block--${duplicatedBlockUuid}"]`).should('not.exist')

        cy.redo()
        cy.get(`[data-cy="block--${duplicatedBlockUuid}"]`).should('exist')
      })
    })
  })

  it('can undo/redo duplicating multiple blocks', () => {
    cy.addBlock(['Content', 'Message']).then((blockUuid) => {
      cy.get(`[data-cy="block--${blockUuid}"]`).should('exist')

      cy.addBlock(['Content', 'Numeric Response']).then((blockUuid2) => {
        cy.get(`[data-cy="block--${blockUuid2}"]`).should('exist')

        cy.duplicateMultipleBlocks([blockUuid, blockUuid2]).then((duplicatedBlocks) => {
          cy.get(`[data-cy="block--${duplicatedBlocks[0]}"]`).should('exist')
          cy.get(`[data-cy="block--${duplicatedBlocks[1]}"]`).should('exist')

          cy.undo()
          cy.get(`[data-cy="block--${duplicatedBlocks[0]}"]`).should('not.exist')
          cy.get(`[data-cy="block--${duplicatedBlocks[1]}"]`).should('not.exist')

          cy.redo()
          cy.get(`[data-cy="block--${duplicatedBlocks[0]}"]`).should('exist')
          cy.get(`[data-cy="block--${duplicatedBlocks[1]}"]`).should('exist')
        })
      })
    })
  })
})
