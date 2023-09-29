//userId,productId,quantity
export default class CartItemModel {
  constructor(productId, userId, quantity) {
    (this.productId = productId),
      (this.userId = userId),
      (this.quantity = quantity);
  }
  static add(productId, userId, quantity) {
    const cartItem = new CartItemModel(productId, userId, quantity);
    cartItem.id = cartItems.length + 1;
    cartItems.push(cartItem);
    return cartItem;
  }
  static get() {
    return cartItems;
  }
}

let cartItems = [new CartItemModel(1, 2, 1)];
