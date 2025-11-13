export class LeaveYearStartPage {
  expectedPageURL = 'https://www.gov.uk/calculate-your-holiday-entitlement/y';

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

  get dayField() {
    return cy.get('[class^="gem-c-input govuk-input"]').parent().contains('Day');
  }
  get monthField() {
    return cy.get('[class^="gem-c-input govuk-input"]').parent().contains('Month');
  }
  get yearField() {
    return cy.get('[class^="gem-c-input govuk-input"]').parent().contains('Year');
  }

  get radioButtonYes() {
    return cy.get('[class="gem-c-radio govuk-radios__item"]').contains('Yes');
  }

  get radioButtonNo() {
    return cy.get('[class="gem-c-radio govuk-radios__item"]').contains('No');
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
   * Clears the input fields for MM/DD/YYYY.
   */
  clearFields() {
    this.dayField.parent().then(($el) => {
      if ($el.length > 0) {
        cy.wrap($el).clear();
      }
    });
    this.monthField.parent().then(($el) => {
      if ($el.length > 0) {
        cy.wrap($el).clear();
      }
    });
    this.yearField.parent().then(($el) => {
      if ($el.length > 0) {
        cy.wrap($el).clear();
      }
    });
    // this.dayField.parent().clear();
    // this.monthField.parent().clear();
    // this.yearField.parent().clear();
  }

  /**
   * Runs a suite of negative tests on the "Leave Year Start" page.
   *
   * This test method verifies that the form correctly handles invalid or missing inputs
   * and displays appropriate error messages without navigating away from the page.
   *
   * **Note:** This should be executed *before* `validateLayout()`
   * to ensure the page starts in a clean, unvalidated state.
   *
   * Test cases covered:
   *  1. **No data entered:** Clicking "Continue" without filling in any fields.
   *  2. **Invalid day:** Day = 99, Month/Year left empty.
   *  3. **Invalid date combination:** Day = 00, Month = 11, Year = 2025.
   *
   * Expected results:
   *  - Error summary and hint messages appear with "Please answer this question".
   *  - URL remains the same (no navigation occurs).
   *  - Fields can be cleared and reused between tests.
   *
   * @returns {void} Performs Cypress assertions; does not return a value.
   */
  runNegativeTests() {
    /**
     * No data entered
     */
    this.continueButton.click();
    this.errorSummary.should('be.visible').and('contain.text', 'Please answer this question');
    this.errorHint.should('be.visible').and('contain.text', 'Please answer this question');
    this.url.should('include', this.expectedPageURL);

    /**
     * Invalid day, nothing in MM/YYYY
     */
    this.dayField.type('99');
    this.continueButton.click();
    this.errorSummary.should('be.visible').and('contain.text', 'Please answer this question');
    this.errorHint.should('be.visible').and('contain.text', 'Please answer this question');
    this.url.should('include', this.expectedPageURL);

    /**
     * Invalid month, valid MM/YYYY
     */
    this.clearFields();
    this.dayField.type('00');
    this.monthField.type('11');
    this.yearField.type('2025');
    this.continueButton.click();
    this.errorSummary.should('be.visible').and('contain.text', 'Please answer this question');
    this.errorHint.should('be.visible').and('contain.text', 'Please answer this question');
    this.url.should('include', this.expectedPageURL);

    /**
     * Invalid chars
     */
    this.clearFields();
    this.dayField.type('!');
    this.monthField.type('11');
    this.yearField.type('2025');
    this.continueButton.click();
    this.errorSummary.should('be.visible').and('contain.text', 'Please answer this question');
    this.errorHint.should('be.visible').and('contain.text', 'Please answer this question');
    this.url.should('include', this.expectedPageURL);

    this.clearFields(); // Leave in a clean state
  }
}
