const BasePage = require("../pageobjects/page.js");

class BasketPage extends BasePage {
  get emptyBasketMessage() {
    return this.el('//*[contains(text(),"The cart is empty")]');
  }

  get productList() {
    return this.els("table tbody tr");
  }

  rowByName(name) {
  return this.el(`//tr[.//span[@data-test="product-title" and contains(normalize-space(),"${name}")]]`);
}

  removeBtnInRow(row) {
    return row.$(".btn.btn-danger");
  }

  qtyInputInRow(row) {
    return row.$("//input[@data-test='quantity']");
  }
/* ===========================
   * ACTIONS
   * ===========================
   */

  async removeProduct(name) {
    const row = await this.rowByName(name);
    const removeBtn = await this.removeBtnInRow(row);
    await removeBtn.click();
  }

  async updateQuantity(name, qty) {
    const row = await this.rowByName(name);
    const qtyInput = await this.qtyInputInRow(row);
    await qtyInput.setValue(qty);
  }

  async expectNoProducts() {
    await expect(this.productList).toBeElementsArrayOfSize(0);
    await expect(this.emptyBasketMessage).toBeDisplayed();
  }
}

module.exports = new BasketPage();
