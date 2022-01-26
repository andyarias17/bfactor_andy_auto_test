/// <reference types="cypress" />

const HeaderPage = require('../pages/header-page')
const BlogPage = require('../pages/blog-page')
const PostPage = require('../pages/post-page')
const CookieModalPage = require('../pages/cookie-modal-page')

const testData = require('../fixtures/testData.json')

context('Blank Factor Testing', () => {
    before(() => {
        cy.visit('https://blankfactor.com/')
        CookieModalPage.validateCookieModal()
        HeaderPage.clickOnBlog()
        BlogPage.findPostByTitle(testData.title)
    })

    describe('Validations', () => {
        it('URL validation', () => {
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq(testData.url)
            })
        })

        it('Title validation', () => {
            PostPage.elements.postTitle().invoke('text').then((text) => {
                expect(text.trim(), 'Validating Title').to.equal(testData.title)
            })
        })

        it('Author validation', () => {
            PostPage.elements.authorTitle().invoke('text').then((text) => {
                expect(text.trim(), 'Validating Author').to.equal(testData.author)
            })
        })

        it('Category validation', () => {
            PostPage.elements.categoryTitle().invoke('text').then((text) => {
                expect(text.trim(), 'Validating Category').to.equal(testData.categories)
            })
        })

        it('Image validation', () => {
            PostPage.elements.img().invoke('attr', 'src').then((src) => {
                expect(src.trim(), 'Validating Image').to.equal(testData.image)
            })
        })

        it('Subscribe to newsletter', () => {
            PostPage.submitNewsletterForm((Math.floor(Math.random() * (9000 - 1000))) + testData.email)
            PostPage.elements.newsletterConfirmation().should('be.visible').invoke('text').then((text) => {
                expect(text.trim(), 'Validating Newsletter subscription').to.equal(testData.newsletterConfirmation)
            })
        })

        it('Invalid - Subscribe to newsletter', () => {
            PostPage.submitNewsletterForm('test@test.com')
            PostPage.elements.newsletterErrorMessage().invoke('text').then((text) => {
                expect(text.trim(), 'Validating Invalid Newsletter subscription').to.equal('Please enter a valid email address.')
            })
        })

        it('Print All Posts and Links', () => {
            HeaderPage.clickOnBlog()
            BlogPage.printAllPosts()
        });
    })
})