import { test, expect } from '@playwright/test';

test.describe('User management operations', () => {
  // Base URL and test user details
  const baseUrl = 'http://localhost:3001/';
  const userName = 'hello';
  const userEmail = 'hello@gmail.com';
  const updatedName = 'hello123';
  const updatedEmail = 'hello@gmail.com11';

  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL before each test
    await page.goto(baseUrl);
  });

  test('add a new user and verify', async ({ page }) => {
    // Navigate to the Add User page
    await page.getByRole('link', { name: 'Add User' }).click();
    // Enter user details and submit the form
    await page.getByPlaceholder('Enter name').fill(userName);
    await page.getByPlaceholder('Enter name').press('Tab');
    await page.getByPlaceholder('Enter email').fill(userEmail);
    await page.getByRole('button', { name: 'Add User' }).click();
    // Verify the user has been added
    await page.getByRole('link', { name: 'Display Users' }).click();
    await expect(page.locator('tbody')).toContainText(userName);
  });

  test('edit a user and verify', async ({ page }) => {
    // Navigate to the Display Users page
    await page.getByRole('link', { name: 'Display Users' }).click();
    // Initiate editing by clicking the edit button
    await page.getByTestId(`edit-btn-${userName}`).click();
    // Update the user's name and email
    await page.locator(`#name-input-${userName}`).fill(updatedName);
    await page.locator(`#email-input-${userName}`).fill(updatedEmail);
    // Submit the update
    await page.getByTestId(`update-btn-${userName}`).click();
    // Optionally, verify updates
    await expect(page.locator('tbody')).toContainText(updatedName);
  });

  test('delete a user and verify', async ({ page }) => {
    // Navigate to the Display Users page
    await page.getByRole('link', { name: 'Display Users' }).click();
    // Click the delete button and confirm deletion
    await page.getByTestId(`delete-btn-${updatedName}`).click();
    await page.getByTestId('confirm-delete-btn').click();
    // Verify the user has been deleted
    await expect(page.locator(`#name-input-${updatedName}`)).toHaveCount(0);
    // Verify the user name is no longer present in the table
    await expect(page.locator('tbody')).not.toContainText(userName);
  });
});
