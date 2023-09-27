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

    describe('When blogs are added',function(){
      beforeEach(function() {
        cy.addBlog({title: 'testBlogs',author:'author1' , url:'google.com'})
        cy.addBlog({title: 'testBlogs2',author:'author1' , url:'google.es'})
      })

      it('user can give a like', function(){
         cy.get('div').contains('testBlogs by author1 ')
          .find('Button').contains('show').click()

        const initLikes=  cy.get('div').contains('Likes : 0 ')
        const postLikes= parseInt(initLikes)
        cy.get('Button').contains('like').click()

        cy.get('.blogLikes').should('contain','Likes : 1 ')
      })

      it('User can delete a blog', function(){
        cy.get('div').contains('testBlogs2 by author1 ')
          .find('Button').contains('show').click()

        cy.get('div').contains('testBlogs2 by author1 ')
          .should('contain','User: Matti Luukkainen')

        cy.get('div').contains('testBlogs2 by author1 ')
          .find('Button').contains('delete').click()

        cy.get('.notification')
          .should('contain', 'Blog deleted')
          .and('have.css', 'color', 'rgb(0, 153, 51)')

      })
    })

  })

})