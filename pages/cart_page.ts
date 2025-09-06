import { Page, expect } from '@playwright/test';
import { allure } from 'allure-playwright';


export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToCart() {
    await this.page.goto('https://www.saucedemo.com/cart.html ');
  }

//   async verifyCartItemWithPrice(itemName: string, expectedPrice: string) {
//   await this.goToCart();
//   const cartItem = this.page.locator('.cart_item', { hasText: itemName });
//   await expect(cartItem.locator('.inventory_item_name')).toHaveText(itemName);
//   await expect(cartItem.locator('.inventory_item_price')).toHaveText(expectedPrice);
// }
async verifyCartItemWithPrice(itemName: string, price: string) {
  await allure.step(`Verify cart item "${itemName}" with price "${price}"`, async () => {
    const item = this.page.locator('.cart_item', { hasText: itemName });
    await expect(item.locator('.inventory_item_price')).toHaveText(price);
  });
}


  
}
