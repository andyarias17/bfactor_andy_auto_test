/// <reference types="cypress" />

//Required page objes
const HeaderPage = require('../pages/header-page')
const BlogPage = require('../pages/blog-page')
const PostPage = require('../pages/post-page')
const CookieModalPage = require('../pages/cookie-modal-page')

//Fixture data
const testData = require('../fixtures/testData.json')

context('Blank Factor Testing', () => {
    /**
         * Previous Hook to access to the url of testing.
         * It will acces to blog page and then, it will find the Proper post, 
         * If it is not visible, it will click on "Load more" untul it find the artixle
    */
    before(() => {
        cy.visit('https://blankfactor.com/')
        CookieModalPage.validateCookieModal()
        HeaderPage.clickOnBlog()
        BlogPage.findPostByTitle(testData.title)
    })

    describe('Validations', () => {

        //This test will validate the urls redirected against the test data file
        it('URL validation', () => {
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq(testData.url)
            })
        })

        //This test will validate the Post Title against the test data file
        it('Title validation', () => {
            PostPage.elements.postTitle().invoke('text').then((text) => {
                expect(text.trim(), 'Validating Title').to.equal(testData.title)
            })
        })

        //This test will validate the Post Author against the test data file
        it('Author validation', () => {
            PostPage.elements.authorTitle().invoke('text').then((text) => {
                expect(text.trim(), 'Validating Author').to.equal(testData.author)
            })
        })

        //This test will validate the Post category against the test data file
        it('Category validation', () => {
            PostPage.elements.categoryTitle().invoke('text').then((text) => {
                expect(text.trim(), 'Validating Category').to.equal(testData.categories)
            })
        })

        //This test will validate the Post image against the test data file
        it('Image validation', () => {
            PostPage.elements.img().invoke('attr', 'src').then((src) => {
                expect(src.trim(), 'Validating Image').to.equal(testData.image)
            })
        })

        //This test will validate the submission of a newsletter form with a avlid email
        it('Subscribe to newsletter', () => {
            PostPage.submitNewsletterForm((Math.floor(Math.random() * (9000 - 1000))) + testData.email)
            PostPage.elements.newsletterConfirmation().should('be.visible').invoke('text').then((text) => {
                expect(text.trim(), 'Validating Newsletter subscription').to.equal(testData.newsletterConfirmation)
            })
        })

        //This is an invalid tests that will validate the error message when using an ivalid email
        it('Invalid - Subscribe to newsletter', () => {
            PostPage.submitNewsletterForm('test@test.com')
            PostPage.elements.newsletterErrorMessage().invoke('text').then((text) => {
                expect(text.trim(), 'Validating Invalid Newsletter subscription').to.equal('Please enter a valid email address.')
            })
        })

        //This test will load ALL the post available, and then, it will print ALL title and LINKs
        it('Print All Posts and Links', () => {
            HeaderPage.clickOnBlog()
            BlogPage.printAllPosts()
        });
    })
})