const { Given, When, Then } = require("@cucumber/cucumber");
const HomePage = require("../pageobjects/home.page");
const NavPage = require("../pageobjects/nav.page");
const CategoryPage = require("../pageobjects/category.page");


Given("the user is on the homepage", async () => {
  await HomePage.open();
});
When("the user selects the {string} category", async (categoryName) => {
  await NavPage.selectCategory(categoryName);
});

Then("the category title should display {string}", async (expectedTitle) => {
  await expect(CategoryPage.categoryTitle).toHaveText(expectedTitle);
});

Then('the product list should not be empty', async () => {
  await CategoryPage.waitForProductList();
  await expect(CategoryPage.productList).toBeElementsArrayOfSize({ gte: 1 });
});



Then("each listed product should display name and price", async () => {
  await CategoryPage.verifyProductsHaveNameAndPrice();
});
