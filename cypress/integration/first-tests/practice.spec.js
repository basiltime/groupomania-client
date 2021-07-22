describe('My First Test', () => {
    it('Does not do much!', () => {
        expect(true).to.equal(true)
    })
})

describe('My First Real Test', () => {
    it('finds the content "Log In"', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Log In').click()
        cy.url().should('include', '/post-feed')
    })
})



