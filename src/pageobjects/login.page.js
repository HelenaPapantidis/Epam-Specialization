const BasePage = require("./page.js");
const { expect } = require("@wdio/globals");
const RegistrationPage = require("./registration.page.js");

class LoginPage extends BasePage {
  async openLoginPage() {
    await this.open("auth/login");
  }

  // inputs
  get emailInput() {
    return this.el('input[data-test="email"]');
  }
  get passwordInput() {
    return this.el('input[data-test="password"]');
  }
  get loginButton() {
    return this.el('[data-test="login-submit"]');
  }

  // errors
  get emailError() {
    return this.el('[data-test="email-error"]');
  }
  get passwordError() {
    return this.el('[data-test="password-error"]');
  }

  /* ===========================
   * ACTIONS
   * ===========================
   */

  async typeEmail(email) {
    await this.emailInput.setValue(email);
  }
  async typePassword(password) {
    await this.passwordInput.setValue(password);
  }
  async clickLogin() {
    await this.loginButton.click();
  }
  async login(email, password) {
    await this.openLoginPage();
    await this.typeEmail(email);
    await this.typePassword(password);
    await this.clickLogin();
  }

  /*for favourite scenario user must be logged but app erases data
base after 30min so every time you need to first register then to login
  in this function both actions are combined*/

  async registerAndLogin(user) {
    await browser.url("/auth/register");
    await RegistrationPage.registerNewUser(user);

    await this.login(user.creds.email, user.creds.password);
  }

  // assertions
  async expectOnLoginPage() {
    await expect(browser).toHaveUrl(
      "https://practicesoftwaretesting.com/auth/login"
    );
  }
  async expectOnAccountPage() {
    await expect(browser).toHaveUrl(expect.stringContaining("account"));
  }
  async expectEmailError(message) {
    await expect(this.emailError).toHaveText(message);
  }
  async expectPasswordError(message) {
    await expect(this.passwordError).toHaveText(message);
  }
}

module.exports = new LoginPage();
