const {RegistrationPage,LoginPage} = require("../po");
const { registrationUser, loginCreds } = require("../test-data/users");

async function registerAndLogin() {
  await RegistrationPage.openRegistrationPage();
  await RegistrationPage.registerNewUser(registrationUser);

  await LoginPage.login(loginCreds.email, loginCreds.password);

  return { registrationUser, loginCreds };
}

module.exports = {
  registerAndLogin,
};
