const { Given, When, Then } = require("@wdio/cucumber-framework");
const {LoginPage, RegistrationPage} = require("../po/index");
const {randomEmail} = require("../helpers/dataHelper.js");
const { registrationUser } = require("../test-data/users");
// ========================
// POSITIVE LOGIN
// ========================
let testEmail;

Given(
  "the user has a registered account and is on the login page",
  async () => {
     testEmail = randomEmail(); // napravi svež email za ovaj scenario
  const newUser = { ...registrationUser, email: testEmail };
    await RegistrationPage.openRegistrationPage();
    await RegistrationPage.registerNewUser(newUser);
  }
);

When("the user enters valid login credentials", async () => {
   await LoginPage.login(testEmail, registrationUser.password);
});

When("the user clicks the {string} button", async (btnText) => {
  await LoginPage.clickLogin();
});

Then("the user should be redirected to the account page", async () => {
  await LoginPage.expectOnAccountPage();
});

// ========================
// NEGATIVE LOGIN – REQUIRED FIELDS
// ========================
Given("the user is on the login page", async () => {
  await LoginPage.openLoginPage();
  await LoginPage.expectOnLoginPage();
});

When("the user enters email {string}", async (email) => {
  await LoginPage.typeEmail(email);
});

When("the user enters password {string}", async (password) => {
  await LoginPage.typePassword(password);
});

Then("the user should see the error message {string}", async (message) => {
  if (message.includes("Email")) {
    await LoginPage.expectEmailError(message);
  } else if (message.includes("Password")) {
    await LoginPage.expectPasswordError(message);
  } else {
    await LoginPage.expectFormError(message);
  }
});

Then("the user should remain on the login page", async () => {
  await LoginPage.expectOnLoginPage();
});
