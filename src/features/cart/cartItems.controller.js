import CartItemModel from "./cartItem.model.js";

export class CartItemController {
  add(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.userId;
    CartItemModel.add(productId, userId, quantity);
    return res.status(200).send("cart is updated");
  }
  get(req, res) {
    const userId = req.userId;
    const cartItems = CartItemModel.get(userId);
    return res.status(200).send(cartItems);
  }
  delete(req, res) {
    const userId = req.userId;
    const cartItemId = req.params.id;
    const error = CartItemModel.delete(cartItemId, userId);
    if (error) {
      return res.status(404).send(error);
    } else {
      return res.status(200).send("deleted successfully");
    }
  }
}
