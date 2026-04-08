import { test, expect } from "@playwright/test";

//Interface description for future validation
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
test.describe("Task 6 — API Test (JSONPlaceholder)", () => {
  test("should validate GET /posts response", async ({ request }) => {
    const apiBaseUrl = process.env.API_BASE_URL;
    if (!apiBaseUrl)
      throw new Error("API_BASE_URL is not defined in .env file");
    // 1. Sending GET request
    const response = await request.get(`${apiBaseUrl}/posts`);

    // 2. Status code validation
    expect(response.ok()).toBeTruthy(); // checking status in 200-299 on return
    expect(response.status()).toBe(200);

    const body: Post[] = await response.json();
    // 3. Structure validation
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    // 4. validation of the 1st element in array
    const firstPost = body[0];
    expect(firstPost.id).toBeGreaterThan(0);
    expect(typeof firstPost.id).toBe("number");
    expect(typeof firstPost.title).toBe("string");
  });
});
