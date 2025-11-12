import { Cookies } from '../pages/utils/cookies';
import { StartPage } from '../pages/start';
import { IrregularPartYearPage } from '../pages/irregular-part-year';
import { LeaveYearStartPage } from '../pages/leave-year-start';
import { HoursWorkedPayPeriod } from '../pages/hours-worked-pay-period';
import { InfoBasedOnAnswers } from '../pages/info-based-on-answers';

const cookies = new Cookies();
const startPage = new StartPage();
const irregularPartYearPage = new IrregularPartYearPage();
const leaveYearStartPage = new LeaveYearStartPage();
const hoursWorkedPayPeriodPage = new HoursWorkedPayPeriod();
const infoBasedOnAnswersPage = new InfoBasedOnAnswers();

describe('Holiday entitlement calculator', () => {
  it('T001 - Employee works irregular hours', () => {
    cy.visit('/calculate-your-holiday-entitlement');
    cookies.accept();

    cy.log('Page: Calculate holiday entitlement');
    startPage.validateLayout();
    startPage.startButton.click();

    cy.log(
      'Page: Does the employee work irregular hours or for part of the year?'
    );
    irregularPartYearPage.validateLayout();
    irregularPartYearPage.radioButtonYes.click();
    irregularPartYearPage.continueButton.click();

    cy.log('Page: When does the leave year start?');
    leaveYearStartPage.validateLayout();
    leaveYearStartPage.dayField.type('11');
    leaveYearStartPage.monthField.type('11');
    leaveYearStartPage.yearField.type('2025');
    leaveYearStartPage.continueButton.click();

    cy.log('Page: How many hours has the employee worked in the pay period?');
    hoursWorkedPayPeriodPage.validateLayout();
    hoursWorkedPayPeriodPage.hoursInputField.type('160');
    hoursWorkedPayPeriodPage.continueButton.click();

    cy.log('Information based on your answers');
    infoBasedOnAnswersPage.validateLayout();
  });
});
