describe('create flows', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'test add & remove connections',
    })
  })

  it('add & remove connections', () =>
    // add two blocks
    cy.addBlock(['Content', 'Message']).then(firstBlockId =>
      cy.addBlock(['Content', 'Numeric Response']).then(secondBlockId => {
        // wait for flow validation after adding blocks
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(200)

        // assign aliases
        cy.get(`[data-cy="block--${firstBlockId}"]`).find('[data-cy^="exit--"]').as('exit')
        cy.get(`[data-cy="block-handle--${firstBlockId}"]`).as('firstBlockArea')
        cy.get(`[data-cy="block-handle--${secondBlockId}"]`).as('secondBlockArea')

        // close block editor by deselecting blocks
        cy.get('[data-cy="builder-canvas"]').click('left')

        // scroll into
        // cy.scrollTo('center')
        // cy.get('@secondBlockArea').scrollIntoView()
        // cy.get('@firstBlockArea').scrollIntoView()
        cy.get('@exit').should('be.visible')
        cy.get('@secondBlockArea').should('be.visible')

        // cy.get('@exit').then(exitEl => {
        //   const exitRect = exitEl[0].getBoundingClientRect()
        //   const exitCenterX = exitRect.left + exitRect.width / 2
        //   const exitCenterY = exitRect.top + exitRect.height / 2
        //   const pageYDragAmount = 100
        //
        //   cy.window().then(window => {
        //     const pageX = exitRect.left + window.pageXOffset
        //     const pageY = exitRect.top + window.pageYOffset
        //
        //     cy.wrap(exitEl)
        //       .trigger('mouseover', {
        //         which: 1,
        //         clientX,
        //         clientY,
        //         pageX,
        //         pageY,
        //         screenX,
        //         screenY,
        //         force: true,
        //       })
        //       .trigger('mousedown', {
        //         which: 1,
        //         pageX,
        //         pageY,
        //         force: true,
        //       })
        //       .trigger('mousemove', {
        //         pageX,
        //         pageY: pageY + pageYDragAmount,
        //         force: true,
        //       })
        //       // we trigger mousemove once more, see: https://github.com/cypress-io/cypress/issues/1542#issuecomment-1040810295
        //       .trigger('mousemove')
        //
        //     cy.wait(2000)
        //
        //     cy.get('@exit').trigger('mouseup', {
        //         which: 1,
        //         force: true,
        //       })
        //     })
        // })

        // const dataTransfer = new DataTransfer()
        // hover
        cy.get('@exit').realHover()
        // cy.get('@exit').trigger('pointerover', {force: true})
        // cy.get('@exit').trigger('mouseover', {force: true})
        cy.wait(1000)

        // mousedown
        cy.get('@exit').realMouseDown()
        // cy.get('@exit').trigger('pointerdown', {force: true})
        // cy.get('@exit').trigger('mousedown', {which: 1, force: true})
        cy.wait(500)

        // drag to some (non-final) position
        // cy.get('@exit').trigger('dragstart', {dataTransfer})
        // cy.get('@exit').trigger('mousemove', {clientX: 100, clientY: 100, force: true})
        // cy.get('@exit').trigger('drag', {clientX: 100, clientY: 100})
        // cy.wait(1000)

        // drag over the second block
        cy.get('@secondBlockArea').realMouseMove(0, 0, {position: 'center'})
        // cy.get('@exit').trigger('drag', {clientX: 100, clientY: 100})
        // cy.get('@exit').trigger('mousemove', {clientX: 100, clientY: 100})
        // cy.get('@exit').trigger('dragover', {dataTransfer})
        // cy.get('@secondBlockArea').trigger('drop')
        cy.wait(500)

        // release
        cy.get('@secondBlockArea').realMouseUp({position: 'center'})
        // cy.get('@exit').trigger('dragend')
        // cy.get('@exit').trigger('mouseup', {which: 1})
        // cy.get('@exit').trigger('dragover', {dataTransfer})
        // cy.get('@secondBlockArea').trigger('drop')
        cy.wait(500)

        // create connection
        // cy.get('@exit').drag('@secondBlockArea', {force: true})

        // connection element
        cy.get('body>.leader-line:last-of-type').should('be.visible')
      })))
})
