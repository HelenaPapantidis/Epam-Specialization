const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect ,assert} = require('chai');
const RegistrationPage = require('../pageobjects/registration.page.js');
const LoginPage = require('../pageobjects/login.page.js');

const uniqueEmail = `qa_${Date.now()}@test.com`;

Given('the user is on the registration page', async () => {
  await browser.url('/auth/register');
  await RegistrationPage.waitOpened();
});

When('he uses valid registration data', async () => {
  await RegistrationPage.registerNewUser({
    first: 'Reg',
    last: 'Tester',
    birth: '1990-01-01',
    addr: {
      street: 'Main Street 1',
      postal: '21000',
      city: 'Novi Sad',
      state: 'Serbia',
    },
    contact: { phone: '38160111222' },
    creds: { email: uniqueEmail, password: 'SomePass@123' },
  });
});

Then('the user should be redirected to the login page', async () => {
  await LoginPage.expectOnLoginPage();
});
