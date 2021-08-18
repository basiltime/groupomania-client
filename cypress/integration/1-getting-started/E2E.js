
describe('Sample Test', () => {
    it('Can log in and view post feed', () => {
        cy.visit('http://localhost:3006')
        //For creating a new account
        cy.get('.nav')
        cy.contains('Create New Account').click()
        cy.url().should('include', '/create-account')
        cy.get('.form').find('.form__input').eq(0).type('Willly')
        cy.get('.form').find('.form__input').eq(1).type('Wiiills')
        cy.get('.form').find('.form__input').eq(2).type('wi00lll0008lllly@wiiillllls.com')
        cy.get('.form').find('.form__input').eq(3).type('1234567890')
        cy.contains('Create Account').click()
        cy.url().should('include', '/news-feed')
        cy.get('.nav__icon').click()
        // Getting a 403 error (unless you reload after loading
        // account page), *** AND *** FOR SOME REASON, 14 GET REQUESTS ARE SENT!!
    })
})