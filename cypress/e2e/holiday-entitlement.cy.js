import { Cookies } from '../pages/utils/cookies';
import { StartPage } from '../pages/start';
import { IrregularPartYearPage } from '../pages/irregular-part-year';
import { LeaveYearStartPage } from '../pages/leave-year-start';

const cookies = new Cookies();
const startPage = new StartPage();
const irregularPartYearPage = new IrregularPartYearPage();
const leaveYearStartPage = new LeaveYearStartPage();

describe('Holiday entitlement calculator', () => {
  it('Test ID: T001', () => {
    cy.visit('/calculate-your-holiday-entitlement');
    cookies.accept();

    cy.log('Start page loads');
    startPage.validateLayout();
    startPage.startButton.click();

    cy.log('Irregular / part / year page loads');
    irregularPartYearPage.validateLayout();
    irregularPartYearPage.radioButtonYes.click();
    irregularPartYearPage.continueButton.click();

    cy.log('Leave year page loads');
    leaveYearStartPage.validateLayout();

    // When does the leave year start?	Input: 11/11/2025
    // How many hours has the employee worked in the pay period?	Input: 160
    // Information based on your answers
  });
});
