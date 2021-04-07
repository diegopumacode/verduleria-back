import App from "./App";
import CategoryController from "./controllers/CategoryController";
import OrdenController from "./controllers/OrdenController";
import ProductController from "./controllers/ProductController";

const controllers = [new CategoryController(), new ProductController(), new OrdenController()];
const app = new App(controllers, 3000);
app.start();

export default app;
