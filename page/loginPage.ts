import {Page} from '@playwright/test';
export default class LoginPage {

  constructor(public page: Page) { }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton()
  }

  async enterUsername(username: string) {
    await this.page.fill('//input[@id="user-name"]', username);
  }

  async enterPassword(password: string) {
  await this.page.fill('//input[@id="password"]', password);
  }

  async clickLoginButton() {
    await Promise.all([
      this.page.click('//input[@id="login-button"]')
    ])
  }
}