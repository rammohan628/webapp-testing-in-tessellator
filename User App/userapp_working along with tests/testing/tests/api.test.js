import { test, expect } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://localhost:3000/api';

test.describe('User API Tests', () => {
  let userId;

  test('should add a user via API and verify', async ({ request }) => {
    // Create a new user
    const newUserResponse = await request.post(`${baseURL}/users`, {
      data: {
        name: 'Nithin S',
        email: 'Nithin.S@example.com',
      },
    });
    expect(newUserResponse.status()).toBe(200);
    const newUser = await newUserResponse.json();
    expect(newUser).toHaveProperty('name', 'Nithin S');
    expect(newUser).toHaveProperty('email', 'Nithin.S@example.com');

    userId = newUser._id;

    // Confirm the user was added
    const userResponse = await request.get(`${baseURL}/users/${userId}`);
    expect(userResponse.status()).toBe(200);
    const userData = await userResponse.json();
    expect(userData).toHaveProperty('name', 'Nithin S');
    expect(userData).toHaveProperty('email', 'Nithin.S@example.com');
  });

  test('should get all users via API', async ({ request }) => {
    const usersResponse = await request.get(`${baseURL}/users`);
    expect(usersResponse.status()).toBe(200);
    const usersData = await usersResponse.json();
    expect(Array.isArray(usersData)).toBeTruthy();
  });

  test('should get a user by ID via API', async ({ request }) => {
    const userResponse = await request.get(`${baseURL}/users/${userId}`);
    expect(userResponse.status()).toBe(200);
    const userData = await userResponse.json();
    expect(userData).toHaveProperty('name', 'Nithin S');
    expect(userData).toHaveProperty('email', 'Nithin.S@example.com');
  });

  test('should update a user via API and verify', async ({ request }) => {
    // Update the user
    const updatedUserResponse = await request.put(`${baseURL}/users/${userId}`, {
      data: {
        name: 'Abhishek G',
        email: 'Abhishek.G@example.com',
      },
    });
    expect(updatedUserResponse.status()).toBe(200);

    // Confirm the user was updated
    const userResponse = await request.get(`${baseURL}/users/${userId}`);
    expect(userResponse.status()).toBe(200);
    const userData = await userResponse.json();
    expect(userData).toHaveProperty('name', 'Abhishek G');
    expect(userData).toHaveProperty('email', 'Abhishek.G@example.com');
  });

  test('should delete a user via API and verify', async ({ request }) => {
    // Delete the user
    const deleteResponse = await request.delete(`${baseURL}/users/${userId}`);
    expect(deleteResponse.status()).toBe(200);

    // Confirm the user was deleted
    const userResponse = await request.get(`${baseURL}/users/${userId}`);
    expect(userResponse.status()).toBe(400); // Assuming the API returns 404 for not found
  });
});
