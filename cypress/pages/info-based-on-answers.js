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
   * Validates the layout and content of the **"Results Summary"** page
   * in the GOV.UK Holiday Entitlement Calculator.
   *
   * This method ensures that the results page correctly displays the
   * calculated entitlement information and the appropriate supporting
   * UI components.
   *
   * Checks performed:
   *  - Confirms the user is on the correct results summary URL.
   *  - Ensures the navigation bar and footer are visible.
   *  - Validates that the results title and summary text are displayed.
   *  - Confirms that contextual sidebar content is present.
   *  - Ensures that the contextual footer does not appear on this page.
   *  - Verifies visibility of the feedback prompt and GOV.UK footer.
   *
   * @returns {void} Performs Cypress assertions; no return value.
   */
  validateLayout() {
    this.url.should('include', 'https://www.gov.uk/calculate-your-holiday-entitlement/y/');

    this.navBar.should('be.visible');
    // Use object to validate text?
    this.titleText.should('be.visible').and('contain.text', 'Information based on your answers');
    this.bodyText.should('be.visible').and('contain.text', 'The statutory');
    this.contextualSideBar.should('be.visible');
    this.contextualFooter.should('not.exist');
    this.feedbackPrompt.should('be.visible');
    this.govFooter.should('be.visible');
  }
}
