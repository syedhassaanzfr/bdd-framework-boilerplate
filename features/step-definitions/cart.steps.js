const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { HomePage } = require('../../pages/HomePage');

When('I open the cart', async function () {
  const home = this.po(HomePage);
  await home.header.openCart();
  await home.cartDrawer.expectOpen();
});

When('I close the cart', async function () {
  await this.po(HomePage).cartDrawer.close();
});

When('I add the first product to the cart', async function () {
  this.state.addedProduct = await this.po(HomePage).addProductToCart(0);
});

Then('the cart is empty', async function () {
  await expect(this.po(HomePage).cartDrawer.emptyMessage).toBeVisible();
});

Then('the cart contains that product', async function () {
  const drawer = this.po(HomePage).cartDrawer;
  await expect(drawer.emptyMessage).toBeHidden();
  await expect(drawer.itemByName(this.state.addedProduct).first()).toBeVisible();
});

Then('the cart is no longer visible', async function () {
  await this.po(HomePage).cartDrawer.expectClosed();
});
