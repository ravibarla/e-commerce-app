import { LikeRepository } from "./like.repository.js";

export class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  async likeItem(req, res) {
    try {
      const { id, type } = req.body;
      if (type != "Products" && type != "Category") {
        return res.status(400).send("Invalid");
      }

      if (type == "Products") {
        await this.likeRepository.likeProduct(req.userId, id);
      } else {
        await this.likeRepository.likeCategory(req.userId, id);
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("something went wrong with database");
    }
    res.status(201).send();
  }
  async getLikes(req, res, next) {
    try {
      const { id, type } = req.query;
      const likes = await this.likeRepository.getLikes(type, id);

      return res.status(200).send(likes);
    } catch (err) {
      console.log(err);
      return res.status(200).send("something went wrong");
    }
  }
}
