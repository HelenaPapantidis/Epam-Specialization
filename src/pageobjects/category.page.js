const BasePage = require("./page.js");

class CategoryPage extends BasePage {
  /* ===========================
   * GETTERS
   * ===========================
   */

  get categoryTitle() {
    return this.el('[data-test="page-title"]');
  }

  get productList() {
    return this.els('h5[data-test="product-name"]');
  }
get productCards() {
  return this.els('div.card'); 
}

  /* ===========================
   * ACTIONS
   * ===========================
   */
 async waitForProductList() {
    await browser.waitUntil(
      async () => (await this.productList).length > 0,
      {
        timeout: 7000,
        timeoutMsg: "Products did not render on the category page",
      }
    );
  }

 async verifyProductsHaveNameAndPrice() {
  await this.waitForProductList();
  const cards = await this.productCards;

  for (const card of cards) {
    const nameEl = await card.$('h5[data-test="product-name"]');   
    const priceEl = await card.$('p[data-test="product-price"]'); 

    await expect(nameEl).toBeDisplayed();
    await expect(priceEl).toBeDisplayed();
  }
}

}

module.exports = new CategoryPage();
