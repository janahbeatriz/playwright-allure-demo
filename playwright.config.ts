const { defineConfig } = require('@playwright/test');
const config = require('./src/config/base.config');

module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: config.timeout,
  retries: config.retries,
  reporter: [
    ['list'],
    ['allure-playwright', { 
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: true
    }]
  ],
  use: {
    baseURL: process.env.BASE_URL, // Directly use env variable
    headless: config.headless,
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chrome',
      use: { 
        browserName: 'chromium',
        channel: 'chrome'
      },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    }
  ]
});
