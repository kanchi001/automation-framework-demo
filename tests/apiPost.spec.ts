import { test, expect } from '@playwright/test';

test('POST API test', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'TestForPR',
      body: 'bTestForPR',
      userId: 2001,
    },
  });

  expect(response.ok()).toBeTruthy();

  const data = await response.json();
  expect(data.title).toBe('TestForPR');
});
