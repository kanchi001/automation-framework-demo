import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base_page';

export class LoginPage extends BasePage {
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorCloseBtn: Locator;
  readonly menuBtn: Locator;
  readonly logoutBtn: Locator;
  readonly inventoryList: Locator;

  constructor(page: Page) {
    super(page); // ✅ inherit BasePage utilities
    this.usernameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('.error-message-container');
    this.errorCloseBtn = page.locator('[data-test="error-button"]');
    this.menuBtn = page.locator('#react-burger-menu-btn');
    this.logoutBtn = page.locator('#logout_sidebar_link');
    this.inventoryList = page.locator('.inventory_list');
  }

  async gotoLogin() {
    await this.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async clearFields() {
    await this.usernameField.fill('');
    await this.passwordField.fill('');
  }

  async errorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  async assertLoginFailure() {
    await expect(this.errorMessage).toBeVisible();
  }

  async clearErrorIfAny() {
    if (await this.errorMessage.isVisible()) {
      await this.errorCloseBtn.click();
    }
  }

  async assertLoginSuccess() {
    await this.waitForElement(this.inventoryList);
  }

  async logout() {
    await this.menuBtn.click();
    await this.logoutBtn.click();
  }
}
