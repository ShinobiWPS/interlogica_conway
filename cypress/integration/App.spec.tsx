import cy from 'cypress';

describe('App', () => {
  it('renders the board and controls', () => {
    cy.visit('/')
    cy.get('.board').should('be.visible')
    cy.get('.controls').should('be.visible')
  })

  it('allows cells to be toggled', () => {
    cy.visit('/')
    cy.get('.cell')
      .first()
      .click()
      .should('have.class', 'alive')
      .click()
      .should('not.have.class', 'alive')
  })

  it('allows the game to be started and stopped', () => {
    cy.visit('/')
    cy.get('.cell')
      .first()
      .click()
    cy.get('button').contains('Start').click()
    cy.wait(1000)
    cy.get('.cell').first().should('not.have.class', 'alive')
    cy.get('button').contains('Stop').click()
  })

  it('allows the game to be reset', () => {
    cy.visit('/')
    cy.get('.cell')
      .first()
      .click()
    cy.get('button').contains('Reset').click()
    cy.get('.cell').first().should('not.have.class', 'alive')
  })
})
