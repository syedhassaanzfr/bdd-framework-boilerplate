const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { HomePage } = require('../../pages/HomePage');

Given('I am on the shop homepage', async function () {
  const home = this.po(HomePage);
  await this.page.goto(this.baseUrl, { waitUntil: 'domcontentloaded' });
  await home.heroHeading.first().waitFor();
});

Then('I should see the heading {string}', async function (heading) {
  await expect(this.po(HomePage).heroHeading.first()).toHaveText(heading);
});

Then('I should see at least {int} product(s)', async function (min) {
  expect(await this.po(HomePage).productCount()).toBeGreaterThanOrEqual(min);
});

Then('every product shows a name, a price and an {string} button', async function (buttonLabel) {
  const home = this.po(HomePage);
  const count = await home.productCount();
  for (let i = 0; i < count; i++) {
    const card = home.productCard(i);
    await expect(card.name).toBeVisible();
    await expect(card.price).toBeVisible();
    await expect(card.addToCart).toHaveText(buttonLabel);
  }
});

When('I sort products by {string}', async function (order) {
  await this.page.getByRole('button', { name: order }).click();
});

Then('the product prices are in {word} order', async function (direction) {
  const prices = await this.po(HomePage).visiblePrices();
  const sorted = [...prices].sort((a, b) => (direction === 'ascending' ? a - b : b - a));
  expect(prices).toEqual(sorted);
});

When('I switch the currency to {string}', async function (currency) {
  await this.po(HomePage).header.selectCurrency(currency);
});

Then('product prices are shown in {string}', async function (symbol) {
  await expect(this.po(HomePage).productCard(0).root).toContainText(symbol);
});
