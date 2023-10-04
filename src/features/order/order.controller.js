import OrderRepository from "./order.repository.js";

export default class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
  }
  async placeOrder(req, res, next) {
    try {
      const userId = req.userId;
      this.orderRepository.placeOrder(userId);
      res.status(201).send("order is created");
      next();
    } catch (err) {
      console.log(err);
      return res.status(200).send("something went wrong");
    }
  }
}
