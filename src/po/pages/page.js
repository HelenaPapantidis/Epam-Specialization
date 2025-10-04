const { browser } = require('@wdio/globals');
const { baseUrl } = require('../../config/config');
class BasePage {
  /**
   * Open page by path
   * @param {string} path - url path (default = '/')
   */
  async open(path = '/') {
    await browser.url(`${baseUrl}/${path}`);
  }

  /**
   * Wrapper for single element
   * @param {string} selector
   * @returns {Element}
   */
  el(selector) {
    return $(selector);
  }

  /**
   * Wrapper for multiple elements
   * @param {string} selector
   * @returns {Array<Element>}
   */
  els(selector) {
    return $$(selector);
  }

  /**
   * Click on element
   * @param {Element} el
   */
  async click(el) {
    await el.waitForDisplayed({ timeout: 10000 });
    await el.scrollIntoView();
    await el.click();
  }

  /**
   * Type text into input
   * @param {Element} el
   * @param {string} text
   */
  async type(el, text) {
    await el.waitForDisplayed({ timeout: 10000 });
    await el.setValue(text);
  }

  /**
   * Get text of element
   * @param {Element} el
   * @returns {Promise<string>}
   */
  async getText(el) {
    await el.waitForDisplayed({ timeout: 10000 });
    return await el.getText();
  }

  /**
   * Check if element is visible
   * @param {Element} el
   * @returns {Promise<boolean>}
   */
  async isVisible(el) {
    try {
      return await el.isDisplayed();
    } catch (err) {
      return false;
    }
  }

  /**
   * Wait until element exists in the DOM
   * Throws a custom error if element does not appear within timeout
   * @param {Element} el - WebdriverIO element
   * @param {number} [timeout=10000] - Maximum wait time in ms
   * @throws {Error} if element is not found within timeout
   */
  async waitUntilExists(el, timeout = 10000) {
    try {
      await el.waitForExist({ timeout });
    } catch (err) {
      throw new Error(`Element ${el.selector} did not exist after ${timeout}ms`);
    }
}

/**
 * Wait until element is visible on the page
 * Throws a custom error if element is not displayed within timeout
 * @param {Element} el - WebdriverIO element
 * @param {number} [timeout=10000] - Maximum wait time in ms
 * @throws {Error} if element is not visible within timeout
 */
async waitUntilVisible(el, timeout = 10000) {
  try {
    await el.waitForDisplayed({ timeout });
  } catch (err) {
    throw new Error(`Element ${el.selector} was not visible after ${timeout}ms`);
  }
}

}

module.exports = BasePage;
