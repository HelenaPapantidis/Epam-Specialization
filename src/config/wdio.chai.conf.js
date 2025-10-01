const { config: baseConfig } = require("./wdio.conf");
const fg = require("fast-glob");   // dodaj ovo

exports.config = {
  ...baseConfig, // povuci sve iz glavnog configa

  cucumberOpts: {
    ...baseConfig.cucumberOpts,
    require: fg.sync(["./src/tests/steps-definitions-chai/**/*.js"]), 
  },

  before: function () {
    const chai = require("chai");
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();
  },
};
