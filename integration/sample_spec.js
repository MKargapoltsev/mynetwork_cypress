/// <reference types="Cypress" />

describe('My network E2E tests', function() {
  beforeEach(function () {
      cy.visit('/contacts/mynetwork')
      cy.get('input[name=username]').type('premium@gnix.com')
      cy.get('input[name=password]').type('..test..{enter}')
      //cy.get('[type=submit]').click()
      cy.url().should('include', '/contacts/mynetwork')
  })
    
 after(function() {
    cy.request({
        method: 'PUT',
        url: '/rest/network/users/client_settings/contact_list_show_notes/?rid=1', 
        form: true,
        body: {
            value: 'NO'
            }
        }) //reseting contact_list_show_notes settings to NO
 })
    
    it('Contacts, CR and BD tiles + feedback teaser are displayed', function() {
        
    cy.get('input[type=search]')
    cy.contains('View all contact requests')
    cy.contains('birthday')
    cy.contains('Give feedback')
  })
    
   context('Contacts Spoke', function() {
    it('Contacts tile', function() {
      
    cy.contains('contacts')
      .should('have.text', ' 106 contacts.')
      .click()
      
    cy.url().should('include', '/contacts/mynetwork/contactlist')
    })
       
    it('Contacts spoke: sorting modes', function() {
        cy.contains('contacts').click()
       
        cy.get('.ContactsSortMenu-ContactsSortMenu-container-845dad88 > .button-ButtonShell-button-fd31136a').click().get('[value="LAST_NAME"]').click()
        cy.get('.List-List-list-f5bef659 > :nth-child(1) > :nth-child(2)').should('contain', 'Claudio Abado')
        
        cy.get('.ContactsSortMenu-ContactsSortMenu-container-845dad88 > .button-ButtonShell-button-fd31136a').click().get('[value="FIRST_NAME"]').click()     
        cy.get('.List-List-list-f5bef659 > :nth-child(1) > :nth-child(2)').should('contain', 'Alain Delon')
        
        cy.get('.ContactsSortMenu-ContactsSortMenu-container-845dad88 > .button-ButtonShell-button-fd31136a').click().get('[value="CONTACT_CREATED_AT"]').click()
        cy.get('.List-List-list-f5bef659 > :nth-child(1) > :nth-child(2)').should('contain', 'IN_Premium Full_User_DE')
    })
       
    it('Contacts spoke: show/hide All notes', function() {
        cy.contains('contacts').click()
        
        cy.get('.ContactsOptionsMenu-ContactsOptionsMenu-container-5e18b9f5 > .button-ButtonShell-button-fd31136a').click().get('[value="showNotes"]').click()
        cy.get('.List-List-list-f5bef659 > :nth-child(1) > :nth-child(2)').should('contain', 'Any notes')
        
        cy.get('.ContactsOptionsMenu-ContactsOptionsMenu-container-5e18b9f5 > .button-ButtonShell-button-fd31136a').click().get('[value="hideNotes"]').click()
        cy.get('.List-List-list-f5bef659 > :nth-child(1) > :nth-child(2)').should('not.contain', 'Any notes')
    })
  })
})