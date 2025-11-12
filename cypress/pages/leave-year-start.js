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
    this.dayField.parent().clear();
    this.monthField.parent().clear();
    this.yearField.parent().clear();
  }

  runNegativeTests() {
    this.clearFields();
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
  }
}
