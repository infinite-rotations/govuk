import { Cookies } from '../pages/utils/cookies';
import { StartPage } from '../pages/start';
import { IrregularPartYearPage } from '../pages/irregular-part-year';
import { LeaveYearStartPage } from '../pages/leave-year-start';
import { HoursWorkedPayPeriod } from '../pages/hours-worked-pay-period';

const cookies = new Cookies();
const startPage = new StartPage();
const irregularPartYearPage = new IrregularPartYearPage();
const leaveYearStartPage = new LeaveYearStartPage();
const hoursWorkedPayPeriodPage = new HoursWorkedPayPeriod();

describe('Holiday entitlement calculator', () => {
  it('Test ID: T001', () => {
    cy.visit('/calculate-your-holiday-entitlement');
    cookies.accept();

    cy.log('Page: Start');
    startPage.validateLayout();
    startPage.startButton.click();

    cy.log('Page: Irregular / part / year');
    irregularPartYearPage.validateLayout();
    irregularPartYearPage.radioButtonYes.click();
    irregularPartYearPage.continueButton.click();

    cy.log('Page: Leave year');
    leaveYearStartPage.validateLayout();
    leaveYearStartPage.dayField.type('11');
    leaveYearStartPage.monthField.type('11');
    leaveYearStartPage.yearField.type('2025');
    leaveYearStartPage.continueButton.click();

    cy.log('Page: Hours worked in the pay period');
    hoursWorkedPayPeriodPage.validateLayout();

    // How many hours has the employee worked in the pay period?	Input: 160
    // Information based on your answers
  });
});
