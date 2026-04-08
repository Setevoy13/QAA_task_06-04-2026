export class InventoryPage {
  get inventoryList() {
    return cy.get(".inventory_list");
  }
  get addToCartButtons() {
    return cy.get(".btn_inventory");
  }
  get cartBadge() {
    return cy.get(".shopping_cart_badge");
  }

  addAnyProduct() {
    this.addToCartButtons.first().click();
  }
}
