import { Page, Locator, expect, TestInfo } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async waitForElement(locator: Locator) {
    await expect(locator).toBeVisible();
  }

   // 🔥 new reusable screenshot helper
  async screenshot(testInfo: TestInfo, user: string, status: 'PASSED' | 'FAILED') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotName = `screenshots/${testInfo.title}-${user}-${timestamp}.png`;

    await this.page.screenshot({ path: screenshotName, fullPage: true });
    await testInfo.attach(`Screenshot-${user}-${status}`, {
      path: screenshotName,
      contentType: 'image/png',
    });
  }
}
