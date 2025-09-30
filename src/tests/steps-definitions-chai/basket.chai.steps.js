const { Given, When, Then } = require("@wdio/cucumber-framework");
const {HomePage, ProductDetailsPage, BasketPage, Header,} = require("../../po/index");


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
  await Header.openBasket();
  
});

//  Expect style
When('the user removes {string} from the basket', async (productName) => {
  await BasketPage.removeProduct(productName);
  const products = await BasketPage.rows;

  let names = [];
  for (const p of products) {
    names.push(await p.getText());
  }

  expect(names).to.not.include(productName);
});


//  Assert style
Then("the basket page should display the message:", async (docString) => {
  await BasketPage.emptyBasketMessage.waitForDisplayed({ timeout: 10000 });
  const message = await BasketPage.emptyBasketMessage.getText();
  assert.equal(message.trim(), docString.trim(), "Empty basket message mismatch");
});

//  Should style
Then("no products should be listed in the basket", async () => {
  const products = await BasketPage.rows;
  products.should.have.length(0);
});
