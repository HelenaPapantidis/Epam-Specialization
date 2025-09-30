const BasePage = require("../pages/page");

class BasketPage extends BasePage {
  get emptyBasketMessage() {
    return this.el('//*[contains(text(),"The cart is empty")]');
  }

  get rows() {
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
    const row = this.rowByName(name);
    const removeBtn = await this.removeBtnInRow(row);
    await removeBtn.click();
  }

  async updateQuantity(name, qty) {
    const row = this.rowByName(name);
    const qtyInput = await this.qtyInputInRow(row);
    await qtyInput.setValue(qty);
  }

  async expectNoProducts() {
<<<<<<< HEAD:src/pageobjects/basket.page.js
    await expect(this.productList).toBeElementsArrayOfSize(0);
=======
    expect(this.rows).to.have.lengthOf(0);
>>>>>>> 7af3c71 (TAF refactor):src/po/pages/basket.page.js
    await expect(this.emptyBasketMessage).toBeDisplayed();
  }
}

module.exports = new BasketPage();
