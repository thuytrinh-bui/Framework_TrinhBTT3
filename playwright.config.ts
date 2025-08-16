import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: ['pomtest/addToCart.test.ts'],
  use: {
    headless: false, 
    screenshot: 'on',
    video: 'on',
    baseURL: 'https://www.saucedemo.com/'
  },
  reporter: [["dot"], ["json", {
    outputFile: "jsonReports/jsonReport.json"
  }], ["html", {
    open: "never"
  }]]
});
