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
   * Validates that all key UI elements on the **"Leave Year Start"** page
   * of the GOV.UK Holiday Entitlement Calculator are present, visible,
   * and contain the expected text.
   *
   * This ensures that the page layout renders correctly and that no
   * essential components (navigation, footer, or prompts) are missing.
   *
   * Checks performed:
   *  - Confirms the browser is on the expected URL (`this.expectedPageURL`).
   *  - Verifies visibility of key elements: navigation bar, title, form fields,
   *    and footer components.
   *  - Ensures text content matches expected headings and body copy.
   *  - Confirms that elements which should not appear (e.g., contextual sidebar/footer)
   *    are correctly absent.
   *
   * @returns {void} Performs Cypress assertions; no return value.
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
  }

  /**
   * Executes a suite of **negative test cases** for the
   * "Leave Year Start" page in the GOV.UK Holiday Entitlement Calculator.
   *
   * This method verifies that the form correctly handles invalid or missing input
   * by displaying appropriate error messages and preventing navigation.
   *
   * Scenarios covered:
   *  1. **No data entered** — user submits an empty form.
   *  2. **Invalid day** — day field contains invalid value (e.g. `99`), with missing month/year.
   *  3. **Invalid month** — day set to `00`, invalid month combination with valid year.
   *  4. **Invalid characters** — non-numeric input (e.g. `!`) in date fields.
   *
   * Each scenario checks that:
   *  - The error summary and inline error hints appear and contain expected text.
   *  - The page URL remains unchanged (`this.expectedPageURL`).
   *  - Fields are cleared between test runs.
   *
   * @returns {void} Performs Cypress assertions; no return value.
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
    this.clearFields();

    /**
     * Invalid month, valid MM/YYYY
     */
    this.dayField.type('00');
    this.monthField.type('11');
    this.yearField.type('2025');
    this.continueButton.click();
    this.errorSummary.should('be.visible').and('contain.text', 'Please answer this question');
    this.errorHint.should('be.visible').and('contain.text', 'Please answer this question');
    this.url.should('include', this.expectedPageURL);
    this.clearFields();

    /**
     * Invalid chars
     */
    this.dayField.type('!');
    this.monthField.type('11');
    this.yearField.type('2025');
    this.continueButton.click();
    this.errorSummary.should('be.visible').and('contain.text', 'Please answer this question');
    this.errorHint.should('be.visible').and('contain.text', 'Please answer this question');
    this.url.should('include', this.expectedPageURL);
    this.clearFields();
  }
}
