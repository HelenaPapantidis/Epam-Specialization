const { Given, When, Then } = require("@wdio/cucumber-framework");
const HomePage = require("../pageobjects/home.page.js");
const ProductDetailsPage = require("../pageobjects/productDetails.page.js");
const BasketPage = require("../pageobjects/basket.page.js");
const NavPage = require("../pageobjects/nav.page.js");

Given('the user is on the product details page for {string}', async (productName) => {
  await HomePage.goToProductDetailsPage(productName);
  await expect(ProductDetailsPage.productTitle).toHaveText(productName);
});

Given('the user adds {string} quantity to the basket', async (quantity) => {
  await ProductDetailsPage.setQuantity(quantity);
  await ProductDetailsPage.addToBasket();
});

When('the user opens the basket page', async () => {
  await NavPage.openBasket();
});

When('the user removes {string} from the basket', async (productName) => {
  await BasketPage.removeProduct(productName);
});

Then("the basket page should display the message:", async (docString) => {
  await BasketPage.emptyBasketMessage.waitForDisplayed({ timeout: 10000 });
  await expect(BasketPage.emptyBasketMessage).toHaveText(docString.trim());
});

Then("no products should be listed in the basket", async () => {
  const products = await BasketPage.productList;
  expect(products).toHaveLength(0);
});
