
describe('Sample Test', () => {
    it('Can log in and view post feed', () => {
        cy.visit('http://localhost:3006')

        // Create a new account
        cy.get('.nav')
        cy.contains('Create New Account').click()
        cy.url().should('include', '/create-account')
        cy.get('.form').find('.form__input').eq(0).type('Shaggy')
        cy.get('.form').find('.form__input').eq(1).type('C')
        cy.get('.form').find('.form__input').eq(2).type('shaggggyyyyy@c.com')
        cy.get('.form').find('.form__input').eq(3).type('1234567890')
        cy.contains('Create Account').click()

        // Visit Account page
        cy.wait(1000)
        cy.get('.nav__icon').click()


        // Log out & be redirected to login page
        cy.contains('Log Out').click()
        cy.url().should('include', '/')

        
        // Log back in
        cy.get('.form').find('.form__input').eq(0).type('shaggggyyyyy@c.com')
        cy.get('.form').find('.form__input').eq(1).type('1234567890')
        cy.contains('Log In').click()


        // Visit Acount page
        cy.wait(1000)
        cy.get('.nav__icon').click()

        
        // Delete account
        cy.contains('Delete Account').click()
        cy.contains('YES, DELETE MY ACCOUNT').click()

    })
})