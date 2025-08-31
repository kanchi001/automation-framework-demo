import { Page, expect } from '@playwright/test';
import { loginLocators } from './locators/loginLocators';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.fill(loginLocators.usernameInput, username);
    await this.page.fill(loginLocators.passwordInput, password);
    await this.page.click(loginLocators.loginButton);
  }

  errorVisible() {
    const el = this.page.locator(loginLocators.errorMessage);
    return el.count().then(c => c > 0).then(async exists => exists && await el.isVisible());
  }

  async assertLoginSuccess() {
    await expect(this.page.locator(loginLocators.inventoryList)).toBeVisible();
  }

  async assertLoginFailure() {
    await expect(this.page.locator(loginLocators.errorMessage)).toBeVisible();
  }

  async clearErrorIfAny() {
    // SauceDemo shows a dismiss button when error appears
    const closeBtn = this.page.locator('[data-test="error-button"]');
    if (await closeBtn.count() > 0) await closeBtn.click();
  }

  async logout() {
    await this.page.click(loginLocators.menuButton);
    await this.page.click(loginLocators.logoutLink);
  }

  async clearFields() {
    await this.page.fill(loginLocators.usernameInput, '');
    await this.page.fill(loginLocators.passwordInput, '');
  }
}
