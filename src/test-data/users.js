const { randomEmail } = require("../helpers/dataHelper");
const { loginPassword } = require("../config/config.js");

const email = randomEmail();

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
    },
    contact: {
      phone: "381601234567",
    },
    email: email,
    password: loginPassword,
  },

  loginCreds: {
    email: email, 
    password: loginPassword, 
  },
};
