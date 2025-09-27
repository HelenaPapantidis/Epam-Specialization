const { Given, When, Then } = require("@wdio/cucumber-framework");
const { assert, expect } = require("chai");
require("chai/register-should"); // aktivira should() //this needs to be added seaparately

const HomePage = require("../pageobjects/home.page.js");
const ProductDetailsPage = require("../pageobjects/productDetails.page.js");
const BasketPage = require("../pageobjects/basket.page.js");
const NavPage = require("../pageobjects/nav.page.js");

//  Assert style
Given('the user is on the product details page for {string}', async (productName) => {
  await HomePage.goToProductDetailsPage(productName);
  const title = await ProductDetailsPage.productTitle.getText();
  assert.equal(title, productName, "Product title does not match");
});

//  Expect style
Given('the user adds {string} quantity to the basket', async (quantity) => {
  await ProductDetailsPage.setQuantity(quantity);
  await ProductDetailsPage.addToBasket();
  const value = await ProductDetailsPage.quantityInput.getValue();
  expect(value).to.equal(quantity);
});

//  Should style
When('the user opens the basket page', async () => {
  await NavPage.openBasket();
  const url = await browser.getUrl();
  url.should.include("/basket");
});

//  Expect style
When('the user removes {string} from the basket', async (productName) => {
  await BasketPage.removeProduct(productName);
  const products = await BasketPage.productList;
  const names = await Promise.all(products.map(p => p.getText()));
  expect(names).to.not.include(productName);
});

//  Assert style
Then("the basket page should display the message:", async (docString) => {
  await BasketPage.emptyBasketMessage.waitForDisplayed({ timeout: 10000 });
  const message = await BasketPage.emptyBasketMessage.getText();
  assert.equal(message.trim(), docString.trim(), "Empty basket message mismatch");
});

//  Should style -inline
Then("no products should be listed in the basket", async () => {
  (await BasketPage.productList).should.have.length(0);
});
