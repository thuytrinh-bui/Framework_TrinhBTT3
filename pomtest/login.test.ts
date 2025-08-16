import { test, expect } from '../base/myFixture';

test("Login with valid username", async ({ page, baseURL, login}) => {
  await page.goto(`${baseURL}`);
  await login.enterUsername('standard_user');
  await login.enterPassword('secret_sauce');
  await login.clickLoginButton()

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await page.waitForTimeout(2000);
})

test("Login with invalid username", async ({ page, baseURL, login }) => {
  await page.goto(`${baseURL}`);
  await login.enterUsername('invalid_user');
  await login.enterPassword('secret_sauce');
  await login.clickLoginButton();
  
  const errorMessageLocator = page.locator('.error-message-container');
  await expect(errorMessageLocator).toBeVisible();
  const errorMessage = await errorMessageLocator.textContent();
  await expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service'); 
});

test("Login with invalid password", async ({ page, baseURL, login }) => {
  await page.goto(`${baseURL}`);
  await login.enterUsername('standard_user');
  await login.enterPassword('invalid_password');
  await login.clickLoginButton();
  
  const errorMessageLocator = page.locator('.error-message-container');
  await expect(errorMessageLocator).toBeVisible();
  const errorMessage = await errorMessageLocator.textContent();
  await expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service'); 
});

test("Login with empty username and password", async ({ page, baseURL, login }) => {
  await page.goto(`${baseURL}`);
  await login.enterUsername('');
  await login.enterPassword('');
  await login.clickLoginButton();
  
  const errorMessageLocator = page.locator('.error-message-container');
  await expect(errorMessageLocator).toBeVisible();
  const errorMessage = await errorMessageLocator.textContent();
  await expect(errorMessage).toBe('Epic sadface: Username is required'); 
});