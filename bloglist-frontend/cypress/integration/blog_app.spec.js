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

  it('login form is shown', function () {
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

    it('a blog can be created', function() {
      cy.contains('create blog post').click()
      cy.get('input#title').type('A blog title created by cypress')
      cy.get('input#author').type('Test author')
      cy.get('input#url').type('Test url')
      cy.get('#createBlogButton').click()
      cy.contains('A blog title created by cypress')
    })

    it('a user can like a blog', function() {
      cy.contains('create blog post').click()
      cy.get('input#title').type('A blog title created by cypress')
      cy.get('input#author').type('Test author')
      cy.get('input#url').type('Test url')
      cy.get('#createBlogButton').click()
      cy.contains('A blog title created by cypress')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('Likes: 1')
    })

    it('the user who created a blog can delete it', function() {
      cy.contains('create blog post').click()
      cy.get('input#title').type('A blog title created by cypress')
      cy.get('input#author').type('Test author')
      cy.get('input#url').type('Test url')
      cy.get('#createBlogButton').click()
      cy.contains('A blog title created by cypress')
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('#root').should('not.contain', 'A blog title created by cypress')
    })

    it.only('blogs are correctly ordered by likes', function() {
      // create first blog post
      cy.contains('create blog post').click()
      cy.get('input#title').type('Blog 1')
      cy.get('input#author').type('Mark')
      cy.get('input#url').type('https://www.google.com')
      cy.get('#createBlogButton').click()

      // give two likes
      cy.contains('view').click()
      cy.contains('like').click()
      cy.wait(500)
      cy.contains('like').click()
      cy.wait(500)

      // create second blog post
      cy.contains('create blog post').click()
      cy.get('input#title').type('Blog 2')
      cy.get('input#author').type('Mark')
      cy.get('input#url').type('https://www.google.com')
      cy.get('#createBlogButton').click()
      cy.get('.hideButton').eq(0).click()
      cy.wait(500)

      // give three likes
      cy.get('.viewButton').eq(1).click()
      cy.get('.likeButton').eq(1).click()
      cy.wait(500)
      cy.get('.likeButton').eq(1).click()
      cy.wait(500)
      cy.get('.likeButton').eq(1).click()
      cy.wait(500)

      // check if the order is correct
      cy.get('#root').find('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('3')
        cy.wrap(blogs[1]).contains('2')
      })
    })
  })
})