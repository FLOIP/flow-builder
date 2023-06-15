describe('selecting blocks', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'selecting blocks test',
    })
  })

  it('adds three blocks, selects the 2nd', () => {
    const foo = cy.addBlock(['Content', 'Message'])
    cy.addBlock(['Branching'])

    foo.then((uuid) => {
      cy.selectBlock(uuid).should('equal', uuid)
    })
  })
})
