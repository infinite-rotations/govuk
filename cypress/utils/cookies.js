export class Cookies {
  /**
   * Accepts the GOV.UK cookie banner.
   *
   * By default, it also hides the cookie banner message. You can override this behavior
   * by passing `{ hideCookiesMessage: false }`.
   *
   * @param {Object} [options] - Options object to control cookie acceptance behavior
   * @param {boolean} [options.hideCookiesMessage=true] - Whether to hide the cookie banner message
   *
   * @example
   * // Default behavior, hides the banner
   * pom.cookies.acceptCookies();
   *
   * @example
   * // Accept cookies but leave the banner visible
   * pom.cookies.acceptCookies({ hideCookiesMessage: false });
   */
  accept({ hideCookiesMessage = true } = {}) {
    cy.get('[class="js-confirmation-buttons govuk-button-group"]')
      .contains('Accept additional cookies')
      .click();

    if (hideCookiesMessage) {
      cy.get('[data-hide-cookie-banner="true"]').should('be.visible').click();
    }
  }
}
