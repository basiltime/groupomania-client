describe('End to End Test', () => {
  it('Can perform common user actions', () => {
    cy.visit('http://localhost:3006')

    // Assert nav is displaying
    cy.get('.nav').should('be.visible')
    cy.get('.nav').find('.nav__logo').should('be.visible')
    cy.get('.nav').find('.nav__icon').should('be.visible')
    cy.get('.nav').should('have.css', 'position', 'sticky')

    // Assert login form is displaying
    cy.get('.main').should('be.visible')
    cy.get('.main').find('.main__logo').should('be.visible')
    cy.contains('Log In').should('be.visible')
    cy.contains('Create New Account').should('be.visible')

    // Create a new account
    cy.contains('Create New Account').click()
    cy.url().should('include', '/create-account')
    cy.get('.form').should('be.visible').find('.form__input').eq(0).type('John')
    cy.get('.form').find('.form__input').eq(1).type('Doe')
    cy.get('.form').find('.form__input').eq(2).type('saaaaample@email.com')
    cy.get('.form').find('.form__input').eq(3).type('1234567890')
    // ***** ADD ASSERTION FOR CHOOSE PROFILE PICTURE BUTTON ********
    cy.contains('Create Account').should('be.visible').click()
    cy.wait(1000)   

    // Navigates to newsfeed after account creation
    cy.url().should('include', '/news-feed')

    // Go to Account Details Page
    cy.get('.nav__icon').click()
    cy.url().should('include', '/my-account')
    cy.wait(1000)

    // Log Out
    cy.contains('Log Out').should('be.visible').click()
    cy.wait(1000)
    cy.get('.main__header').should('have.text', 'Log in to your account')

    // Log Back In
    cy.get('.form').should('be.visible').find('.form__input').eq(0).type('saaaaample@email.com')
    cy.get('.form').should('be.visible').find('.form__input').eq(1).type('1234567890')
    cy.contains('Log In').should('be.visible').click()

    // Create a Post
    cy.wait(2000)
    cy.contains('Create Post').should('be.visible').click()
    cy.get('.form').should('be.visible').find('.form__textarea').type('This is my test post!')
    cy.get('button').should('be.visible').click()

    // Add a Comment
    cy.get('.commentIcon').first().should('be.visible').click()
    cy.get('.comment-form').find('.comment-input').type('This is my test comment!{enter}').wait(1000)
    cy.get('.comment-content').first().should('have.text', 'This is my test comment!')

    // Like a Post
    cy.get('.post').first().find('.not-liked').should('be.visible').click()
    cy.get('.post').first().find('.likes-qty').should('have.text', '1 Like')

    // Delete Account
    cy.wait(1000)
    cy.get('.nav__icon').should('be.visible').click()
    cy.wait(1000)
    cy.contains('Delete Account').click()
    cy.wait(1000)
    cy.contains('YES, DELETE MY ACCOUNT').should('be.visible').click()
  })
})


describe('Login/Create Account form Validation and Error Handling', () => {
  it('cannot log in with the incorrect password', () => {
    cy.visit('http://localhost:3006')
    cy.contains('Log in to your account')
    cy.get('.form').find('.form__input').eq(0).type('test@user.com')
    cy.get('.form').find('.form__input').eq(1).type('1234567891') //
    cy.contains('Log In').click()
    cy.contains('The email or password you entered is incorrect')
  })

  it('cannot log in with an unregistered email', () => {
    cy.visit('http://localhost:3006')
    cy.contains('Log in to your account')
    cy.get('.form').find('.form__input').eq(0).type('nonexistant@user.com')
    cy.get('.form').find('.form__input').eq(1).type('1234567891') //
    cy.contains('Log In').click()
    cy.contains('The email or password you entered is incorrect')
  })

  it('cannot log in if password or email is missing', () => {
    cy.visit('http://localhost:3006')
    cy.get('.form').find('.form__input').eq(0).type('test@user.com')
    cy.contains('Log In').click()
    cy.contains('Password is required')
    cy.visit('http://localhost:3006')
    cy.get('.form').find('.form__input').eq(1).type('1234567890')
    cy.contains('Log In').click()
    cy.contains('Email is required')
  })
})

describe('create account error handling', () => {
  it('cannot create an account with a duplicate email', () => {
    cy.visit('http://localhost:3006')
    cy.contains('Create New Account').click()
    cy.url().should('include', '/create-account')
    cy.get('.form').find('.form__input').eq(0).type('John')
    cy.get('.form').find('.form__input').eq(1).type('Doe')
    cy.get('.form').find('.form__input').eq(2).type('test@user.com')
    cy.get('.form').find('.form__input').eq(3).type('1234567890')
    cy.contains('Create Account').click()
    cy.contains('Duplicate email address')
  })
})