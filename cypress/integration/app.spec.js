context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Testing App Loaded", () => {
    cy.get("#qa-app").should("exist");
  });

  it("Creating Todo", () => {
    cy.get("#qa-todo-input").should("exist").type("Task 1");
    cy.get("#qa-submit-btn").should("exist").click();
    cy.get(".qa-listItem").should("have.text", "Task 1");
    cy.get("#qa-count").should("have.text", "All(1)");
  });

  it("Marking Task Done", () => {
    cy.get("#qa-todo-input").type("Task 1");
    cy.get("#qa-submit-btn").click();
    cy.get(".qa-done-btn").click();
    cy.get(".qa-done-btn").should("not.exist");
    cy.get("#qa-count").should("have.text", "All(1)");
  });

  it("Deleting Task Done", () => {
    cy.get("#qa-todo-input").type("Task 1");
    cy.get("#qa-submit-btn").click();
    cy.get(".qa-delete-btn").click();
    cy.get("#qa-listItem").should("not.exist");
    cy.get("#qa-no-data").should("exist");
    cy.get("#qa-count").should("have.text", "All(0)");
  });

  it("Active Task", () => {
    cy.get("#qa-todo-input").type("Task 1");
    cy.get("#qa-submit-btn").click();
    cy.get("#qa-todo-input").type("Task 2");
    cy.get("#qa-submit-btn").click();
    cy.get(".qa-done-btn").first().click();
    cy.get("#Active").click();
    cy.get(".qa-listItem")
      .should("have.length", 1)
      .should("have.text", "Task 2");
    cy.get("#qa-count").should("have.text", "All(1)");
  });

  it("Completed Task", () => {
    cy.get("#qa-todo-input").type("Task 1");
    cy.get("#qa-submit-btn").click();
    cy.get("#qa-todo-input").type("Task 2");
    cy.get("#qa-submit-btn").click();
    cy.get(".qa-done-btn").first().click();
    cy.get("#Completed").click();
    cy.get(".qa-listItem")
      .should("have.length", 1)
      .should("have.text", "Task 1");
    cy.get("#qa-count").should("have.text", "All(1)");
  });

  it("All Task", () => {
    cy.get("#qa-todo-input").type("Task 1");
    cy.get("#qa-submit-btn").click();
    cy.get("#qa-todo-input").type("Task 2");
    cy.get("#qa-submit-btn").click();
    cy.get("#All").click();
    cy.get(".qa-listItem")
      .should("have.length", 2)
    cy.get("#qa-count").should("have.text", "All(2)");
  });
});
