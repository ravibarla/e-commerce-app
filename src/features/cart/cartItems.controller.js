import CartItemModel from "./cartItem.model.js";

export class CartItemController {
  add(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.userId;
    CartItemModel.add(productId, userId, quantity);
    res.status(200).send("cart is updated");
  }
  get(req, res) {
    const cartItems = CartItemModel.get();
    res.status(200).send(cartItems);
  }
}
