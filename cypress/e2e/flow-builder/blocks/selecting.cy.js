describe('Selecting blocks', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'selecting blocks test',
    })
  })

  it('by UUID', () => {
    const foo = cy.addBlock(['Content', 'Message'])
    cy.addBlock(['Branching'])

    foo.then((uuid) => {
      cy.selectBlock(uuid).should('equal', uuid)
    })
  })
})
