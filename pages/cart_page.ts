import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToCart() {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  async verifyCartItem(itemName: string) {
    await this.goToCart();
    const cartItem = this.page.locator('.inventory_item_name', { hasText: itemName });
    await expect(cartItem).toBeVisible();
  }
  
}
