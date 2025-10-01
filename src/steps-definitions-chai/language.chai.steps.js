const { Given, When, Then } = require("@wdio/cucumber-framework");
const HomePage = require ("../pageobjects/home.page.js");
const NavPage = require ("../pageobjects/nav.page.js");

Given("the user is on the home page", async () => {
  await HomePage.open("/");
});

When("the user changes the language to {string}", async (lang) => {
  await NavPage.changeLanguage(lang);
});

Then("the site should display the language as {string}", async (expectedLang) => {
  const currentLang = await NavPage.getSelectedLanguageText();
  expect(await currentLang).to.contain(expectedLang);
});
