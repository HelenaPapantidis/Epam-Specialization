require('dotenv').config();

const config = {
  headless: process.env.HEADLESS === "false",
  baseUrl: process.env.BASE_URL,
  loginPassword: process.env.LOGIN_PASSWORD
};

module.exports = config;
