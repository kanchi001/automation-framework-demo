import { test, expect } from '@playwright/test';
import { APIClient } from '../../utils/apiClient';

test.describe('API Tests - Posts', () => {
  let client: APIClient;

  test.beforeEach(async ({ request }) => {
    client = new APIClient(request);
  });

  test('GET Post by ID @api', async () => {
    const response = await client.get('/posts/1');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.id).toBe(1);
    console.log('✅ Post data:', data);
  });

  test('POST Create New Post @api', async () => {
    const response = await client.post('/posts', {
      title: 'Dynamic Post',
      body: 'Hello from Playwright API Test!',
      userId: 1,
    });

    expect(response.status()).toBe(201);

    const data = await response.json();
    expect(data).toHaveProperty('id');
    console.log('✅ Created Post:', data);
  });
});
