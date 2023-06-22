describe('Add/Delete/Duplicate blocks', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'my test flow',
    })
  })

  it('can undo/redo correctly', () => {
    // #### Add a block
    let messageBlockUuid = null
    cy.addBlock(['Content', 'Message']).then((blockUuid) => {
      messageBlockUuid = blockUuid
      cy.get(`[data-cy="block--${blockUuid}"]`).should('exist')
      cy.undo()
      cy.get(`[data-cy="block--${blockUuid}"]`).should('not.exist')
      cy.redo()
      cy.get(`[data-cy="block--${blockUuid}"]`).should('exist')

      // TODO in CORE-664: enable the test after fixing the bug
      // Block deletion, scenario1: Delete the block right away, with just one block in the snapshot
      // cy.deleteBlock(messageBlockUuid).then(() => {
      //   cy.get(`[data-cy="block--${messageBlockUuid}"]`).should('not.exist')
      //   cy.undo()
      //   cy.get(`[data-cy="block--${messageBlockUuid}"]`).should('exist')
      //   cy.redo()
      //   cy.get(`[data-cy="block--${messageBlockUuid}"]`).should('not.exist')
      //
      //   // TODO in CORE-664: bring next tests in this line once the bug is fixed
      // })

      // #### Duplicate that block
      let duplicatedMessageBlockUuid = null
      cy.duplicateBlock(messageBlockUuid).then((blockUuid) => {
        duplicatedMessageBlockUuid = blockUuid
        cy.get(`[data-cy="block--${duplicatedMessageBlockUuid}"]`).should('exist')
        cy.undo()
        cy.get(`[data-cy="block--${duplicatedMessageBlockUuid}"]`).should('not.exist')
        cy.redo()
        cy.get(`[data-cy="block--${duplicatedMessageBlockUuid}"]`).should('exist')

        // #### Duplicate multiple blocks
        cy.addBlock(['Content', 'Numeric Response']).then((blockUuid2) => {
          cy.duplicateMultipleBlocks([duplicatedMessageBlockUuid, blockUuid2]).then((duplicatedBlocks) => {
            cy.get(`[data-cy="block--${duplicatedBlocks[0]}"]`).should('exist')
            cy.get(`[data-cy="block--${duplicatedBlocks[1]}"]`).should('exist')
            cy.undo()
            cy.get(`[data-cy="block--${duplicatedBlocks[0]}"]`).should('not.exist')
            cy.get(`[data-cy="block--${duplicatedBlocks[1]}"]`).should('not.exist')
            cy.redo()
            cy.get(`[data-cy="block--${duplicatedBlocks[0]}"]`).should('exist')
            cy.get(`[data-cy="block--${duplicatedBlocks[1]}"]`).should('exist')

            // #### Block deletion, scenario2: Delete a block, after we have few snapshots
            cy.deleteBlock(duplicatedMessageBlockUuid).then(() => {
              cy.get(`[data-cy="block--${duplicatedMessageBlockUuid}"]`).should('not.exist')
              cy.undo()
              cy.get(`[data-cy="block--${duplicatedMessageBlockUuid}"]`).should('exist')
              cy.redo()
              cy.get(`[data-cy="block--${duplicatedMessageBlockUuid}"]`).should('not.exist')
            })
          })
        })
      })
    })
  })
})