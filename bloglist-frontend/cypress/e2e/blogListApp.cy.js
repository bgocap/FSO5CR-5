describe('Blog app', function() {

  beforeEach(function() {
    cy.resetDb()
    cy.createUser ( {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    })
    cy.visit('')
  })

  it('Login form is shown by default', function() {
    cy.get('#loginTitle').contains('Log In')
    cy.get('#usernameInput')
    cy.get('#passwordInput')
    cy.get('#loginButton').contains('login')
  })

  describe('Login test',function() {

    it('succeeds with correct credentials', function() {
      cy.get('#usernameInput').type('mluukkai')
      cy.get('#passwordInput').type('salainen')
      cy.get('#loginButton').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#usernameInput').type('mluukkai')
      cy.get('#passwordInput').type('no')
      cy.get('#loginButton').click()
      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(204, 51, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'mluukkai', password: 'salainen'})
    })

    it('A blog can be created', function() {
      cy.get('Button').contains('Create a new blog').click()

      cy.get('[name="Title"]').type('Can this be submited?')
      cy.get('[name="Author"]').type('SampleAuthor')
      cy.get('[name="URL"]').type('www.google.com')
      cy.get('Button').contains('save').click()

      cy.get('.blog').contains('Can this be submited? by SampleAuthor ')
    })

    describe('When a blog is added',function(){
      beforeEach(function() {
        cy.addBlog({title: 'testBlogs',author:'author1' , url:'google.com'})
      })

      it('user can give a like', function(){
        cy.get('Button').contains('show').click()

        const initLikes=  cy.get('div').contains('Likes : 0 ')
        const postLikes= parseInt(initLikes)
        cy.get('Button').contains('like').click()

        cy.get('.blogLikes').should('contain','Likes : 1 ')
      })
    })

  })

})