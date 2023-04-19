import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import viewRouter from "./routes/view.router.js";
import realTimeProducts from "./routes/realTimeProducts.js";
import ProductosManager from "./manager/productosManager.js";

const PORT = 8080;
const app = express();
const manager = new ProductosManager();

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewRouter);
app.use("/realtimeproducts", realTimeProducts);

const server = app.listen(PORT, () => {
  console.log("Servidor funcionando en el puerto: " + PORT);
});

const socketServerIO = new Server(server);

socketServerIO.on("connection", async (socket) => {
  console.log("Usuario conectado");
  const products = await manager.getProducts();
  socketServerIO.emit("actualizado", products);

  socket.on("message", async (nuevoProducto) => {
    nuevoProducto = await manager.addProducts(nuevoProducto);

    const productos = await manager.getProducts();
    socketServerIO.emit("actualizado", productos);
  });
  socket.on("eliminar", async (id) => {
    await manager.deleteProduct(id);
    const productos = await manager.getProducts();
    socketServerIO.emit("actualizado", productos);
  });
});
