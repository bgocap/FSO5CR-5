Cypress.Commands.add('resetDb', () => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
  })

Cypress.Commands.add('createUser', ({ username, name ,password }) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      username, name , password
    })
})

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })