const { test, expect } = require('@playwright/test');
const LoginPage = require('../../../src/pages/loginPage');
const { validUser, lockedUser } = require('./login.test-data');

test.describe('Login Functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate(); // Now uses Playwright's baseURL
  });
  test('Successful login with valid credentials @smoke', async ({ page }) => {
    await loginPage.performLogin(validUser.username, validUser.password);
    await expect(page).toHaveURL(/inventory.html/);
    //await expect(loginPage.cartBadge).toBeVisible({ visible: false });
  });

  test('Locked user login validation @security', async ({ page }) => {
    await loginPage.performLogin(lockedUser.username, lockedUser.password);
    await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
    await expect(page.locator('data-test="error-button')).toBeTruthy();
  });

  test('Login page UI validation @ui', async () => {
    await loginPage.verifyLoginPageElements();
  });
});