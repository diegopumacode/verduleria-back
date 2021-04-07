import { Product } from "./../models/Product/Product";
import { Category } from "./../models/Category/Category";
import * as express from "express";
import { MoreThan } from "typeorm";
export default class OrdenController {
  public path = "/orden";
  public router: express.Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.createOrden);
  }

  public async createOrden(req: express.Request, res: express.Response) {
    const products = req.body;

    let productFilter = await Product.find({
      where: products.map((item) => {
        return { id: item.id, stock: MoreThan(0) };
      }),
    });
    console.log(productFilter);
    // TODO: CREACION  DE LA ORDEN
    if (products.length === productFilter.length) {
        productFilter.forEach(item=>{
            let itemFilter = products.filter(proFilter=> proFilter.id == item.id)[0]
            item.stock -= itemFilter.count
            item.save()
        })
    }
    return res.send({ ok: false, msg: "Falta productos en stock" });
  }
}
