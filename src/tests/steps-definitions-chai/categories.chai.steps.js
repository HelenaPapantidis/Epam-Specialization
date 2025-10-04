const { Given, When, Then } = require("@cucumber/cucumber");
const { HomePage, CategoryPage, Header } = require("../../po/index");

Given("the user is on the homepage", async () => {
  await HomePage.open();
});
When("the user selects the {string} category", async (categoryName) => {
  await Header.selectCategory(categoryName);
});

Then("the category title should display {string}", async (expectedTitle) => {
  const titleText = await CategoryPage.categoryTitle.getText();
  assert.equal(
    titleText,
    expectedTitle,
    `Expected category title to be '${expectedTitle}' but found '${titleText}'`
  );
});

Then("the product list should not be empty", async () => {
  await CategoryPage.verifyProductListNotEmpty();
});
Then("each listed product should display name and price", async () => {
  await CategoryPage.verifyProductsHaveNameAndPrice();
});
