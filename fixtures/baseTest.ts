// fixtures/baseTest.ts
import { test as base } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../pages/login_page';
import { InventoryPage } from '../pages/inventory_page';
import { CartPage } from '../pages/cart_page';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  allure: typeof allure; // ✅ inject allure
};

const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  allure: async ({}, use) => {
    await use(allure); // ✅ makes allure available everywhere
  },
});

export default test;
export const expect = base.expect;
