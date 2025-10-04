const BasePage = require("../pages/page.js");

class CategoryPage extends BasePage {
  /* ===========================
   * GETTERS
   * ===========================
   */
//title of category page
  get categoryTitle() {
    return this.el('[data-test="page-title"]');
  }
get productCardLinks() {
  return this.els('a[data-test^="product-"]'); 
}
  get productNames() {
    return this.els('h5[data-test="product-name"]');
  }

  get productPrices() {
    return this.els('span[data-test="product-price"]');
  }


  /* ===========================
   * ACTIONS
   * ===========================
   */
 
  async verifyProductsHaveNameAndPrice() {
    const names = await this.productNames;
    const prices = await this.productPrices;

    expect(names.length).to.be.greaterThan(0, "No product names found");
    expect(prices.length).to.be.greaterThan(0, "No product prices found");

    for (let i = 0; i < names.length; i++) {
      expect(await names[i].getText()).to.not.be.empty;
      expect(await prices[i].getText()).to.not.be.empty;
    }
  }

async verifyProductListNotEmpty() {
    await browser.waitUntil(
      async () => (await this.productCardLinks).length > 0,
      { timeout: 10000, timeoutMsg: "No products were displayed" }
    );
    const products = await this.productCardLinks;
    expect(products.length).to.be.greaterThan(0, "No products were displayed");
  }


}

module.exports = new CategoryPage();
