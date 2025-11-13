export class InfoBasedOnAnswers {
  get url() {
    return cy.url();
  }

  get navBar() {
    return cy.get('[class*="super-navigation-header__header"]');
  }

  get titleText() {
    return cy.get('[class*="govuk-heading-x"]');
  }
  get bodyText() {
    return cy.get('[class^="gem-c-govspeak govuk-govspeak"]');
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
   * Validates the layout of the Holiday Entitlement page for irregular hours and part-year cases.
   *
   * This method performs the following checks using Cypress:
   *  - Ensures the URL includes the correct page path.
   *  - Verifies the navigation bar is visible.
   *  - Checks the page title contains the expected text.
   *  - Checks the body contains the expected statutory entitlement text.
   *  - Ensures the contextual sidebar is visible.
   *  - Ensures the contextual footer does NOT exist.
   *  - Checks that the feedback prompt is visible.
   *  - Checks that the GOV.UK footer is visible.
   *
   * @returns {void} This method performs assertions using Cypress; it does not return a value.
   */
  validateLayout() {
    this.url.should(
      'include',
      'https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/',
    );

    this.navBar.should('be.visible');
    // Use object to validate text?
    this.titleText.should('be.visible').and('contain.text', 'Information based on your answers');
    this.bodyText
      .should('be.visible')
      .and('contain.text', 'The statutory entitlement for this pay period is 19 hours.')
      .and(
        'contain.text',
        'Employees cannot accrue more than 28 days (5.6 weeks) over the leave year.',
      );

    this.contextualSideBar.should('be.visible');
    this.contextualFooter.should('not.exist');
    this.feedbackPrompt.should('be.visible');
    this.govFooter.should('be.visible');
  }
}
