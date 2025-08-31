import { Page, TestInfo } from '@playwright/test';

export class ReportHelper {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async attachScreenshotAndLog(testInfo: TestInfo, user: string, status: 'PASSED' | 'FAILED') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotName = `screenshots/${testInfo.title}-${user}-${status}-${timestamp}.png`;

    // 📸 Screenshot
    await this.page.screenshot({ path: screenshotName, fullPage: true });
    await testInfo.attach(`Screenshot-${user}-${status}`, {
      path: screenshotName,
      contentType: 'image/png',
    });

    // 📝 Log
    await testInfo.attach(`Log-${user}-${status}`, {
      body: `User ${user} ${status} at ${new Date().toISOString()}`,
      contentType: 'text/plain',
    });
  }
}
