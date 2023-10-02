import CartItemModel from "./cartItem.model.js";
import CartItemsRepository from "./cartItem.repository.js";

export class CartItemController {
  constructor() {
    this.cartItemsRepository = new CartItemsRepository();
  }
  async add(req, res) {
    try {
      const { productId, quantity } = req.body;
      const userId = req.userId;

      await this.cartItemsRepository.add(productId, userId, quantity);
      return res.status(200).send("cart is updated");
    } catch (err) {
      console.log(err);
      return res.status(200).send("something went wrong");
    }
  }
  async get(req, res) {
    try {
      const userId = req.userId;
      // const cartItems = CartItemModel.get(userId);
      const cartItems = await this.cartItemsRepository.get(userId);
      return res.status(200).send(cartItems);
    } catch (err) {
      console.log(err);
      return res.status(200).send("something went wrong");
    }
  }
  async delete(req, res) {
    try {
      const userId = req.userId;
      const cartItemId = req.params.id;
      // const error = CartItemModel.delete(cartItemId, userId);
      const isDeleted = await this.cartItemsRepository.delete(
        userId,
        cartItemId
      );
      if (!isDeleted) {
        return res.status(404).send("item not found ");
      }
      return res.status(200).send("deleted successfully");
    } catch (err) {
      console.log(err);
      return res.status(200).send("something went wrong");
    }
  }
}
