const base = require('./wdio.conf').config;
const fg = require("fast-glob");

exports.config = {
  ...base,

  cucumberOpts: {
    ...base.cucumberOpts,
    require: [
      './chai-setup.js',
      ...fg.sync(['./src/steps-definitions-chai/**/*.js'])
    ],
  },
};
