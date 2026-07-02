// @ts-check

/**
 * Header component — logo, shop link, currency selector and cart button.
 */
class Header {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.root = page.locator('header');
    this.logo = this.root.locator('a[href="/"]', { hasText: 'Totesation' }).first();
    this.shopLink = this.root.getByRole('link', { name: 'Shop' });
    this.currencySelect = this.root.locator('select');
    this.cartButton = this.root.getByRole('button', { name: 'Open cart' });
  }

  async clickLogo() {
    await this.logo.click();
  }

  /** @param {'PKR'|'USD'|'EUR'|'GBP'} currency */
  async selectCurrency(currency) {
    await this.currencySelect.selectOption(currency);
  }

  async openCart() {
    await this.cartButton.click();
  }
}

module.exports = { Header };
