
describe('Sample Test', () => {
    it('Can log in and view post feed', () => {
        cy.visit('http://localhost:3006')
        cy.get('.nav')
        cy.contains('Create New Account').click()
        cy.url().should('include', '/create-account')
        cy.get('.form').find('.form__input').eq(0).type('Jane')
        cy.get('.form').find('.form__input').eq(1).type('Doe')
        cy.get('.form').find('.form__input').eq(2).type('jane@xyz.com')
        cy.get('.form').find('.form__input').eq(3).type('12345678910')
        cy.contains('Create Account').click()
        cy.contains('Create Post')
    })
})