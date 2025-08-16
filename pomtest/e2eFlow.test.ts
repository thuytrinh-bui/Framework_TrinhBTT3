import { test, expect} from '../base/myFixture';

const username = 'standard_user';
const password = 'secret_sauce';

test("Verify e2e flow", async ({ page, baseURL, login, homePage, productDetail, cartPage, checkOutPage}) => {

  await page.goto(`${baseURL}`);
  await login.login(username, password);

  // Add items to cart
  await homePage.addMultipleToCart(['Sauce Labs Bolt T-Shirt', 'Sauce Labs Bike Light']);
  let cartItemCount = await productDetail.getCartItemCount();
  await expect(cartItemCount).toBe('2');

  // Navigate to cart and verify items
  await homePage.clickOnCart();
  await expect(await cartPage.getCartItems()).toHaveCount(2);
  
  // Add more items to cart
  await cartPage.clickOnContinueShopping();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await homePage.addToCart('Sauce Labs Onesie');
  cartItemCount = await productDetail.getCartItemCount();
  await expect(cartItemCount).toBe('3');
  await homePage.clickOnCart();
  await expect(await cartPage.getCartItems()).toHaveCount(3);

  // Checkout process
  await cartPage.clickOnCheckout();
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  
  await checkOutPage.enterFirstName('Trinh');
  await checkOutPage.enterLastName('Bui');
  await checkOutPage.enterPostalCode('000555');
  await checkOutPage.clickOnContinue();
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

  await checkOutPage.clickOnFinish();
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  const completeMessage = await page.locator('.complete-header').textContent();
  await expect(completeMessage).toBe('Thank you for your order!');

  await checkOutPage.clickOnBackHome();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  await page.waitForTimeout(2000);
})