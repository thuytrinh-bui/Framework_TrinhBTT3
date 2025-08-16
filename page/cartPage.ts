import{ Page } from '@playwright/test';
export default class CartPage {

  constructor(public page: Page) { }

  async clickOnCheckout() {
    await this.page.click('//button[@data-test="checkout"]');
  }

  async clickOnContinueShopping() {
    await this.page.click('//button[@data-test="continue-shopping"]');
  }

  getRemoveFromCartButton(productName: string) {
    return this.page.locator(`//div[text()='${productName}']/ancestor::div[@class='inventory_item']//button`);
  }

  async removeFromCart(productName: string) {
    await this.getRemoveFromCartButton(productName).click();
  }

  async removeMultipleFromCart(productNames: string[]) {
    for (const name of productNames) {
      await this.removeFromCart(name);
    }
  } 

  async getCartItems() {
    return await this.page.locator('.cart_item');
  }

  async getCartItemCount() {
    return await this.page.locator('.cart_item').count();
  }
}