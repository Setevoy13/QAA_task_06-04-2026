export class InventoryPage {
  get inventoryList() {
    return cy.get('[data-test="inventory-list"]');
  }
  get addToCartButtons() {
    return cy.get(".btn_inventory");
  }
  get cartBadge() {
    return cy.get('[data-test="shopping-cart-badge"]');
  }

  addAnyProduct() {
    this.addToCartButtons.first().click();
  }
}
