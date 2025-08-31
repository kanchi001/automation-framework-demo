import { test } from '@playwright/test';
import { LoginPage } from '../pages/login_page';
import { readUsersFromExcel } from '../utils/excel';

const users = readUsersFromExcel('test-data/test-dataexcel.xlsx');

test('Login tests using POM + Excel (single session)', async ({ page }, testInfo) => {
  const login = new LoginPage(page);
  await login.goto();

  for (const user of users) {
    await login.clearFields();
    await login.login(user.username, user.password);

    if (await login.errorVisible()) {
      console.log(`❌ Login failed for: ${user.username}`);
      await login.assertLoginFailure();
      await login.captureScreenshot(testInfo, user.username, 'FAILED');
      await login.clearErrorIfAny();
    } else {
      console.log(`✅ Login passed for: ${user.username}`);
      await login.assertLoginSuccess();
      await login.captureScreenshot(testInfo, user.username, 'PASSED');
      await login.logout();
    }
  }
});
