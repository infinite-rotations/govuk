export class HoursWorkedPayPeriod {
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
    return cy.get('[class="govuk-label-wrapper"] [class*="govuk-label"]');
  }
  get bodyText() {
    return cy.get('[class*="govuk-hint govuk"]');
  }

  get hoursInputField() {
    return cy.get('[class*="govuk-input"]');
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

  /**
   * Validates the layout and core UI elements of the
   * GOV.UK "Hours Worked in Pay Period" page within the
   * Holiday Entitlement Calculator flow.
   *
   * This method ensures the page structure, visibility, and
   * content are as expected. It’s designed to confirm that
   * the correct question and input field are displayed to
   * the user for entering hours worked.
   *
   * Assertions include:
   *  - Current URL includes the expected GOV.UK calculator path
   *    with the correct date segment.
   *  - Navigation bar is visible.
   *  - Breadcrumbs are not displayed on this page.
   *  - Page title contains the correct question text.
   *  - Body text is intentionally absent.
   *  - The hours input field and “Continue” button are visible.
   *  - Contextual sidebar and footer are not present.
   *  - Feedback prompt and GOV.UK footer are visible.
   *
   * @returns {void} Performs Cypress assertions; no return value.
   */
  validateLayout() {
    this.url.should(
      'include',
      'https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/2025-11-11',
    );

    this.navBar.should('be.visible');
    this.breadcrumbs.should('not.exist');
    this.titleText
      .should('be.visible')
      .and('contain.text', 'How many hours has the employee worked in the pay period?');
    this.bodyText.should('not.exist');
    this.hoursInputField.should('be.visible');
    this.continueButton.should('be.visible').and('contain.text', 'Continue');
    this.contextualSideBar.should('not.exist');
    this.contextualFooter.should('not.exist');
    this.feedbackPrompt.should('be.visible');
    this.govFooter.should('be.visible');
  }
}
