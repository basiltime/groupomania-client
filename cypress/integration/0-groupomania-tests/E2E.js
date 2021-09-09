

describe('Site functionality test', () => {
  it('Can log in and do all the things', () => {
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
    cy.get('.nav').should('have.css', 'position', 'sticky')
    
    // Create a new account
    cy.contains('Create New Account').click()
    cy.url().should('include', '/create-account')
    cy.get('.form').should('be.visible').find('.form__input').eq(0).type('John')
    cy.get('.form').find('.form__input').eq(1).type('Doe')
    cy.get('.form').find('.form__input').eq(2).type('saaaaaaaaaaaaampleemail@email.com')
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
    cy.get('.form').should('be.visible').find('.form__input').eq(0).type('saaaaaaaaaaaaampleemail@email.com')
    cy.get('.form').should('be.visible').find('.form__input').eq(1).type('1234567890')
    cy.contains('Log In').should('be.visible').click()

    // Create a Post
    cy.url().should('include', '/news-feed')
    cy.contains('Create Post').should('be.visible').click()
    cy.get('.form').should('be.visible').find('.form__textarea').type('This is my test post!')
    cy.get('.button').should('be.visible').click()

    // Add a Comment
    cy.get('.commentIcon').first().should('be.visible').click()
    cy.get('.comment-form').find('.comment-input').type('This is my test comment!{enter}').wait(1000)
    cy.get('.comment').first().should('have.text', 'This is my test comment!')

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


