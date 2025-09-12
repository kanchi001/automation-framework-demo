import { test, expect } from '@playwright/test';
import postIds from '../../test-data/getPosts.json';

test.describe('Data-Driven API Tests - GET Posts', () => {
  for (const item of postIds) {
    test(`Fetch Post with id=${item.id}`, async ({ request }) => {
      const response = await request.get(`https://jsonplaceholder.typicode.com/posts/${item.id}`);

      expect(response.ok()).toBeTruthy();
      const resData = await response.json();

      // Assertions
      expect(resData.id).toBe(item.id);
      expect(resData).toHaveProperty('title');
      expect(resData).toHaveProperty('body');

      console.log(`📖 Retrieved Post ID=${item.id}`, resData);
    });
  }
});
