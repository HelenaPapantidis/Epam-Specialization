const { browser } = require('@wdio/globals');

/**
 * Base class for all Page Objects.
 */
class BasePage {
  /**
   * Open a path relative to baseUrl (configured in wdio.conf.js).
   * Examples:
   *  await this.open('/')       -> baseUrl + '/'
   *  await this.open('/login')  -> baseUrl + '/login'
   */
  async open(path = '/') {
    await browser.url(path);
  }

  /** Find a SINGLE element (alias for browser.$) */
  el(selector) {
    return $(selector);
  }

  /** Find MULTIPLE elements (alias for browser.$$) */
  els(selector) {
    return $$(selector);
  }
}

module.exports = BasePage;