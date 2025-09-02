// cart.test.ts
import test from '../fixtures/baseTest';
import { expect } from '@playwright/test';

test('Add to cart flow', async ({ page, loginPage, inventoryPage, cartPage }) => {

  await loginPage.gotoLogin();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart('Sauce Labs Backpack');
  await cartPage.verifyCartItemWithPrice('Sauce Labs Backpack', '$29.99');
  expect(await inventoryPage.getCartCount()).toBe(1);

});
