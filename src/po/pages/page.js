const { browser } = require("@wdio/globals");
const { baseUrl } = require("../../config/config");
class BasePage {
  /**
   * Open page by path
   * @param {string} path - url path (default = '/')
   */
  async open(path = "/") {
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
   * @param {Element} element
   */
  async click(element) {
    await element.waitForDisplayed({ timeout: 10000 });
    await element.scrollIntoView();
    await element.click();
  }

  /**
   * Type text into input
   * @param {Element} element
   * @param {string} text
   */
  async type(element, text) {
    const el = await element;
    await el.waitForDisplayed({ timeout: 10000 });
    await el.clearValue();
    await el.setValue(String(text));
  }

  /**
   * Get text of element
   * @param {Element} element
   * @returns {Promise<string>}
   */
  async getText(element) {
    const el = await element;
    await el.waitForDisplayed({ timeout: 10000 });
    return await el.getText();
  }

  /**
   * Check if element is visible
   * @param {Element} element
   * @returns {Promise<boolean>}
   */
  async isVisible(element) {
    try {
      return await element.isDisplayed();
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
