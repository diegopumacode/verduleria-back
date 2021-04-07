import { Category } from "./../models/Category/Category";
import * as express from "express";
export default class CategoryController {
  public path = "/category";
  public router: express.Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.createCategory);
    this.router.get(this.path, this.getAllCategories);
  }

  public async createCategory(req: express.Request, res: express.Response) {
    const categoryReq = req.body;
    const category = new Category();
    category.name = categoryReq.name;
    category.save();
    return res.send(category);
  }

  public async getAllCategories(req: express.Request, res: express.Response) {
    const categories = await Category.find();
    return res.send(categories);
  }
}
