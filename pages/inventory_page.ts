import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base_page';

export class InventoryPage extends BasePage {
  readonly inventoryContainer: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryContainer = page.locator('.inventory_list');
    this.cartButton = page.locator('.shopping_cart_link');
  }

  async assertInventoryVisible() {
    await this.waitForElement(this.inventoryContainer);
  }

  async openCart() {
    await this.cartButton.click();
  }
   async addToCart(itemName: string) {
    // Locate the parent inventory item by product name
    const item = this.page.locator('.inventory_item', { hasText: itemName });

    // Click the "Add to cart" button inside that item
    await item.locator('button:has-text("Add to cart")').click();
  } 
}
