const { expect } = require('@playwright/test');
const BasePage = require('./basePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameField = page.locator('[data-test="username"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-link"]');
  }

  async performLogin(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async verifyErrorMessage(expectedText) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedText);
  }

  async verifyLoginPageElements() {
    await expect(this.usernameField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}

module.exports = LoginPage;