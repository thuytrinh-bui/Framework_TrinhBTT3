import { test, expect} from '../base/myFixture';

const username = 'standard_user';
const password = 'secret_sauce';

test("Sort item in home page", async ({ page, baseURL, login, homePage }) => {
  await page.goto(`${baseURL}`);
  await login.login(username, password);
  
  await homePage.clickOnSortDropdown();
  await homePage.selectSortOption('Name (Z to A)');
  
  const firstItemName = await homePage.getFirstProductName();
  await expect(firstItemName).toBe('Test.allTheThings() T-Shirt (Red)');

  await page.waitForTimeout(2000);
})

test("Sort item in home page continuously", async ({ page, baseURL, login, homePage }) => {

  await page.goto(`${baseURL}`);
  await login.login(username, password);
  
  await homePage.clickOnSortDropdown();
  await homePage.selectSortOption('Price (low to high)');
  
  const firstItemName = await homePage.getFirstProductName();
  await expect(firstItemName).toBe('Sauce Labs Onesie');

  await homePage.clickOnSortDropdown();
  await homePage.selectSortOption('Price (high to low)');
  const firstItemNameAfterSecondSort = await homePage.getFirstProductName();
  await expect(firstItemNameAfterSecondSort).toBe('Sauce Labs Fleece Jacket');

  await page.waitForTimeout(2000);
})