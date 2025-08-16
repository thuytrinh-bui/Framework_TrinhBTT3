import {Page} from '@playwright/test';
export default class homePage {
  constructor(public page: Page) { }

  async enterFirstName(firstName: string) {
    await this.page.fill('//input[@id="first-name"]', firstName);
  }

  async enterLastName(lastName: string) {
    await this.page.fill('//input[@id="last-name"]', lastName);
  }

  async enterPostalCode(postalCode: string) {
    await this.page.fill('//input[@id="postal-code"]', postalCode);
  }

  async clickOnContinue() {
    await this.page.click('//input[@id="continue"]');
  }

  async clickOnCancel() {
    await this.page.click('//button[@id="cancel"]');
  }

  async clickOnFinish() {
    await this.page.click('//button[@id="finish"]');
  }

  async clickOnBackHome() {
    await this.page.click('//button[@id="back-to-products"]');
  }
}