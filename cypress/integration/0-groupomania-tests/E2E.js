

describe('end to end test', () => {
  it('Can log in and do all the things', () => {
    cy.visit('http://localhost:3006')

    // Create a new account
    cy.get('.nav')
    cy.contains('Create New Account').click()
    cy.url().should('include', '/create-account')
    cy.get('.form').find('.form__input').eq(0).type('mr')
    cy.get('.form').find('.form__input').eq(1).type('jibs')
    cy.get('.form').find('.form__input').eq(2).type('meeeeeee@oopenclassrooms.com')
    cy.get('.form').find('.form__input').eq(3).type('1234567890')
    cy.contains('Create Account').click()
    cy.wait(5000)   
    cy.get('.nav__icon').click()
    cy.wait(1000)

    // Add an assertion here that the news feed is visible

    // Log Out
    cy.contains('Log Out').click()
    cy.wait(2000)

    // Log Back In 
    cy.get('.form').find('.form__input').eq(0).type('meeeeeee@oopenclassrooms.com')
    cy.get('.form').find('.form__input').eq(1).type('1234567890')
    cy.contains('Log In').click()
    cy.contains('Create Post').click()
    cy.get('.form').find('.form__textarea').type('This is my test post!')
    cy.get('.button').click()

    cy.contains('This is my test post!')







    cy.wait(2000)
    cy.get('.nav__icon').click()
    cy.wait(2000)
    cy.visit('http://localhost:3006/delete-account')
    cy.wait(2000)
    cy.contains('YES, DELETE MY ACCOUNT').click()
  })
})



