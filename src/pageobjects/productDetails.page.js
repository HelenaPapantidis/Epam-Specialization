const BasePage = require("./page.js");
const { expect } = require("@wdio/globals");

class ProductDetailsPage extends BasePage {
  // === GETTERS ===
  get productTitle() {
    return this.el('h1[data-test="product-name"]');
  }

  get quantityInput() {
    return this.el('input[data-test="quantity"]');
  }

  get addToBasketButton() {
    return this.el('button[data-test="add-to-cart"]');
  }

  get addToFavouritesButton() {
    return this.el('[data-test="add-to-favorites"]');

  }
  get toastMessage(){
    return this.el('#toast-container');
  }

  // === ACTIONS ===
  async setQuantity(qty) {
    await this.quantityInput.waitForDisplayed();
    await this.quantityInput.clearValue();
    await this.quantityInput.setValue(qty);
  }

  async addToBasket() {
    await this.addToBasketButton.waitForClickable();
    await this.addToBasketButton.click();
  }

  async addToFavourites() {
    await this.addToFavouritesButton.click();
  }

  // === ASSERTIONS ===
  async expectPageFor(productName) {
    await this.productTitle.waitForDisplayed({ timeout: 7000 });
    await expect(this.productTitle).toHaveTextContaining(productName);
  }

  async expectTitle(productName) {
    await expect(this.productTitle).toHaveText(productName);
  }
  get toastMessage() {
  return this.el('#toast-container');
}

async expectToastMessage(text) {
  await this.toastMessage.waitForDisplayed({ timeout: 5000 });
  await expect(this.toastMessage).toHaveText(text);
}

}

module.exports = new ProductDetailsPage();
