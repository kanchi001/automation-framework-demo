import { test, expect } from '@playwright/test';
import data from '../test-data/test-data.json';

for (const user of data as Array<{ username: string; password: string }>) {
  test(`Login test for ${user.username}`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', user.username);
    await page.fill('#password', user.password);
    await page.click('#login-button');

    if (user.username === 'locked_out_user') {
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    } else {
      await expect(page.locator('.inventory_list')).toBeVisible();
    }
  });
}
