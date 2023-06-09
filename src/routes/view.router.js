import { Router } from "express";
import ProductosManager from "../manager/productosManager.js";

const router = Router();
const manager = new ProductosManager();

router.get("/", async (req, res) => {
  const productos = await manager.getProducts();
  res.render("home", { productos: productos });
});

export default router;
