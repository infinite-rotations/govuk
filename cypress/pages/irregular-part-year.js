export class IrregularPartYearPage {
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
    return cy.get('[class*="govuk-fieldset__heading"]');
  }
  get bodyText() {
    return cy.get('[class="gem-c-hint govuk-hint"]');
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

  /**
   * Validates the layout and core UI elements of the
   * "Irregular hours or part-year" question page in the
   * GOV.UK Holiday Entitlement Calculator flow.
   *
   * This method ensures that the page renders correctly and
   * all interactive and informational elements are visible and
   * contain the expected content before user interaction.
   *
   * Assertions include:
   *  - URL includes the correct question path segment.
   *  - Navigation bar is visible.
   *  - Breadcrumbs are not displayed on this step.
   *  - Title text matches the expected question.
   *  - Body text correctly explains the meaning of irregular hours.
   *  - Both radio buttons (“Yes” / “No”) are visible and unselected.
   *  - Continue button is visible and correctly labelled.
   *  - Contextual sidebar and footer are not displayed.
   *  - Feedback prompt and GOV.UK footer are visible.
   *
   * @returns {void} Performs Cypress assertions; no return value.
   */
  validateLayout() {
    this.url.should('include', 'https://www.gov.uk/calculate-your-holiday-entitlement/y');

    this.navBar.should('be.visible');
    this.breadcrumbs.should('not.exist');
    this.titleText
      .should('be.visible')
      .and('contain.text', 'Does the employee work irregular hours or for part of the year?');
    this.bodyText
      .should('be.visible')
      .and('contain.text', '‘Irregular hours’ means the number of hours an employee');
    this.radioButtonYes.should('be.visible').and('not.be.checked');
    this.radioButtonNo.should('be.visible').and('not.to.be.checked');
    this.continueButton.should('be.visible').and('contain.text', 'Continue');
    this.contextualSideBar.should('not.exist');
    this.contextualFooter.should('not.exist');
    this.feedbackPrompt.should('be.visible');
    this.govFooter.should('be.visible');
  }
}
