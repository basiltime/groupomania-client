
describe('groupomania social media site', () => {
    it('can create a new account', () => {
        cy.visit('http://localhost:3006')
        cy.get('.nav')
        cy.contains('Create New Account').click()
        cy.url().should('include', '/create-account')
        cy.get('.form').find('.form__input').eq(0).type('mr')
        cy.get('.form').find('.form__input').eq(1).type('jibs')
        cy.get('.form').find('.form__input').eq(2).type('sshellooo@jibs.com')
        cy.get('.form').find('.form__input').eq(3).type('1234567890')
        cy.contains('Create Account').click()
    })

    it('can visit the account details page', () => {
        cy.wait(1000)
        cy.get('.nav__icon').click()
        cy.wait(1000)
    })


    
    it('can log out and get redirected to login screen', () => {
        cy.contains('Log Out').click()
        cy.wait(2000)
    })
       
    it('can log in with the correct email and password', () => {
        cy.get('.form').find('.form__input').eq(0).type('sshellooo@jibs.com')
        cy.get('.form').find('.form__input').eq(1).type('1234567890')
        cy.contains('Log In').click()
    }) 
        
    it('can visit the account details page', () => {
        cy.wait(2000)
        cy.get('.nav__icon').click()
        cy.wait(2000)
        cy.visit('http://localhost:3006/delete-account')
        cy.wait(2000)
        cy.reload()
        cy.contains('YES, DELETE MY ACCOUNT').click()
        cy.reload()
    })
        
})