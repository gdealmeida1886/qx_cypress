/// <reference types="cypress"/>

import HomePage from "../pages/home.page.cy";

describe("Tasks", () => {
  let taskList;
  const homePage = new HomePage();

  beforeEach(() => {
    cy.fixture("homePage_fixture").then((tasks) => {
      taskList = tasks;
    });

    homePage.goToHomePage();
  });

  context("Tasks Register", () => {
    it("Should Add A New Task", () => {
      cy.removeTaskByName(taskList.simpleTask);
      homePage.createNewTask(taskList.simpleTask);
      homePage.checkForTask(taskList.simpleTask, true);
    });

    it("Should not allow duplicated tasks", () => {
      cy.removeTaskByName(taskList.duplicatedTask.name);
      cy.addNewTask(taskList.duplicatedTask);
      homePage.createNewTask(taskList.duplicatedTask.name);
      homePage.checkAlertWarning("Task already exists!");
    });

    it("Should not create an empty task", () => {
      homePage.createNewTask();
      homePage.checkInputValidationMessage("This is a required field");
    });
  });

  context('Tasks Conclusion', () => { 
    it('Should mark a task as completed', () => { 
        cy.removeTaskByName(taskList.completeTask.name);
        cy.addNewTask(taskList.completeTask);
        cy.reload();
        homePage.clickCompleteTaskButton(taskList.completeTask.name);
        homePage.checkTaskStatus(taskList.completeTask.name, true);
    })

    it('Should mark a task as not completed', () => { 
        cy.removeTaskByName(taskList.completeTask.name);
        cy.addNewTask(taskList.completeTask);
        cy.reload();
        homePage.clickCompleteTaskButton(taskList.completeTask.name);
        homePage.clickCompleteTaskButton(taskList.completeTask.name);
        homePage.checkTaskStatus(taskList.completeTask.name, false);
    })
  });

  context('Task Deletion', () => { 
    it('Should delete a task', () => {
        cy.removeTaskByName(taskList.deleteTask.name);
        cy.addNewTask(taskList.deleteTask);
        cy.reload();    
        homePage.deleteTask(taskList.deleteTask.name);
        homePage.checkForTask(taskList.deleteTask.name, false)
    })
  });
});
