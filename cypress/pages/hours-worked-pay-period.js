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
