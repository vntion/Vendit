/**
 *
 * - Login spec
 * - should display login page correctly
 * - should display error message when username or password is wrong
 * - should display error message when email is not valid
 * - should require username and password fields
 * - should display homepage when username and password is correct
 * - should navigate to register page when daftar disini is clicked
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })

  it('should display login page correctly', () => {
    cy.get('header')
      .contains(/^Vendit$/)
      .should('be.visible')
    cy.get('div[data-testid="sidenav"]').should('be.visible')
    cy.get('input[id="email"]').should('be.visible')
    cy.get('input[id="password"]').should('be.visible')
    cy.get('button[type="submit"]')
      .contains(/^Login$/)
      .should('be.visible')
    cy.get('p')
      .contains(/^Daftar disini$/)
      .should('be.visible')
    cy.get('footer').should('be.visible')
  })

  it('should display error message when username or password is wrong', () => {
    cy.get('#email').type('test@example.com')
    cy.get("input[type='password']").type('password123')

    cy.get("button[type='submit']").click()

    cy.get('p[data-testid="errorMsg"]').should('exist')
  })

  it('should display error message when email is not valid', () => {
    cy.get('#email').type('test@example')
    cy.get("input[type='password']").type('password123')

    cy.get("button[type='submit']").click()

    cy.get('p[data-testid="errorMsg"]').should('exist')
  })

  it('should require username and password fields', () => {
    cy.get("button[type='submit']").click()

    cy.get('#email').then(($input) => {
      expect($input[0].validationMessage).to.not.be.empty
    })

    cy.get("input[type='password']").then(($input) => {
      expect($input[0].validationMessage).to.not.be.empty
    })
  })

  it('should display homepage when username and password is correct', () => {
    cy.get('#email').type('rehann@gmail.com')
    cy.get("input[type='password']").type('rehann123')

    cy.get("button[type='submit']").click()

    cy.url().should('include', '/home')
    cy.get("[data-testid='sideleaderboard-component']").should('exist')
    cy.get("[data-testid='threads-component']").should('exist')
    cy.get("[data-testid='username-component']").should('exist')
    cy.get("[data-testid='addThreadBtn-component']").should('exist')
  })

  it('should navigate to register page when daftar disini is clicked', () => {
    cy.get('a')
      .contains(/^Daftar disini$/)
      .click()

    cy.get("[data-testid='register-component']").should('exist')
  })
})
