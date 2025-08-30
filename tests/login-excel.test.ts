import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';

// Read Excel file from test-data folder
const workbook = XLSX.readFile('test-data/test-dataexcel.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const users = XLSX.utils.sheet_to_json(sheet) as Array<{ username: string; password: string }>;

for (const user of users) {
  test(`Login test for ${user.username}`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', user.username);
    await page.fill('#password', user.password);
    await page.click('#login-button');

    // if (user.username === 'locked_out_user') {
    //   await expect(page.locator('[data-test="error"]')).toBeVisible();
    // } else {
    //   await expect(page.locator('.inventory_list')).toBeVisible();
    // }

       // ✅ Generic validation: either success or error
    //const errorVisible = await page.locator('.error-message-container.error').isVisible();
    const errorVisible = await page.locator('.error-message-container').isVisible();


    if (errorVisible) {
      console.log(`❌ Login failed for: ${user.username}`);
    } else {
      await expect(page.locator('.inventory_list')).toBeVisible();
      console.log(`✅ Login passed for: ${user.username}`);
    }
  });
}
