describe('successful account creation, logout, login, and account deletion', () => {
  it('can create a new account', () => {
    cy.visit('http://localhost:3006')
    cy.get('.nav')
    cy.contains('Create New Account').click()
    cy.url().should('include', '/create-account')
    cy.get('.form').find('.form__input').eq(0).type('mr')
    cy.get('.form').find('.form__input').eq(1).type('jibs')
    cy.get('.form').find('.form__input').eq(2).type('hello@openclassroom.com')
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
    cy.get('.form').find('.form__input').eq(0).type('hello@openclassroom.com')
    cy.get('.form').find('.form__input').eq(1).type('1234567890')
    cy.contains('Log In').click()
  })

  it('can delete an account', () => {
    cy.wait(2000)
    cy.get('.nav__icon').click()
    cy.wait(2000)
    cy.visit('http://localhost:3006/delete-account')
    cy.wait(2000)
   
    cy.contains('YES, DELETE MY ACCOUNT').click()
    
  })

})

describe('login form error handling', () => {
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
