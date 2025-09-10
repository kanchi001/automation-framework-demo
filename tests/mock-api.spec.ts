import { test, expect } from '@playwright/test';

test('mock API response', async ({ page }) => {
  // Intercept and mock the API
  await page.route('**/todos/*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([{ id: 1, title: '🚀 Mocked tod' }]),
    });
  });

  // Navigate to the API endpoint
  await page.goto('https://jsonplaceholder.typicode.com/todos/1');

  // Grab page content
  const content = await page.textContent('body');

  // Validate mocked response
  expect(content).toContain('🚀 Mocked tod');
});
