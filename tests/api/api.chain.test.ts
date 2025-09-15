import { test, expect, request } from '@playwright/test';
import { config } from '../../config/env';

const { baseURL, token } = config();

test.describe('Users API', () => {
  test('Get user list', async ({ request }) => {
    const response = await request.get(`${baseURL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    console.log('API Response:', data);

    expect(Array.isArray(data)).toBeTruthy();
  });
});
