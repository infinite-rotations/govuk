export class StartPage {
  get url() {
    return cy.url();
  }

  get navBar() {
    return cy.get('[class*="super-navigation-header__container"]');
  }

  get breadcrumbs() {
    return cy.get('[class*="contextual-breadcrumbs"]');
  }
  get titleText() {
    return cy.get('[class^="gem-c-heading"]');
  }
  get bodyText() {
    return cy.get('[data-module="govspeak"]');
  }

  get startButton() {
    return cy.get('[class*="govuk-button--start"]');
  }

  get contextualSideBar() {
    return cy.get('[class*="contextual-sidebar"]');
  }

  get contextualFooter() {
    return cy.get('[class*="contextual-footer"]');
  }

  get feedbackPrompt() {
    return cy.get('[class*="feedback__prompt gem-c"]');
  }

  get govFooter() {
    return cy.get('[class*="govuk-footer"] [class="govuk-width-container"]');
  }

  /**
   * Validates the layout and key UI elements of the
   * GOV.UK "Holiday Entitlement Calculator" start page.
   *
   * This function performs positive assertions to ensure that the
   * page has loaded correctly and all expected sections are visible.
   * It checks the structure, key texts, and core interactive elements.
   *
   * Assertions include:
   *  - Page URL includes the correct GOV.UK calculator path.
   *  - Navigation bar and breadcrumbs are visible.
   *  - Page title and body text contain the expected content.
   *  - “Start now” button is visible and correctly labelled.
   *  - Contextual sidebar and footer contain the correct sections.
   *  - Feedback prompt and GOV.UK footer are visible.
   *
   * @returns {void} Performs Cypress assertions; no return value.
   */
  validateLayout() {
    this.url.should('include', 'https://www.gov.uk/calculate-your-holiday-entitlement');
    this.navBar.should('be.visible');
    this.breadcrumbs.should('be.visible');
    this.titleText.should('be.visible').and('contain.text', 'Calculate holiday entitlement');
    this.bodyText
      .should('be.visible')
      .and('contain.text', 'Use this tool to calculate holiday entitlement');
    this.startButton.should('be.visible').and('contain.text', 'Start now');
    this.contextualSideBar.should('be.visible').and('contain.text', 'Related content');
    this.contextualFooter.should('be.visible').and('contain.text', 'Explore the topic');
    this.feedbackPrompt.should('be.visible');
    this.govFooter.should('be.visible');
  }
}
