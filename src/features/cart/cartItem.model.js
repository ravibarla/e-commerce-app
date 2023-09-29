//userId,productId,quantity
export default class CartItemModel {
  constructor(id, productId, userId, quantity) {
    (this.id = id),
      (this.productId = productId),
      (this.userId = userId),
      (this.quantity = quantity);
  }
  static add(productId, userId, quantity) {
    const id = cartItems.length + 1;
    const cartItem = new CartItemModel(id, productId, userId, quantity);
    cartItem.id = cartItems.length + 1;
    cartItems.push(cartItem);
    return cartItem;
  }
  static get(userId) {
    return cartItems.filter((user) => user.userId == userId);
  }
  static delete(cartId, userId) {
    const cartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id == cartId && cartItem.userId == userId
    );
    if (cartItemIndex == -1) {
      return "cart not found";
    } else {
      cartItems.splice(cartItemIndex, 1);
      return "deleted successfully";
    }
  }
}

let cartItems = [new CartItemModel(1, 2, 1, 1), new CartItemModel(1, 1, 2, 2)];

//some validations missing
//1. validate invalid input
//2. validate existing products in the cart
//3. validate non existing product in the cart
