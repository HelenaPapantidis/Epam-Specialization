const BasePage = require("../pages/page.js");
const { loginEmail, loginPassword } = require("../../config/config");

class LoginPage extends BasePage {
  /* ===========================
   * NAVIGATION
   * =========================== */
  async openLoginPage() {
    await this.open("auth/login");
  }

  /* ===========================
   * SELECTORS - INPUTS
   * =========================== */
  get emailInput() {
    return this.el('input[data-test="email"]');
  }
  get passwordInput() {
    return this.el('input[data-test="password"]');
  }
  get loginButton() {
    return this.el('[data-test="login-submit"]');
  }

  /* ===========================
   * SELECTORS - ERRORS
   * =========================== */
  get emailError() {
    return this.el('[data-test="email-error"]');
  }
  get passwordError() {
    return this.el('[data-test="password-error"]');
  }

  /* ===========================
   * ACTIONS
   * =========================== */

  async openLoginPage() {
    await this.open("auth/login");
  }
  async typeEmail(email) {
    await this.type(this.emailInput, email);
  }

  async typePassword(password) {
    await this.type(this.passwordInput, password);
  }

  async clickLogin() {
    await this.click(this.loginButton);
  }

  async login(email, password) {
    await this.openLoginPage();
    await this.typeEmail(email);
    await this.typePassword(password);
    await this.clickLogin();
  }

  /* ===========================
   * ASSERTIONS (WDIO expect)
   * =========================== */
 async expectOnLoginPage() {
  // čekaj da login dugme bude vidljivo (siguran indikator da si na login stranici)
  await this.waitUntilVisible(this.loginButton, 20000);
  await expect(await browser.getUrl()).to.include('/auth/login');
}


  async expectOnAccountPage() {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes("/account"),
    {
      timeout: 5000,
      timeoutMsg: `Expected to be on /account page but got ${await browser.getUrl()}`,
    }
  );
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
