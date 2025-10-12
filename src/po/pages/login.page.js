const BasePage = require("../pages/page.js");

class LoginPage extends BasePage {
  //NAVIGATION

  async openLoginPage() {
    await this.open("auth/login");
  }

  // SELECTORS - INPUTS

  get emailInput() {
    return this.el('input[data-test="email"]');
  }
  get passwordInput() {
    return this.el('input[data-test="password"]');
  }
  get loginButton() {
    return this.el('[data-test="login-submit"]');
  }

  // SELECTORS - ERRORS

  get emailError() {
    return this.el('[data-test="email-error"]');
  }
  get passwordError() {
    return this.el('[data-test="password-error"]');
  }

  //ACTIONS

  async typeEmail(email) {
    await this.type(this.emailInput, email);
  }

  async typePassword(password) {
    await this.type(this.passwordInput, password);
  }

  async clickLogin() {
    const button = await this.loginButton;
    await button.waitForDisplayed({ timeout: 20000 });
    await button.waitForEnabled({ timeout: 20000 });
    await browser.pause(300);
    await button.click();
  }

  async login(email, password) {
    await this.openLoginPage();
    await this.typeEmail(email);
    await this.typePassword(password);
    await this.clickLogin();
    await browser.pause(1500);
  }

  //ASSERTIONS (WDIO expect)

  async expectOnLoginPage() {
    await this.waitUntilVisible(this.loginButton, 20000);
    await expect(await browser.getUrl()).to.include("/auth/login");
  }

  async expectOnAccountPage() {
    await browser.waitUntil(
      async () => {
        const url = await browser.getUrl();
        const header = await $("h1")
          .getText()
          .catch(() => "");
        return url.includes("/account") && header.includes("My account");
      },
      {
        timeout: 20000,
        interval: 500,
        timeoutMsg: `Expected to be on account page but got ${await browser.getUrl()}`,
      }
    );
    await expect(await browser.getUrl()).to.include("/account");
    const header = await $("h1").getText();
    await expect(header).to.equal("My account");
  }

  async expectEmailError(message) {
    const text = await this.emailError.getText();
    await expect(text).to.equal(message);
  }

  async expectPasswordError(message) {
    const text = await this.passwordError.getText();
    await expect(text).to.equal(message);
  }
}

module.exports = new LoginPage();
