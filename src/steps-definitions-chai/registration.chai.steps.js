const { Given, When, Then } = require('@wdio/cucumber-framework');
const {LoginPage, RegistrationPage} = require("../po/index");
const { registrationUser } = require('../test-data/users'); 

Given('the user is on the registration page', async () => {
  await RegistrationPage.openRegistrationPage();
  await RegistrationPage.waitUntilExists(RegistrationPage.form);
});

When('he uses valid registration data', async () => {
  await RegistrationPage.registerNewUser(registrationUser);
});

Then('the user should be redirected to the login page', async () => {
  await LoginPage.expectOnLoginPage();
});
