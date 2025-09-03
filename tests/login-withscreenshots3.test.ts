import test from '../fixtures/baseTest';
import { ReportHelper } from '../utils/report';
import { readUsersFromExcel } from '../utils/excel';

const users = readUsersFromExcel('test-data/test-dataexcel.xlsx');

test('Edited Base Test', async ({ page, loginPage }, testInfo) => {
  const reporter = new ReportHelper(page);

  await loginPage.gotoLogin();

  for (const user of users) {
    await loginPage.clearFields();
    await loginPage.login(user.username, user.password);

    const failed = await loginPage.errorVisible();
    if (failed) {
      await loginPage.assertLoginFailure();
      await reporter.attachScreenshotAndLog(testInfo, user.username, 'FAILED');
      await loginPage.clearErrorIfAny();
    } else {
      await loginPage.assertLoginSuccess();
      await reporter.attachScreenshotAndLog(testInfo, user.username, 'PASSED');
      await loginPage.logout();
    }
  }
});
