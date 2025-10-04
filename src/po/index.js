// components
const Header = require("./components/header");

// pages
const HomePage = require("./pages/home.page");
const LoginPage = require("./pages/login.page");
const BasketPage = require("./pages/basket.page");
const CategoryPage = require("./pages/category.page");
const RegistrationPage = require("./pages/registration.page");
const ProductDetailsPage = require("./pages/productDetails.page");

// exportuj sve zajedno
module.exports = {
  Header,
  HomePage,
  LoginPage,
  BasketPage,
  CategoryPage,
  RegistrationPage,
  ProductDetailsPage
};
