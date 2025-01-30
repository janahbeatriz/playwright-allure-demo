
# 🍕 SauceDemo Automation Framework 🚀

This is a test automation framework built using **Playwright** for automating the **SauceDemo** website. The framework is designed to be scalable, maintainable, and CI/CD-ready. Currently, it includes login functionality tests, with more features to be added as the project progresses.

## 📚 Table of Contents

- [🎉 Features](#features)
- [🔧 Tech Stack](#tech-stack)
- [📁 Project Structure](#project-structure)
- [⚙️ Setup Instructions](#setup-instructions)
- [🏃‍♀️ Running Tests](#running-tests)
- [📊 Generating Reports](#generating-reports)
- [💼 CI/CD Integration](#cicd-integration)
- [🤝 Contributing](#contributing)
- [🔮 Future Work](#future-work)

## 🎉 Features

- **Page Object Model (POM)**: The framework uses the Page Object Model design pattern for better maintainability and reusability. 🛠️
- **Cross-Browser Testing**: Supports Chromium, Firefox, and WebKit browsers. 🌐
- **Allure Reporting**: Detailed and interactive test reports. 📈
- **Environment Configuration**: Uses .env files for managing environment-specific variables. 🔑
- **CI/CD Ready**: Integrated with GitHub Actions for automated testing. 🤖
- **Login Tests**: Currently implemented:
  - ✅ Successful login with valid credentials.
  - ❌ Failed login with invalid credentials.
  - 🔒 Locked user login validation.

## 🔧 Tech Stack

- **Test Runner**: Playwright 🎭
- **Programming Language**: JavaScript/Node.js 💻
- **Reporting**: Allure Report 📊
- **CI/CD**: GitHub Actions ⚙️
- **Environment Management**: dotenv 🌱
- **Linting**: ESLint (optional) 🧹
- **Code Formatting**: Prettier (optional) ✨

## 📁 Project Structure

```
saucedemo-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── src/
│   ├── pages/              # Page Object classes
│   │   ├── basePage.js
│   │   ├── loginPage.js
│   │   └── inventoryPage.js (in progress)
│   ├── utils/              # Helper functions and utilities
│   │   ├── helpers.js
│   │   └── testData.js
│   └── config/             # Configuration files
│       └── base.config.js
├── tests/
│   └── e2e/
│       ├── login/          # Login test suite
│       │   ├── login.spec.js
│       │   └── login.test-data.js
│       └── inventory/      # Inventory test suite (in progress)
├── reports/                # Allure reports
├── .env                    # Environment variables
├── .gitignore
├── package.json
├── playwright.config.js
└── README.md
```

## ⚙️ Setup Instructions

### Prerequisites

- **Node.js**: Install Node.js (v18 or higher recommended). 🍃
- **Git**: Install Git. 🐙

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/saucedemo-automation.git
cd saucedemo-automation
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright:

```bash
npm install -D @playwright/test
npx playwright install
npx playwright --version
```

4. Install Allure:

```bash
npm install -g allure-commandline
allure --version
```

5. Set up environment variables:

Create a .env file in the root directory.

Add the following variables:

```
BASE_URL=https://www.saucedemo.com/v1/
STANDARD_USER=standard_user
LOCKED_USER=locked_out_user
PASSWORD=secret_sauce
```

## 🏃‍♀️ Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Tests in Headed Mode

```bash
npm run test:headed
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

### Run Specific Test Suite

```bash
npx playwright test tests/e2e/login/login.spec.js
```

## 📊 Generating Reports

1. Run tests:

```bash
npm test
```

2. Generate and open the report:

```bash
npm run report
```

The report will open automatically in your default browser. 🖥️

## 💼 CI/CD Integration

The project is integrated with GitHub Actions for continuous integration. The workflow file (.github/workflows/playwright.yml) includes:

- Test execution on push/pull requests to main or master. 🚀
- Allure report generation. 📊
- Artifact upload for test results and reports. 🗂️

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes:

```bash
git commit -m "Add your message here"
```

4. Push to the branch:

```bash
git push origin feature/your-feature-name
```

5. Open a pull request. 🔄

## 🔮 Future Work

- **Add More Test Suites**:
  - 🛒 Inventory page tests.
  - 🛍️ Cart functionality tests.
  - 💳 Checkout process tests.
- **API Testing**: Integrate API tests for backend validation. 🧪
- **Visual Regression Testing**: Add visual testing for UI consistency. 🖼️
- **Enhanced Reporting**: Add screenshots and videos to Allure reports. 📸
- **Parallel Execution**: Optimize test execution for faster runs. ⚡

## License

This project is licensed under the MIT License. See the LICENSE file for details. 📜