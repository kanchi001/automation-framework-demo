import { test, expect } from '@playwright/test';
import postData from '../../test-data/postsData.json';

test.describe('Data-Driven API Tests - Posts', () => {
  for (const data of postData) {
    test(`Create Post for userId=${data.userId}`, async ({ request }) => {
      const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data
      });

      expect(response.ok()).toBeTruthy();
      const resData = await response.json();

      // Assertions
      expect(resData.title).toBe(data.title);
      expect(resData.body).toBe(data.body);
      expect(resData.userId).toBe(data.userId);

      console.log(`✅ Created post for userId=${data.userId}`, resData);
    });
  }
});
