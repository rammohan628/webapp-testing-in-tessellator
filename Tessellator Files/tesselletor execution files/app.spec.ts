const { test, expect } = require('@playwright/test');
const baseURL = process.env.BASE_URL;


test('check if index.html has title !', async ({ page }) => {
  // Navigate to the index.html page
  await page.goto(baseURL);

  // Get the title of the page
  const title = await page.title();

  // Assert the title
  expect(title).toBe('Hello KMIT!');
});
