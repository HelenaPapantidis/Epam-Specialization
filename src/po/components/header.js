const BasePage = require("../pages/page.js");
const { waitForToastToDisappear } = require("../../helpers/waitHelper");

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
    await dropdown.scrollIntoView();
    await dropdown.waitForClickable({ timeout: 20000 });
    await dropdown.click();

    const option = await $(`[data-test="lang-${language.toLowerCase()}"]`);
    await option.scrollIntoView();
    await option.waitForClickable({ timeout: 20000 });
    await option.click();
  }

  async getSelectedLanguageText() {
    const dropdown = this.languageDropdownButton;
    await dropdown.waitForDisplayed({ timeout: 20000 });
    return dropdown.getText();
  }

  async selectCategory(category) {
    const menu = this.categoriesMenu;
    await menu.waitForClickable({ timeout: 20000 });
    await menu.click();

    const option = await $(
      `//a[contains(@class,"dropdown-item") and normalize-space()="${category}"]`
    );
    await option.waitForClickable({ timeout: 20000 });
    await option.click();
  }

  async openBasket() {
    await browser.pause(2000);
    await waitForToastToDisappear(20000);

    await browser.waitUntil(
      async () => {
        const basketExists = await this.basketLink.isExisting();
        return basketExists;
      },
      {
        timeout: 20000,
        timeoutMsg: "Basket icon not found in header after adding product",
      }
    );

    const basket = await this.basketLink;
    await basket.scrollIntoView();
    await basket.waitForClickable({ timeout: 20000 });
    await basket.click();

    await browser.waitUntil(async () => (await browser.getUrl()).includes("/checkout"), {
      timeout: 20000,
      timeoutMsg: "Basket page did not open",
    });
  }
}
module.exports = new Header();
