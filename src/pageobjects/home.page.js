// src/pageobjects/home.page.js
const BasePage = require("./page.js");

class HomePage extends BasePage {
  /* ===========================
   * GETTERS
   * =========================== */

  get productTiles() {
    return this.els('[data-test="product-card"]');
  }

  get productTitle() {
    return this.el('[data-test="product-name"]');
  }

  productByName(name) {
    return $(`//h5[@data-test="product-name" and normalize-space()="${name}"]`);
  }

  /* ===========================
   * ACTIONS
   * =========================== */

  async open(path = "/") {
    await super.open(path);
  }
  async goToProductDetailsPage(productName) {
    await this.open("/");
    const product = await this.productByName(productName);
    await product.waitForDisplayed({ timeout: 7000 });
    await product.click();
  }

  async waitForProductList() {
    await browser.waitUntil(async () => (await this.productTiles).length > 0, {
      timeout: 7000,
      timeoutMsg: "Products did not render on the category page",
    });
  }

  async search(query) {
    await this.searchInput.setValue(query);
    await this.searchButton.click();
  }

  async verifyProductInList(product) {
    const productEl = await this.productByName(product);
    await expect(productEl).toBeDisplayed();
  }

  async verifyProductsHaveNameAndPrice() {
    await this.waitForProductList();
    const products = await this.productTiles;
    expect(products.length).toBeGreaterThan(0);

    for (const card of products) {
      const nameEl = await card.$('[data-test="product-name"]');
      const priceEl = await card.$('[data-test="product-price"]');
      await expect(nameEl).toBeDisplayed();
      await expect(priceEl).toBeDisplayed();
    }
  }

  async sortBy(value) {
    await (await this.sortDropdown).selectByVisibleText(value);
  }

  async getAllPrices() {
    await this.waitForProductList();
    const cards = await this.productTiles;
    const prices = [];
    for (const card of cards) {
      const priceText = await card.$('[data-test="product-price"]').getText();
      prices.push(parseFloat(priceText.replace(/[^0-9.]/g, "")));
    }
    return prices;
  }

  async selectProductByName(name) {
    const product = await this.productByName(name);
    await product.click();
  }

  async verifyResultsGreaterThan(minCount) {
    await this.waitForProductList();
    const products = await this.productTiles;
    expect(products.length).toBeGreaterThan(Number(minCount));
  }

  async verifyProductListNotEmpty() {
    await this.waitForProductList();
    const items = await this.productTiles;
    await expect(items.length).toBeGreaterThan(0);
  }
}

module.exports = new HomePage();
