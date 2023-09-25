describe('Note app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown by default', function() {
    cy.get('#loginTitle').contains('Log In')
    cy.get('#usernameInput')
    cy.get('#passwordInput')
    cy.get('#loginButton').contains('login')
  })

})