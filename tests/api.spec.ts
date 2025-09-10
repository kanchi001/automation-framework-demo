import { test, expect } from '@playwright/test';

test('GET API test with error handling', async ({ request }) => {
  try {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    // Log status code always
    console.log(`ℹ️ Response status: ${response.status()}`);

    // If request failed, throw error with status
    if (!response.ok()) {
      throw new Error(`❌ API failed with status ${response.status()}`);
    }

    const data = await response.json();

    // Validate response
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('userId');
    expect(data.id).toBe(1);
    expect(data.userId).toBeGreaterThan(0);

    console.log('✅ API test passed:', data);

  } catch (error) {
    console.error('❌ Error during API test:', error);
    throw error; // rethrow so Playwright marks test as failed
  }
});
