describe('adding blocks', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'adding blocks test',
    })
  })

  it('adds a block from the main menu', () => {
    cy.addBlock(['Branching']).should('match', /[\w\d]{8}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}/)
  })

  it('adds a block from the sub-menu', () => {
    cy.addBlock(['Content', 'Message']).should('match', /[\w\d]{8}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}/)
  })
})
