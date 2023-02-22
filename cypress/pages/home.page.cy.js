export default class HomePage {
  constructor() {
    this.apiURL = "http://localhost:3333/";
    this.inputField = "#newTask";
    this.createTaskButton = "button";
  }

  goToHomePage() {
    cy.visit('/');
  }

  createNewTask(taskName = "") {
    if (taskName != "") {
      cy.get(this.inputField).should("be.visible").type(taskName);
    }
    cy.get(this.createTaskButton).contains("Create").click();
  }

  checkForTask(taskName, exists) {
    if (exists) {
      cy.get("p").contains(taskName).should('exist');
    } else { 
      cy.get("p").contains(taskName).should('not.exist');
    }
  }

  checkAlertWarning(alertText) {
    cy.get(".swal2-html-container")
      .should("be.visible")
      .should("have.text", alertText);
  }

  checkInputValidationMessage(textMessage) {
    cy.get(this.inputField)
      .invoke("prop", "validationMessage")
      .should((text) => {
        expect(text).to.eq(textMessage);
      });
  }

  clickCompleteTaskButton(taskName) {
    cy.get("p")
      .contains(taskName)
      .parent()
      .find("button[class*=listItemToggle]")
      .click();
  }

  checkTaskStatus(taskName, status = true) {
    if (status) {
      cy.get("p")
      .contains(taskName)
      .should('have.css', "text-decoration-line", "line-through")
    } else { 
      cy.get("p")
      .contains(taskName)
      .should('not.have.css', "text-decoration-line", "line-through")
    }
  }

  deleteTask(taskName) {
    cy.get('p')
      .contains(taskName)
      .parent()
      .find("button[class*=listItemDeleteButton]")
      .click()
  }
}
