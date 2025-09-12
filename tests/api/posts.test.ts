import { test, expect } from '@playwright/test';
import postsData from '../../test-data/posts.json';
import { APIClient } from '../../utils/apiClient';
import { PostData } from '../../types';

const posts: PostData[] = postsData;

test.describe.parallel('API Tests', () => {
  let client: APIClient;

  test.beforeAll(async ({ request }) => {
    client = new APIClient(request);
  });

  posts.forEach((post) => {
    test(`Verify post with ID ${post.id}`, async () => {
      const response = await client.get(`/posts/${post.id}`);
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.id).toBe(post.id);
      expect(body.title).toContain(post.title);
    });
  });
});
