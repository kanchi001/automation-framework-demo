import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';

// Read Excel once
const workbook = XLSX.readFile('test-data/test-dataexcel.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const users = XLSX.utils.sheet_to_json(sheet) as Array<{ username: string; password: string }>;

for (const user of users) {
  test(`Login test for ${user.username}`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', user.username);
    await page.fill('#password', user.password);
    await page.click('#login-button');

    const errorLocator = page.locator('.error-message-container');
    const errorVisible = (await errorLocator.count()) > 0 && await errorLocator.isVisible();

    if (errorVisible) {
      await expect(errorLocator).toBeVisible();
      console.log(`❌ Login failed for: ${user.username}`);
    } else {
      await expect(page.locator('.inventory_list')).toBeVisible();
      console.log(`✅ Login passed for: ${user.username}`);
    }
  });
}
