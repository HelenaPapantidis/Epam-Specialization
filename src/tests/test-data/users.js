const { loginPassword } = require("../../config/config.js");
const { randomEmail } = require("../../helpers/dataHelper.js");

module.exports = {
  registrationUser: {
    first: "Ana",
    last: "Test",
    birth: "1990-01-01",
    addr: {
      street: "Main Street 123",
      postal: "11000",
      city: "Belgrade",
      state: "Serbia",
      country: "Serbia",
    },
    contact: {
      phone: "381601234567",
    },
    email: randomEmail(),
    password: loginPassword,
  },
};
