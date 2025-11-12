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

  validateLayout() {
    this.url.should(
      'include',
      'https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/'
    );

    this.navBar.should('be.visible');
    // Use object to validate text?
    this.titleText
      .should('be.visible')
      .and('contain.text', 'Information based on your answers');
    this.bodyText
      .should('be.visible')
      .and(
        'contain.text',
        'The statutory entitlement for this pay period is 19 hours.'
      );

    this.contextualSideBar.should('be.visible');
    this.contextualFooter.should('not.exist');
    this.feedbackPrompt.should('be.visible');
    this.govFooter.should('be.visible');
  }
}
