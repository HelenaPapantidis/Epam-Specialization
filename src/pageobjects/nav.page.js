const BasePage = require("./page.js");

class NavPage extends BasePage {
  /* ===========================
   * GETTERS
   * ===========================
   */

  get languageDropdownButton() {
    return this.el('[data-test="language-select"]');
  }

  get basketLink() {
    return this.el('[data-test="nav-cart"]');
  }

  get categoryMenu() {
    return this.el('a[data-test="nav-categories"]');
  }
  /* ===========================
   * ACTIONS
   * ===========================
   */

  async changeLanguage(language) {
    await (await this.languageDropdownButton).click();
    const option = await this.el(
      `[data-test="lang-${language.toLowerCase()}"]`
    );
    await option.click();
  }

  async getSelectedLanguageText() {
    return (await this.languageDropdownButton).getText();
  }

  // --- categories dropdown menu ---
  get categoriesMenu() {
    return $('[data-test="nav-categories"]');
  }

  async selectCategory(category) {
    const menu = await this.categoriesMenu;
    await menu.waitForClickable({ timeout: 5000 });
    await menu.click();

    const option = await $(
      `//a[contains(@class,"dropdown-item") and normalize-space()="${category}"]`
    );
    await option.waitForClickable({ timeout: 5000 });
    await option.click();
  }

  async openBasket() {
    const toast = await $("div.toast-message");
    if (await toast.isExisting()) {
      await toast.waitForDisplayed({ reverse: true, timeout: 20000 });
    }
    const basket = await this.basketLink;
    await basket.waitForDisplayed({ timeout: 20000 });
    await basket.click();
  }
}

module.exports = new NavPage();
