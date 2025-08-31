import { test } from '@playwright/test';
import { LoginPage } from '../pages/login_page';
import { ReportHelper } from '../utils/report';
import { readUsersFromExcel } from '../utils/excel';

const users = readUsersFromExcel('test-data/test-dataexcel.xlsx');

test('Login tests using POM + Excel + Report Helper', async ({ page }, testInfo) => {
  const login = new LoginPage(page);
  const reporter = new ReportHelper(page);

  await login.gotoLogin();

  for (const user of users) {
    await login.clearFields();
    await login.login(user.username, user.password);

    const failed = await login.errorVisible();
    if (failed) {
      await login.assertLoginFailure();
      await reporter.attachScreenshotAndLog(testInfo, user.username, 'FAILED');
      await login.clearErrorIfAny();
    } else {
      await login.assertLoginSuccess();
      await reporter.attachScreenshotAndLog(testInfo, user.username, 'PASSED');
      await login.logout();
    }
  }
});
