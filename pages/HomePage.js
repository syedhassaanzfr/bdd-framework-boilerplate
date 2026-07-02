// @ts-check
const { BasePage } = require('./BasePage');
const { Header } = require('./components/Header');
const { CartDrawer } = require('./components/CartDrawer');

/**
 * Home / Shop page — hero, product grid, sorting buttons.
 */
class HomePage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.header = new Header(page);
    this.cartDrawer = new CartDrawer(page);

    this.heroHeading = page.getByRole('heading', { level: 1 });
    this.sortDefault = page.getByRole('button', { name: 'Default', exact: true });
    this.sortLowToHigh = page.getByRole('button', { name: 'Low → High' });
    this.sortHighToLow = page.getByRole('button', { name: 'High → Low' });
    // Each product card is a direct child of the product grid and contains an Add to Cart button
    this.productCards = page.locator('.grid > div', {
      has: page.getByRole('button', { name: 'Add to Cart' })
    });
    this.footer = page.locator('footer');
  }

  async open() {
    await this.goto('/');
    await this.heroHeading.first().waitFor();
  }

  /** @param {number} index zero-based product card index */
  productCard(index = 0) {
    const card = this.productCards.nth(index);
    return {
      root: card,
      name: card.getByRole('heading').first(),
      price: card.locator('p', { hasText: /(Rs|\$|€|£)\s?[\d,.]+/ }).first(),
      qtyValue: card.locator('span', { hasText: /^\d+$/ }).last(),
      increaseQty: card.getByRole('button', { name: 'Increase quantity' }),
      decreaseQty: card.getByRole('button', { name: 'Decrease quantity' }),
      addToCart: card.getByRole('button', { name: 'Add to Cart' })
    };
  }

  async productCount() {
    return this.productCards.count();
  }

  /** Numeric prices of all visible products, in display order. */
  async visiblePrices() {
    const texts = await this.productCards.allInnerTexts();
    return texts
      .map((t) => t.match(/(?:Rs|\$|€|£)\s?([\d,]+(?:\.\d+)?)/))
      .filter((m) => m !== null)
      .map((m) => parseFloat(m[1].replace(/,/g, '')));
  }

  /**
   * Adds the product at `index` to the cart and returns its name.
   * @param {number} index
   */
  async addProductToCart(index = 0) {
    const card = this.productCard(index);
    const name = (await card.name.innerText()).trim();
    await card.addToCart.click();
    return name;
  }
}

module.exports = { HomePage };
