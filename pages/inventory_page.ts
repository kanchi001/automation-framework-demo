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
}
