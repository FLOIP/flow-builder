describe('Creating a connection', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'Creating a connection',
    })

    cy.addBlock(['Content', 'Message']).then(blockId => {
      cy.get(`[data-cy="block--${blockId}"]`).as('firstBlock')
    })

    cy.addBlock(['Content', 'Numeric Response']).then(blockId => {
      cy.get(`[data-cy="block--${blockId}"]`).as('secondBlock')
    })

    // wait for flow validation after adding blocks
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(300)
  })

  it('creates a connection correctly', () => {
    // assign aliases
    cy.get('@firstBlock').find('[data-cy^="exit--"]').as('exit')
    cy.get('@firstBlock').find('[data-cy^="block-handle--"]').as('firstBlockArea')
    cy.get('@secondBlock').find('[data-cy^="block-handle--"]').as('secondBlockArea')

    // deselect blocks and close block editor
    cy.get('[data-cy="builder-canvas"]').click('left')

    // ensure visibility
    cy.get('@firstBlockArea').scrollIntoView()
    cy.get('@exit').should('be.visible')
    cy.get('@secondBlockArea').should('be.visible')

    // drag and drop
    cy.get('@exit').realHover()
    cy.get('@exit').realMouseDown()
    cy.get('@secondBlockArea').realMouseMove(0, 0, {position: 'center'})
    cy.get('@secondBlockArea').realMouseUp({position: 'center'})

    // check connection
    cy.get('body>.leader-line:last-of-type').as('connection')
    cy.get('@connection').should('be.visible')
  })
})
