import { Product } from "./../models/Product/Product";
import * as express from "express";

export default class ProductController {
  public path = "/product";
  public router: express.Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.createProduct);
    this.router.get(this.path, this.getAllProduct);
  }

  public async createProduct(req: express.Request, res: express.Response) {
    const productReq = req.body;
    const product = new Product();
    product.name = productReq.name;
    product.description = productReq.description;
    product.stock = productReq.stock;
    product.price = productReq.price;
    product.category = productReq.category;
    product.image_url = productReq.image_url;
    product.save();
    return res.send(product);
  }

  public async getAllProduct(req: express.Request, res: express.Response) {
    const products = await Product.find({relations:['category']});
    return res.send(products);
  }
}
