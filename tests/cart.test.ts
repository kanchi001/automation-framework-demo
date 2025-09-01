// cart.test.ts
import test from '../fixtures/baseTest';
import { LoginPage } from '../pages/login_page';

test('Add to cart flow', async ({ page, loginPage, inventoryPage, cartPage }) => {
    const login = new LoginPage(page);

  await login.gotoLogin();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart('Sauce Labs Backpack');
  await cartPage.verifyCartItem('Sauce Labs Backpack');
});
