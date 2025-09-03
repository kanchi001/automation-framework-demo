import test from '../fixtures/baseTest';
import { allure } from 'allure-playwright';

test('Login should redirect to inventory', async ({ page, loginPage }) => {
  allure.label('feature', 'Login');
  allure.label('severity', 'critical');
  allure.owner('Chi');
  allure.description('Verify that a valid user can log in and is redirected to the inventory page.');

  await loginPage.gotoLogin();
  await loginPage.login('standard_user', 'secret_sauce');
});
