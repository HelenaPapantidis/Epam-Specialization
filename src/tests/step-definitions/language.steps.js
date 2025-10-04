const { Given, When, Then } = require("@wdio/cucumber-framework");
const {HomePage, Header} = require('../po/index');


Given("the user is on the home page", async () => {
  await HomePage.open();
});

When("the user changes the language to {string}", async (lang) => {
  await Header.changeLanguage(lang);
});

Then("the site should display the language as {string}", async (expectedLang) => {
  const currentLang = await Header.getSelectedLanguageText();
  await expect(currentLang).toContain(expectedLang);
});
