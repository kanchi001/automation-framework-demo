import test from '../fixtures/baseTest';

test.describe('Checkout Flow', () => {
  test('Place order @regression', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.gotoLogin();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addToCart('Sauce Labs Bike Light');
  });

 test.describe.configure({ retries: 2 });

 test('Sometimes flaky test', async ({ page }) => {
    await page.goto('https://example.com');
  });
});
