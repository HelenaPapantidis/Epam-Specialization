const BasePage = require("../pages/page.js");
const { waitForToastToDisappear, safeClick } = require("../../helpers/waitHelper");


class Header extends BasePage {
  get languageDropdownButton() {
    return this.el('[data-test="language-select"]');
  }

  get basketLink() {
    return this.el('a[data-test="nav-cart"]');
  }

  get categoriesMenu() {
    return this.el('[data-test="nav-categories"]');
  }

  async changeLanguage(language) {
    const dropdown = this.languageDropdownButton;
    await dropdown.waitForClickable({ timeout: 5000 });
    await dropdown.click();

    const option = await $(`[data-test="lang-${language.toLowerCase()}"]`);
    await option.waitForClickable({ timeout: 5000 });
    await option.click();
  }

  async getSelectedLanguageText() {
    const dropdown = this.languageDropdownButton;
    await dropdown.waitForDisplayed({ timeout: 5000 });
    return dropdown.getText();
  }

  async selectCategory(category) {
    const menu = this.categoriesMenu;
    await menu.waitForClickable({ timeout: 5000 });
    await menu.click();

    const option = await $(
      `//a[contains(@class,"dropdown-item") and normalize-space()="${category}"]`
    );
    await option.waitForClickable({ timeout: 5000 });
    await option.click();
  }

 async openBasket() {
  // prvo sačekaj da nestane toast (ako se pojavi)
  await waitForToastToDisappear(20000);

  // klik na ikonicu korpe
  const basket = await this.basketLink;
  await safeClick(basket, 20000);

  // sačekaj da URL bude checkout (ili da se pojavi element iz korpe)
  await browser.waitUntil(async () => {
    const url = await browser.getUrl();
    return url.includes("/checkout");
  }, {
    timeout: 10000,
    interval: 500,
    timeoutMsg: "Basket page did not open"
  });
}
}
module.exports = new Header();
