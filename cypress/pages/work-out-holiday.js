export class WorkOutHolidayPage {
  expectedPageURL = 'https://www.gov.uk/calculate-your-holiday-entitlement/y/regular/';

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
    return cy.get('[class*="govuk-fieldset__heading"]');
  }
  get bodyText() {
    return cy.get('[class*="govuk-hint govuk"]');
  }

  get radioButtonFullYear() {
    return cy
      .get('[class="govuk-radios"] [class="gem-c-label govuk-label govuk-radios__label"]')
      .contains('full leave year');
  }

  get radioButtonStartingPartWayThroughYear() {
    return cy
      .get('[class="govuk-radios"] [class="gem-c-label govuk-label govuk-radios__label"]')
      .contains('starting part way');
  }

  get radioButtonLeavingPartWayThroughYear() {
    return cy
      .get('[class="govuk-radios"] [class="gem-c-label govuk-label govuk-radios__label"]')
      .contains('leaving part way');
  }

  get radioButtonStartingAndLeavingPartWayThroughYear() {
    return cy
      .get('[class="govuk-radios"] [class="gem-c-label govuk-label govuk-radios__label"]')
      .contains('starting and leaving');
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
    this.titleText.should('be.visible').and('contain.text', 'When does the leave year start?');
    this.bodyText
      .should('be.visible')
      .and('contain.text', 'This is usually in the employment contract.');
    this.dayField.should('be.visible');
    this.monthField.should('be.visible');
    this.yearField.should('be.visible');
    this.continueButton.should('be.visible').and('contain.text', 'Continue');
    this.contextualSideBar.should('not.exist');
    this.contextualFooter.should('not.exist');
    this.feedbackPrompt.should('be.visible');
    this.govFooter.should('be.visible');
  }

  /**
   * Runs negative test scenarios for the
   * **"Irregular Hours or Part-Year"** question page.
   *
   * Purpose:
   * Ensures the page correctly handles invalid user behaviour,
   * such as clicking "Continue" without making a selection.
   *
   * Validations performed:
   *  - Clicking "Continue" without selecting an option triggers
   *    an error summary banner.
   *  - The inline error hint message is displayed with the correct text.
   *  - The user remains on the same page (URL includes expected value).
   *
   * @returns {void} Executes Cypress assertions; does not return a value.
   */
  runNegativeTests() {
    /**
     * No radio button selected
     */
    this.continueButton.click();
    this.errorSummary.should('be.visible').and('contain.text', 'Please answer this question');
    this.errorHint.should('be.visible').and('contain.text', 'Please answer this question');
    this.url.should('include', this.expectedPageURL);
  }
}
