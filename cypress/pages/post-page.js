class PostPage {

    elements = {
        postTitle: () => cy.get('.post-title'),
        authorTitle: () => cy.get('.post-meta__author a'),
        categoryTitle: () => cy.get('.post-page-template__header .categories-list'),
        img: ()=> cy.get('.post-thumbnail img'),

        newsletterForm:() => cy.get('[type="email"]'),
        newsletterSubmit:() => cy.get('[type="submit"]'),
        newsletterConfirmation:() => cy.get('.mc4wp-response'),
        newsletterErrorMessage:() => cy.get('.error-message')
    };

    submitNewsletterForm(email) {        
        this.elements.newsletterForm().type(email)
        this.elements.newsletterSubmit().click()
    }
}

module.exports = new PostPage();