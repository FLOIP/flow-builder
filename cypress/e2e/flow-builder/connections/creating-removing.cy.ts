describe('Creating/removing a connection', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'Creating/removing a connection',
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

  it('creates and removes a connection', () => {
    cy.get('@firstBlock').find('[data-cy^="exit--"]').as('exit')
    cy.get('@secondBlock').find('[data-cy^="block-handle--"]').as('secondBlockArea')

    // deselect blocks and close block editor
    cy.get('[data-cy="builder-canvas--page"]').click('left')

    cy.get('@exit').dragAndDropTo('@secondBlockArea')

    // The only way to identify current line so far: https://github.com/anseki/leader-line/issues/185
    cy.get('body>.leader-line:last-of-type').as('connection')

    cy.get('@connection').should('be.visible')

    // remove connection
    cy.get('@exit')
      .realHover()
      .click()

    cy.get('@connection').should('not.exist')
  })
})
