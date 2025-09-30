const { Given, When, Then } = require("@wdio/cucumber-framework");
const RegistrationPage = require("../pageobjects/registration.page.js");
const LoginPage = require("../pageobjects/login.page.js");

// ========================
// POSITIVE LOGIN
// ========================
Given("the user has a registered account and is on the login page",
  async () => {
    const uniqueEmail = `qa_${Date.now()}@test.com`;

    await browser.url("/auth/register");
    await RegistrationPage.registerNewUser({
      first: "Login",
      last: "Tester",
      birth: "1990-01-01",
      addr: {
        street: "Main Street 1",
        postal: "21000",
        city: "Novi Sad",
        state: "Serbia",
      },
      contact: { phone: "38160111222" },
      creds: { email: uniqueEmail, password: "SomePass@123" },
    });

    await LoginPage.expectOnLoginPage();
    global.registeredEmail = uniqueEmail;
  }
);

When("the user enters valid login credentials", async () => {
  await LoginPage.typeEmail(global.registeredEmail);
  await LoginPage.typePassword("SomePass@123");
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
  await browser.url("/auth/login");
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
