const { setWorldConstructor, setDefaultTimeout, World } = require('@cucumber/cucumber');

setDefaultTimeout(60 * 1000);

/**
 * Custom World — one instance per scenario.
 * Holds the Playwright page plus lazily-created page objects, so
 * scenarios stay fully isolated from each other.
 */
class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.baseUrl = process.env.BASE_URL || 'https://totesation.com';
    /** @type {import('@playwright/test').Browser | undefined} */
    this.browser = undefined;
    /** @type {import('@playwright/test').BrowserContext | undefined} */
    this.context = undefined;
    /** @type {import('@playwright/test').Page | undefined} */
    this.page = undefined;
    /** Scratch space for passing values between steps. */
    this.state = {};
  }

  /** Lazily construct a page object bound to the current page. */
  po(PageObjectClass) {
    this._pageObjects = this._pageObjects || new Map();
    if (!this._pageObjects.has(PageObjectClass)) {
      this._pageObjects.set(PageObjectClass, new PageObjectClass(this.page));
    }
    return this._pageObjects.get(PageObjectClass);
  }
}

setWorldConstructor(CustomWorld);

module.exports = { CustomWorld };
