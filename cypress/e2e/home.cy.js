/// <reference types="cypress"/>
import HomePage from "../pages/home.page.cy";

describe('Home', () => {
  const homePage = new HomePage;

  it('should be online', () => {
    homePage.goToHomePage();
  })
})