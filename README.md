# QA Automation Technical Assignment

This project contains two test suites:

1. **Part 1 (Cypress)**: UI and API testing for SauceDemo and ReqRes.
2. **Part 2 (Playwright)**: UI and API testing for DemoQA and JSONPlaceholder.

## Project Structure

- `/part1_cypress` - Cypress framework (JavaScript)
- `/part2_playwright` - Playwright framework (TypeScript)

## Setup & Execution

### Prerequisites

- Node.js (v18 or higher)
- NPM

### Running Cypress Tests

1. `cd part1_cypress`
2. `npm install`
3. `npx cypress install`
4. `npm install dotenv`
5. `npm test` (headless mode) or `npm run cy:open` (interactive)

### Running Playwright Tests

1. `cd part2_playwright`
2. `npm install`
3. `npx playwright install`
4. `npm install dotenv`
5. `npm test`

---

## Required Engineering Reflection

### 1. How would you scale this framework to support 300+ tests?

To scale effectively, I would implement the following strategies:

- **Parallelization & Sharding**: Utilize Playwright's built-in sharding or Cypress's orchestration to run tests across multiple containers in CI.
- **Test Design**: Ensure each test is independent and focuses on a single feature to prevent "snowball" failures.
- **Data Management**: Move test data to external JSON/CSV files or utilize database seeding/API calls for state setup instead of slow UI steps.
- **Layered Architecture**: Strictly follow POM or Action-based patterns to ensure that a single UI change requires only one update in the code.
- **Selective Execution**: Use tags (e.g., `@smoke`, `@regression`) to run only relevant subsets of tests per commit.

### 2. How would you reduce and monitor flakiness in CI?

Flakiness is the biggest enemy of ROI in automation. My approach:

- **Smart Wait Strategies**: Avoid hard-coded sleeps. Use dynamic waits (auto-waiting in Playwright, intercept/retries in Cypress).
- **Automatic Retries**: Configure CI-only retries (e.g., 2 retries) to filter out transient network issues.
- **Stability Monitoring**: Integrate with tools like Allure, ReportPortal, or Cypress Cloud to track "flaky" trends and isolate unstable tests.
- **Visual & Network Isolation**: Mock unstable 3rd-party services (like analytics or ads) using network interception.
- **Diagnostic Artifacts**: Always collect Traces, Videos, and Screenshots on failure for rapid root-cause analysis.

### 3. What test strategy would you run on every Pull Request vs nightly runs?

A balanced CI/CD strategy optimizes feedback loops:

- **Every Pull Request (Fast Feedback)**:
  - **Scope**: Smoke tests + Critical path E2E (max 5-10 min).
  - **API Tests**: Full API regression (it's fast and stable).
  - **Environment**: Containerized (Docker) to ensure isolation.
- **Nightly Runs (Full Coverage)**:
  - **Scope**: Full regression suite (300+ tests).
  - **Cross-Browser/Platform**: Testing on multiple browsers (Chromium, Firefox) and viewports (Mobile/Desktop).
  - **Edge Cases**: Complex flows, negative scenarios, and data-driven tests.
  - **Report Generation**: Detailed HTML reports with historical trends sent to the team (Slack/Email).

---

## Failure Diagnostics

- **Cypress**: Configured to capture screenshots on failure (`screenshotOnRunFailure: true`).
- **Playwright**: Configured with `trace: 'retain-on-failure'`, `screenshot: 'only-on-failure'`, and `video: 'retain-on-failure'` in `playwright.config.ts`.
