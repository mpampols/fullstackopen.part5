describe('Blog app', function () {
  beforeEach(function () {
    // reset the database
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // create a new user
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.get('.loginForm').should('have.css', 'display', 'block')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Wrong credential')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create blog post').click()
      cy.get('input#title').type('A blog title created by cypress')
      cy.get('input#author').type('Test author')
      cy.get('input#url').type('Test url')
      cy.get('#createBlogButton').click()
      cy.contains('A blog title created by cypress')
    })
  })
})