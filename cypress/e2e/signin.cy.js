describe('Signin User Not Registered', () => {
  it('clicking "type" navigates to a new url', () => {
    cy.visit('https://app.topaly.xyz/signin')
    cy.get('input[id="email"]')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
    cy.get('input[id="password"]')
      .type('supersecretpassword123%%')
      .should('have.value', 'supersecretpassword123%%')
    cy.contains('Sign In').click()
    // cy.get('notification')
    //   .should('contain', 'Please, enter valid credentials')
  })
})
