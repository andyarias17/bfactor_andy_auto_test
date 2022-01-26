export default function(e, cb) {
    cy.wait(1000);
    cy.get('body').then(body => {
      if (body.find(e).length > 0) {
        cb();
      }
    });
  }