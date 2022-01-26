class BlogPage {

    elements = {
        listTitles: () => cy.get('.posts-list article .post-title'),
        heroTitle: () => cy.get('.hero-title'),
        loadMoreButton: () => cy.get('.load-more-btn-wrap'),

        paginationTotal: () => cy.get('.load-more-btn-wrap button'),
        paginationResults: () => cy.get('.pagination-with-results .results'),
    };

    /**
         * This method will find the index position of the title,
         * if the post is not found, it will load more posts by clicking the "load more" button
         * Once it find it, it will click the proper post or article
         * @param {string} title is the title value to find
    */
    findPostByTitle(title) {
        this.getIndex_ByPost(title)
        cy.get('@indexPostFound').then((indexFound) => {
            if (indexFound === null) {
                this.clickLoadMore()
                this.findPostByTitle(title)
            } else {
                cy.log('**Post Found in Position: ' + indexFound + '**')
                cy.log('**Openning Post**')
                this.elements.listTitles().eq(indexFound).click()
            }
        })
    }

    /**
         * This method will find the index position of the title,
         * if the post is not found, it will return a null value.
         * @param {string} title is the title value to find
    */
    getIndex_ByPost(title) {
        cy.wrap(null).as('indexPostFound') //Index initial value
        this.elements.heroTitle().should('be.visible').then(() => {
            cy.log('**Finding Post: ' + title + '**')
            this.elements.listTitles().each(($post, index) => {
                if ($post.text() == title) {
                    cy.wrap(index).as('indexPostFound')
                    return false
                }
            })
        })
    }

    /**
         * This method click on "Load more" button. 
         * It is used to loadd more articles in the blog page. 
    */
    clickLoadMore() {
        this.elements.paginationTotal().invoke('attr', 'data-posts-count').then((total) => {
            this.elements.paginationResults().invoke('text').then((showing) => {
                let showingText = showing.trim()
                let currentShowing = showingText.substring(showingText.indexOf('-') + 1, showingText.indexOf('(') - 1)
                if (currentShowing !== total) {
                    cy.log('**Clicking in Load More button**')
                    this.elements.loadMoreButton().should('be.visible').scrollIntoView().click()
                    cy.wait(1000)
                } else {
                    cy.log('**There are not more posts to show**')
                }
            })
        })
    }

   /**
         * Recursive method to load ALL Posts in blog page
    */  
    loadAllPosts() {
        this.elements.paginationTotal().invoke('attr', 'data-posts-count').then((total) => {
            this.elements.paginationResults().invoke('text').then((showing) => {
                let showingText = showing.trim()
                let currentShowing = showingText.substring(showingText.indexOf('-') + 1, showingText.indexOf('(') - 1)
                if (currentShowing !== total) {
                    cy.log('**Clicking in Load More button**')
                    this.elements.loadMoreButton().should('be.visible').scrollIntoView().click()
                    cy.wait(1000)
                    this.loadAllPosts()
                } else {
                    cy.log('**There are not more posts to show**')
                }
            })
        })
    }

    /**
         * This method will print by using cy.log all the titles and links
    */  
    printAllPosts() {
        this.loadAllPosts()
        this.elements.listTitles().each(($post, index) => {          
          cy.wrap($post).find('a').invoke('attr', 'href').then((href) => {
            cy.log("-----------"+index+"-----------")  
            cy.log("**POST: "+$post.text()+"**")  
            cy.log('**LINK: '+href+'**')  
          })          
        })
    }
}

module.exports = new BlogPage();