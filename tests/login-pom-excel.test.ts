import { test } from '@playwright/test';
import { LoginPage } from '../pages/login_page';
import { InventoryPage } from '../pages/inventory_page';
import { readUsersFromExcel } from '../utils/excel';

const users = readUsersFromExcel('test-data/test-dataexcel.xlsx');

test('Login tests using POM + Excel (single session)', async ({ page }, testInfo) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.gotoLogin();

  for (const user of users) {
    await login.clearFields();
    await login.login(user.username, user.password);

    const failed = await login.errorVisible();
    if (failed) {
      await login.assertLoginFailure();
      console.log(`❌ Login failed for: ${user.username}`);
      await login.screenshot(testInfo, user.username, 'FAILED');
      await login.clearErrorIfAny();
    } else {
      await login.assertLoginSuccess();
      console.log(`✅ Login passed for: ${user.username}`);
      await inventory.assertInventoryVisible();
      await inventory.screenshot(testInfo, user.username, 'PASSED');
      await login.logout(); // ✅ reusable
    }
  }
});
