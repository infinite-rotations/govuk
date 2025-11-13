export class DaysWorkedPerWeekPage {
  expectedPageURL =
    'https://www.gov.uk/calculate-your-holiday-entitlement/y/regular/days-worked-per-week';

  get url() {
    return cy.url();
  }

  // Standard page elements
  get navBar() {
    return cy.get('[class*="super-navigation-header__container"]');
  }

  get breadcrumbs() {
    return cy.get('[class*="contextual-breadcrumbs"]');
  }

  get titleText() {
    return cy.get('[class="govuk-label-wrapper"] [class^="gem-c-label govuk-label"]');
  }

  get daysInputField() {
    return cy.get('[class*="govuk-input govuk-input"]');
  }

  get continueButton() {
    return cy.get('[class*="gem-c-button govuk-button"]:visible');
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

  // Error elements
  get errorSummary() {
    return cy.get('[data-module^="ga4-auto-tracker govuk-error-summary"]');
  }

  get errorHint() {
    return cy.get('.govuk-form-group .govuk-error-message').first();
  }

  /**
   * Validates that all key layout and content elements of the
   * "Leave Year Start" page are visible and correctly rendered.
   *
   * This method performs positive UI checks — verifying that expected
   * page components exist, are visible, and contain the correct text.
   * It ensures the page is in the correct state before any user input or
   * functional testing (e.g. before running negative tests).
   *
   * Assertions include:
   *  - URL includes the expected page path.
   *  - Navigation bar is visible.
   *  - Breadcrumbs do not exist on this page.
   *  - Title and body text match expected content.
   *  - Date input fields and Continue button are present.
   *  - Contextual sidebar and footer are not displayed.
   *  - Feedback prompt and GOV.UK footer are visible.
   *
   * @returns {void} Performs Cypress assertions only; does not return a value.
   */
  validateLayout() {
    this.url.should('include', this.expectedPageURL);

    this.navBar.should('be.visible');
    this.breadcrumbs.should('not.exist');
    this.titleText.should('be.visible').and('contain.text', 'Number of days worked per week?');
    this.continueButton.should('be.visible').and('contain.text', 'Continue');
    this.contextualSideBar.should('not.exist');
    this.contextualFooter.should('not.exist');
    this.feedbackPrompt.should('be.visible');
    this.govFooter.should('be.visible');
  }

  /**
   * Executes negative test scenarios for the **days input field**
   * on the GOV.UK Holiday Entitlement Calculator page.
   *
   * Purpose:
   * Ensures that invalid or malformed input into the "days" field
   * is correctly handled with error messages and that the user
   * remains on the same page.
   *
   * Scenarios covered:
   *  1. **No value entered** – submitting the form without input.
   *  2. **Text input** – user enters alphabetic characters.
   *  3. **Special characters** – user enters symbols such as "!@£$%^&*()".
   *
   * Each scenario verifies that:
   *  - The error summary is displayed with the correct validation message.
   *  - The inline error hint shows the same message.
   *  - The page URL remains unchanged (`this.expectedPageURL`).
   *  - Fields are cleared between test steps as needed.
   *
   * @returns {void} Performs Cypress assertions; no return value.
   */
  runNegativeTests() {
    /**
     * No value entered
     */
    this.continueButton.click();
    this.errorSummary
      .should('be.visible')
      .and(
        'contain.text',
        'There are only 7 days in a week. Please check and enter a correct value.',
      );
    this.errorHint
      .should('be.visible')
      .and(
        'contain.text',
        'There are only 7 days in a week. Please check and enter a correct value.',
      );
    this.url.should('include', this.expectedPageURL);

    /**
     * Text entered
     */
    this.daysInputField.type('textshouldnotbeallowed');
    this.errorSummary
      .should('be.visible')
      .and(
        'contain.text',
        'There are only 7 days in a week. Please check and enter a correct value.',
      );
    this.errorHint
      .should('be.visible')
      .and(
        'contain.text',
        'There are only 7 days in a week. Please check and enter a correct value.',
      );
    this.url.should('include', this.expectedPageURL);
    this.daysInputField.clear();

    /**
     * Special characters entered
     */
    this.daysInputField.type('!@£$%^&*()');
    this.errorSummary
      .should('be.visible')
      .and(
        'contain.text',
        'There are only 7 days in a week. Please check and enter a correct value.',
      );
    this.errorHint
      .should('be.visible')
      .and(
        'contain.text',
        'There are only 7 days in a week. Please check and enter a correct value.',
      );
    this.url.should('include', this.expectedPageURL);
    this.daysInputField.clear();
  }
}
