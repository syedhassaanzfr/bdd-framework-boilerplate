// @ts-check

/**
 * Base page — shared behaviour inherited by every page object.
 */
class BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
  }

  /** Navigate to a path relative to baseURL. */
  async goto(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async getTitle() {
    return this.page.title();
  }

  async currentUrl() {
    return this.page.url();
  }
}

module.exports = { BasePage };
