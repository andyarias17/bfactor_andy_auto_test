class CookieModalPage {

    elements = {
        //Cookies modal selector
        cookies_modal_selector: 'div#hs-eu-cookie-confirmation-inner #hs-eu-cookie-disclaimer',
        accept_cookies_modal: () => cy.get('div#hs-eu-cookie-confirmation-inner #hs-eu-confirmation-button')
    };

    /**
         This methos is created to handled the cookie modal on load page.
         If tyhe modal exist, it will accept all cookies. 
    */  
    validateCookieModal() {
        cy.hasElement(this.elements.cookies_modal_selector, () => {
            cy.log('**Accepting Cookies modal**')
            this.elements.accept_cookies_modal().should('be.visible').click()
        });
    }
}

module.exports = new CookieModalPage();