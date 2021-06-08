// <reference type="cypress" />;

describe("Our first suite", () => {
  it("first test", () => {
    cy.get("input");
  });

  it("second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get("[data-cy='signInButton']");
  });

  it("then and wrap methods", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //!!! then => we moved to jQuery context and we have access to jQuery methods
    // F.E. Find - from jQuery
    // Cypress - асинхронний і єдиний спосіб зберігати в змінні - це перейти в контекст jQuery
    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();

      expect(emailLabelFirst).to.equal("Email");
      expect(passwordLabelFirst).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const emailLabelSecond = secondForm
          .find('[for="exampleInputEmail1"]')
          .text();
        const passwordLabelSecond = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();

        expect(passwordLabelSecond).to.equal(passwordLabelFirst);

        //!!! wrap => we moved to Cypress context  again and we have access to Cypress methods
        // F.E. Find - from Cypress
        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should("contain", "Password");
      });
    });
  });

  it.only("invoke command ", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();


    // 1
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address")

    // 2
    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal("Email address")
    })

  });
});
