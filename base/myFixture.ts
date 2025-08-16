import { test as baseTest } from '@playwright/test';
import LoginPage from '../page/loginPage';
import HomePage from '../page/homePage';
import CartPage from '../page/cartPage';
import ProductDetail from '../page/productDetail';
import CheckOutPage from '../page/checkOutPage';

type pages = {
  login: LoginPage;
  homePage: HomePage;
  cartPage: CartPage;
  productDetail: ProductDetail;
  checkOutPage: CheckOutPage;
}

const testPages = baseTest.extend<pages>({ 
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  productDetail: async ({ page }, use) => {
    await use(new ProductDetail(page));
  },
  checkOutPage: async ({ page }, use) => {
    await use(new CheckOutPage(page));
  }
})
export const test = testPages;
export const expect = testPages.expect;