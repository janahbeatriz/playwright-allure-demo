class BasePage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate(path = 'https://www.saucedemo.com/') {
        // Use Playwright's built-in baseURL handling
        await this.page.goto(path);
    }
  
    async getPageTitle() {
      return await this.page.title();
    }
  
    async waitForTimeout(duration) {
      await this.page.waitForTimeout(duration);
    }
  }
  
  module.exports = BasePage;