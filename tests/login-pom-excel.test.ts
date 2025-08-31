import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login_page';
import { readUsersFromExcel } from '../utils/excel';

const users = readUsersFromExcel('test-data/test-dataexcel.xlsx');

test('Login tests using POM + Excel (single session)', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto(); // ✅ open once

  for (const user of users) {
    await login.clearFields();
    await login.login(user.username, user.password);

    const failed = await login.errorVisible();
    if (failed) {
      await login.assertLoginFailure();
      console.log(`❌ Login failed for: ${user.username}`);
      await login.clearErrorIfAny();
    } else {
      await login.assertLoginSuccess();
      console.log(`✅ Login passed for: ${user.username}`);
      await login.logout(); // prepare for next user
      // Back to login page automatically after logout
    }
  }
});
