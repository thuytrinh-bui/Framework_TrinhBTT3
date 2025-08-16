import {Page} from '@playwright/test';
export default class homePage {
  constructor(public page: Page) { }

  getAddToCartButton(productName: string) {
    return this.page.locator(`//div[text()='${productName}']/ancestor::div[@class='inventory_item']//button`);
  }

  async addToCart(productName: string) {
    await this.getAddToCartButton(productName).click();
  }

  async addMultipleToCart(productNames: string[]) {
    for (const name of productNames) {
      await this.addToCart(name);
    }
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

  async getCartItemCount() {
    return await this.page.locator('.shopping_cart_badge').textContent();
  }

  async clickOnProductImage() {
    await this.page.click('.inventory_item_img');
  }

  async clickOnProductName(productName: string) {
    await this.page.click(`.inventory_item_name:has-text("${productName}")`);
  }

  async clickOnSortDropdown() {
    await this.page.click('.product_sort_container');
  }

  async selectSortOption(option: string) {
    await this.page.selectOption('.product_sort_container', option);
  }

  async getFirstProductName() {
    return await this.page.locator('.inventory_item_name').first().textContent();
  }

  async clickOnCart() {
    await this.page.click('//a[@data-test="shopping-cart-link"]');
  }

  async clickOnMenuButton() {
    await this.page.click('//button[@id= "react-burger-menu-btn"]');
  }

  async clickOnLogoutButton() {
    await this.page.click('//a[@data-test= "logout-sidebar-link"]');
  }
}
