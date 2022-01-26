class HeaderPage {

    elements = {
        menu_insights: () => cy.get('.insights-mega-menu-wrap'),
        blogLink: () => cy.get('.insights-pages a p').eq(0), //select first page into insights
    };

    /**
         * This method do mouse over to the insights top link
         * and then, It will click on Blog option
    */
    clickOnBlog() {        
        this.elements.menu_insights().trigger('mouseover')
        this.elements.blogLink().should('be.visible').trigger('mouseover').click({force:true})
    }
}

module.exports = new HeaderPage();