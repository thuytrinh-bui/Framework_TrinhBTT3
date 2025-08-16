import {Page} from '@playwright/test';
export default class productDetail {

  constructor(public page: Page) {

  }

  async clickOnAddToCart() {
    await this.page.click('//button[@data-test="add-to-cart"]');
  }

  async clickOnRemoveFromCart() {
    await this.page.click('//button[@data-test="remove"]');
  }

  async getCartItemCount() {
    return await this.page.locator('.shopping_cart_link').textContent();
  }
}