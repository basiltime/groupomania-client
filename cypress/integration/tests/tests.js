describe('My First Test', () => {
    it('Does not do much!', () => {
        expect(true).to.equal(true)
    })
})

describe('Sample Test', () => {
    it('Can log in and view post feed', () => {
        cy.visit('http://localhost:3000')
        cy.get('.nav')
        cy.contains('Log In').click()
        cy.url().should('include', '/post-feed')
        cy.get('.comment').contains('Looks delicious!')
    })
})



