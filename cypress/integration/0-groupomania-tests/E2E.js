

describe('end to end test', () => {
  it('Can log in and do all the things', () => {
    cy.visit('http://localhost:3006')

    // Create a new account
    cy.get('.nav')
    cy.contains('Create New Account').click()
    cy.url().should('include', '/create-account')
    cy.get('.form').find('.form__input').eq(0).type('John')
    cy.get('.form').find('.form__input').eq(1).type('Doe')
    cy.get('.form').find('.form__input').eq(2).type('johndoe@email.com')
    cy.get('.form').find('.form__input').eq(3).type('1234567890')
    cy.contains('Create Account').click()
    cy.wait(1000)   
    cy.get('.nav__icon').click()
    cy.wait(1000)

    // Log Out
    cy.contains('Log Out').click()
    cy.wait(1000)

    // Log Back In
    cy.get('.form').find('.form__input').eq(0).type('johndoe@email.com')
    cy.get('.form').find('.form__input').eq(1).type('1234567890')
    cy.contains('Log In').click()

    // Create a Post
    cy.contains('Create Post').click()
    cy.get('.form').find('.form__textarea').type('This is my test post!')
    cy.get('.button').click()

    // Add a comment
    cy.get('.comment').first().click()
    cy.get('.comment-form').find('.comment-input').type('This is my test comment!{enter}').wait(1000)

    // *** Add 'like a post' here ***
     

    // Delete Account
    cy.wait(1000)
    cy.get('.nav__icon').click()
    cy.wait(1000)
    cy.visit('http://localhost:3006/delete-account')
    cy.wait(1000)
    cy.contains('YES, DELETE MY ACCOUNT').click()
  })
})



