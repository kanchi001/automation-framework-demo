import { expect, Page, TestInfo } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async clearFields() {
    await this.page.fill('#user-name', '');
    await this.page.fill('#password', '');
  }

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async errorVisible() {
    return (await this.page.locator('.error-message-container').count()) > 0 &&
           await this.page.locator('.error-message-container').isVisible();
  }

  async assertLoginFailure() {
    await expect(this.page.locator('.error-message-container')).toBeVisible();
  }

  async assertLoginSuccess() {
    await expect(this.page.locator('.inventory_list')).toBeVisible();
  }

  async clearErrorIfAny() {
    const errorBtn = this.page.locator('[data-test="error-button"]');
    if (await errorBtn.isVisible()) {
      await errorBtn.click();
    }
  }

  async logout() {
    await this.page.click('#react-burger-menu-btn');
    await this.page.click('#logout_sidebar_link');
  }

  // 🔥 new reusable screenshot helper
  async captureScreenshot(testInfo: TestInfo, user: string, status: 'PASSED' | 'FAILED') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotName = `screenshots/${testInfo.title}-${user}-${timestamp}.png`;

    await this.page.screenshot({ path: screenshotName, fullPage: true });
    await testInfo.attach(`Screenshot-${user}-${status}`, {
      path: screenshotName,
      contentType: 'image/png',
    });
  }
}
