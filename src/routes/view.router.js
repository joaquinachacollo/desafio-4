import { Router } from "express";
import ProductosManagar from "../../manager/productosManager.js";

const router = Router();
const manager = new ProductosManagar();

router.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts");
});

router.get("/", async (req, res) => {
  const productos = await manager.getProducts();
  res.render("home", { productos: productos });
});

export default router;
