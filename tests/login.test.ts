import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Enter username
  await page.fill('#user-name', 'standard_user');
  
  // Enter password
  await page.fill('#password', 'secret_sauce');

  // Click Login
  await page.click('#login-button');

  // Assert successful login
  await expect(page.locator('.title')).toHaveText('Products');
});
