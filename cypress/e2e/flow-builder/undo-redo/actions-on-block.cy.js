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

      // #### Duplicate that block
      cy.wait(1000)
      let duplicatedMessageBlockUuid = null
      console.debug('messageBlockUuid 1', messageBlockUuid)
      cy.duplicateBlock(messageBlockUuid).then((blockUuid) => {
        console.debug('messageBlockUuid 2', messageBlockUuid)
        duplicatedMessageBlockUuid = blockUuid
        cy.get(`[data-cy="block--${blockUuid}"]`).should('exist')
        cy.undo()
        cy.get(`[data-cy="block--${blockUuid}"]`).should('not.exist')
        cy.redo()
        cy.get(`[data-cy="block--${blockUuid}"]`).should('exist')
      })
    })





    // // #### Delete a block
    // cy.deleteBlock(duplicatedBlock1)
    // cy.get(`[data-cy="block--${duplicatedBlock1}"]`).should('not.exist')
    // cy.undo()
    // cy.get(`[data-cy="block--${duplicatedBlock1}"]`).should('exist')
    // cy.redo()
    // cy.get(`[data-cy="block--${duplicatedBlock1}"]`).should('not.exist')
    //
    // // #### Duplicate multiple blocks
    // const blockUuid2 = cy.addBlock(['Content', 'Numeric Response'])
    // const duplicatedBlocks = cy.duplicateMultipleBlocks([blockUuid, blockUuid2])
    // cy.get(`[data-cy="block--${duplicatedBlocks[0]}"]`).should('exist')
    // cy.get(`[data-cy="block--${duplicatedBlocks[1]}"]`).should('exist')
  })
})
