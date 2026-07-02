const { Before, After, AfterStep, Status } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

Before(async function () {
  this.browser = await chromium.launch({
    headless: process.env.HEADED !== '1'
  });
  this.context = await this.browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  this.page = await this.context.newPage();
});

// Attach a screenshot to the report whenever a step fails.
AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED && this.page) {
    const png = await this.page.screenshot({ fullPage: false });
    this.attach(png, 'image/png');
  }
});

After(async function () {
  await this.context?.close();
  await this.browser?.close();
});
