import { test, expect } from '../base/myFixture';

const username = 'standard_user';
const password = 'secret_sauce';

test("Add 1 item to cart", async ({ page, baseURL, login, homePage,productDetail }) => {
  await page.goto(`${baseURL}`);
  await login.login(username, password);
  await homePage.clickOnProductName('Sauce Labs Backpack');
  await productDetail.clickOnAddToCart();
  const cartItemCount = await productDetail.getCartItemCount();
  await expect(cartItemCount).toBe('1');

  await page.waitForTimeout(2000)
})

test("Add 3 items to cart", async ({ page, baseURL, login, homePage, productDetail }) => {
  await page.goto(`${baseURL}`);
  await login.login(username, password);
  
  await homePage.addMultipleToCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt']);
  const cartItemCount = await productDetail.getCartItemCount();
  await expect(cartItemCount).toBe('3');

  await page.waitForTimeout(2000);
})

test("Add items to cart and Logout", async ({ page, baseURL, login, homePage, productDetail }) => {
  await page.goto(`${baseURL}`);
  await login.login(username, password);
  
  await homePage.addMultipleToCart(['Sauce Labs Backpack', 'Sauce Labs Onesie']);
  const cartItemCount = await productDetail.getCartItemCount();
  await expect(cartItemCount).toBe('2');
  await homePage.clickOnMenuButton();
  await homePage.clickOnLogoutButton();
  await expect(page).toHaveURL('https://www.saucedemo.com/');

  await login.login(username, password);
  const cartItemCountAfterLogout = await productDetail.getCartItemCount();
  await expect(cartItemCountAfterLogout).toBe('2');

  await page.waitForTimeout(2000);
})

test("Add item to cart and remove", async ({ page, baseURL, login, homePage, productDetail }) => {
  await page.goto(`${baseURL}`);
  await login.login(username, password);
  
  await homePage.clickOnProductName('Sauce Labs Fleece Jacket');
  await productDetail.clickOnAddToCart();
  const cartItemCount = await productDetail.getCartItemCount();
  await expect(cartItemCount).toBe('1');

  await productDetail.clickOnRemoveFromCart();
  const cartItemCountAfterRemoval = await productDetail.getCartItemCount();
  await expect(cartItemCountAfterRemoval).toBe('');

  await page.waitForTimeout(2000);
})


