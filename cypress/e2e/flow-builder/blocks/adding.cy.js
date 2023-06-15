describe('Adding blocks', () => {
  beforeEach(() => {
    cy.createFlow({
      label: 'adding blocks test',
    })
  })

  it('from the main menu', () => {
    cy.addBlock(['Branching']).should('match', /[\w\d]{8}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}/)
  })

  it('from a sub-menu', () => {
    cy.addBlock(['Content', 'Message']).should('match', /[\w\d]{8}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}/)
  })
})
