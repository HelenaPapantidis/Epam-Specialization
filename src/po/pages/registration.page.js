const BasePage = require("../pages/page.js");

class RegisterPage extends BasePage {
  get form() {
    return this.el('[data-test="register-form"]');
  }
  get firstName() {
    return this.el('[data-test="first-name"]');
  }
  get lastName() {
    return this.el('[data-test="last-name"]');
  }
  get dob() {
    return this.el('[data-test="dob"]');
  }
  get street() {
    return this.el('[data-test="street"]');
  }
  get postalCode() {
    return this.el('[data-test="postal_code"]');
  }
  get city() {
    return this.el('[data-test="city"]');
  }
  get state() {
    return this.el('[data-test="state"]');
  }
  get country() {
    return this.el('[data-test="country"]');
  }
  get phone() {
    return this.el('[data-test="phone"]');
  }
  get email() {
    return this.el('[data-test="email"]');
  }
  get password() {
    return this.el(
      'app-password-input[formcontrolname="password"] input, input[type="password"]'
    );
  }
  get submit() {
    return this.el('[data-test="register-submit"]');
  }

  /* ===========================
   * ACTIONS
   * ===========================
   */
  async openRegistrationPage() {
    await this.open("auth/register");
  }

  async registerNewUser(user) {
    await this.waitUntilExists(this.form);

    await this.type(this.firstName, user.first);
    await this.type(this.lastName, user.last);
    await this.type(this.dob, user.birth);
    await this.type(this.street, user.addr.street);
    await this.type(this.postalCode, user.addr.postal);
    await this.type(this.city, user.addr.city);
    await this.type(this.state, user.addr.state);
    await this.country.selectByVisibleText("Serbia");
    await this.type(this.phone, user.contact.phone);
    await this.type(this.email, user.email);
    await this.type(this.password, user.password);

    await this.submit.click();
  }
}

module.exports = new RegisterPage();
