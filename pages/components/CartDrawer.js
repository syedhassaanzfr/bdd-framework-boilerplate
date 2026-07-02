// @ts-check

/**
 * Cart drawer component — slides in from the right when the cart is opened.
 */
class CartDrawer {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.root = page.locator('aside', { hasText: 'Your Cart' });
    this.heading = this.root.getByRole('heading', { name: 'Your Cart' });
    this.closeButton = this.root.getByRole('button', { name: 'Close cart' });
    this.emptyMessage = this.root.getByText(/your cart is empty/i);
  }

  /** The drawer uses translate-x-full when hidden, so check the transform. */
  async isOpen() {
    const cls = (await this.root.getAttribute('class')) || '';
    return !cls.includes('translate-x-full');
  }

  async expectOpen() {
    const { expect } = require('@playwright/test');
    await expect(this.root).not.toHaveClass(/translate-x-full/);
  }

  async expectClosed() {
    const { expect } = require('@playwright/test');
    await expect(this.root).toHaveClass(/translate-x-full/);
  }

  /** @param {string} productName */
  itemByName(productName) {
    return this.root.getByText(productName, { exact: false });
  }

  async close() {
    await this.closeButton.click();
  }
}

module.exports = { CartDrawer };
