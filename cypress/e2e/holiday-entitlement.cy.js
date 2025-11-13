import { Cookies } from '../utils/cookies';
import { StartPage } from '../pages/calculate-entitlement';
import { IrregularPartYearPage } from '../pages/irregular-part-year';
import { LeaveYearStartPage } from '../pages/leave-year-start';
import { HoursWorkedPayPeriod } from '../pages/hours-worked-pay-period';
import { InfoBasedOnAnswers } from '../pages/info-based-on-answers';
import { EntitlementBasedOnPage } from '../pages/entitlement-based-on';
import { WorkOutHolidayPage } from '../pages/work-out-holiday';
import { DaysWorkedPerWeekPage } from '../pages/days-worked-week';

const cookies = new Cookies();
const startPage = new StartPage();
const irregularPartYearPage = new IrregularPartYearPage();
const leaveYearStartPage = new LeaveYearStartPage();
const hoursWorkedPayPeriodPage = new HoursWorkedPayPeriod();
const infoBasedOnAnswersPage = new InfoBasedOnAnswers();
const entitlementBasedOnPage = new EntitlementBasedOnPage();
const workOutHolidayPage = new WorkOutHolidayPage();
const daysWorkedPerWeekPage = new DaysWorkedPerWeekPage();

beforeEach(() => {
  cy.visit('/calculate-your-holiday-entitlement');
  cookies.accept();
});

describe('Holiday entitlement calculator', () => {
  it('T001 - Employee works irregular hours', () => {
    cy.log('Page: Calculate holiday entitlement');
    startPage.validateLayout();
    startPage.startButton.click();

    cy.log('Page: Does the employee work irregular hours or for part of the year?');
    irregularPartYearPage.validateLayout();
    irregularPartYearPage.radioButtonYes.click();
    irregularPartYearPage.continueButton.click();

    cy.log('Page: When does the leave year start?');
    leaveYearStartPage.runNegativeTests();
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

  it(`T002 - No irregular hours, days per week, full leave year`, () => {
    startPage.startButton.click();

    cy.log('Page: Does the employee work irregular hours or for part of the year?');
    irregularPartYearPage.validateLayout();
    irregularPartYearPage.radioButtonNo.click();
    irregularPartYearPage.continueButton.click();

    cy.log('Is the holiday entitlement based on');
    entitlementBasedOnPage.runNegativeTests();
    entitlementBasedOnPage.radioButtonDaysPerWeek.click();
    entitlementBasedOnPage.continueButton.click();

    cy.log('Do you want to work out holiday');
    workOutHolidayPage.runNegativeTests();
    workOutHolidayPage.radioButtonFullYear.click();
    workOutHolidayPage.continueButton.click();

    cy.log('Number of days worked per week?');
    daysWorkedPerWeekPage.runNegativeTests();
    daysWorkedPerWeekPage.validateLayout();
    daysWorkedPerWeekPage.daysInputField.type('5');
    daysWorkedPerWeekPage.continueButton.click();

    cy.log('Information based on your answers');
    infoBasedOnAnswersPage.validateLayout();
  });

  it.skip(`T003 - No irregular hours, days per week, starting part way through year `, () => {
    throw new Error('Test not yet implemented');
    // T003	Start	Click Start button
    // Does the employee work irregular hours or for part of the year?	Radio: No
    // Is the holiday entitlement based on	Radio: hours worked per week
    // Do you want to work out holiday	Radio: for someone starting part way through a leave year
    // What was the employment start date?	Input: 01/01/2023
    // When does the leave year start?	Input: 01/04/2022
    // Number of hours worked per week?	Input: 40
    // Number of days worked per week?	Input: 5
    // Information based on your answers	Validate page
  });

  it.skip(`T004 - No irregular hours, compressed hours, part way through leave year `, () => {
    throw new Error('Test not yet implemented');
    // T004	Start	Click Start button
    // Does the employee work irregular hours or for part of the year?	Radio: No
    // Is the holiday entitlement based on	Radio: compressed hours
    // Do you want to work out holiday	Radio: for someone starting part way through a leave year
    // What was the employment end date? 	Input: 11/11/2025
    // When does the leave year start?	Input: 01/01/2025
    // Number of days worked per week?	Input: 5
    // Information based on your answers	Validate page
  });

  it.skip(`T005 - No irregular hours, shifts, full leave year `, () => {
    throw new Error('Test not yet implemented');
    // T005	Start	Click Start button
    // Does the employee work irregular hours or for part of the year?	Radio: No
    // Is the holiday entitlement based on	Radio: shifts
    // Do you want to work out holiday	Radio: for a full leave year
    // Number of days worked per week?	Input: 5
    // Information based on your answers	Validate page
  });
});
