const BasePage = require("./page.js");

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
  get error() {
    return this.el('[data-test="register-error"]');
  }
  /* ===========================
   * ACTIONS
   * ===========================
   */

  async waitOpened() {
    await this.form.waitForExist({ timeout: 10000 });
  }

  async registerNewUser({ first, last, birth, addr, contact, creds }) {
    await this.waitOpened();

    await this.firstName.setValue(first);
    await this.lastName.setValue(last);
    await this.dob.setValue(birth);
    await this.street.setValue(addr.street);
    await this.postalCode.setValue(addr.postal);
    await this.city.setValue(addr.city);
    await this.state.setValue(addr.state);
    await this.country.selectByVisibleText("Serbia");
    await this.phone.setValue(contact.phone);
    await this.email.setValue(creds.email);
    await this.password.setValue(creds.password);

    await this.submit.click();
  }
}

module.exports = new RegisterPage();
