const chai = require("chai");

// Aktivira should stil
chai.should();

// Dodaje globalne varijable za sve testove
global.assert = chai.assert;
global.expect = chai.expect;

module.exports = chai;
