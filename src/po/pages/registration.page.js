const BasePage = require("../pages/page.js");

class RegistrationPage extends BasePage {
  // NAVIGATION

  async openRegistrationPage() {
    await this.open("auth/register");
  }

  // SELECTORS

  get firstNameInput() {
    return this.el('input[data-test="first-name"]');
  }
  get lastNameInput() {
    return this.el('input[data-test="last-name"]');
  }
  get birthDateInput() {
    return this.el('input[data-test="dob"]');
  }
  get streetInput() {
    return this.el('input[data-test="street"]');
  }
  get postalInput() {
    return this.el('input[data-test="postal_code"]');
  }
  get cityInput() {
    return this.el('input[data-test="city"]');
  }
  get stateInput() {
    return this.el('input[data-test="state"]');
  }
  get countrySelect() {
    return this.el('select[data-test="country"]');
  }
  get phoneInput() {
    return this.el('input[data-test="phone"]');
  }
  get emailInput() {
    return this.el('input[data-test="email"]');
  }
  get passwordInput() {
    return this.el('input[data-test="password"]');
  }
  get registerButton() {
    return this.el('[data-test="register-submit"]');
  }

  // ACTIONS

  async registerNewUser(user) {
    await this.type(this.firstNameInput, user.first);
    await this.type(this.lastNameInput, user.last);
    await this.type(this.birthDateInput, user.birth);
    await this.type(this.streetInput, user.addr.street);
    await this.type(this.postalInput, user.addr.postal);
    await this.type(this.cityInput, user.addr.city);
    await this.type(this.stateInput, user.addr.state);

    // Country dropdown
    if (user.addr.country) {
      const countryDropdown = await this.countrySelect;
      await countryDropdown.selectByVisibleText(user.addr.country);
    }

    await this.type(this.phoneInput, user.contact.phone);
    await this.type(this.emailInput, user.email);
    await this.type(this.passwordInput, user.password);

    // submit the registration form
    await this.click(this.registerButton);
    await browser.waitUntil(async () => (await browser.getUrl()).includes("/auth/login"), {
      timeout: 15000,
      interval: 500,
      timeoutMsg: "User was not redirected to login page after registration",
    });
  }
}

module.exports = new RegistrationPage();
