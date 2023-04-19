const socket = io();
const log = document.getElementById("log");

const botonEnviar = document.getElementById("enviar");
const botonquitar = document.getElementById("quitar");

botonEnviar.addEventListener("click", (event) => {
  //event.preventDefault();
  if (event) {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const code = document.getElementById("code").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    const thumbnail = document.getElementById("thumbnail").value;

    const nuevoProducto = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
    };

    socket.emit("message", nuevoProducto);
  }
  title.value = "";
  description.value = "";
  price.value = "";
  thumbnail.value = "";
  code.value = "";
  stock.value = "";
  category.value = "";
});

socket.on("actualizado", (productos) => {
  let listaProductos = document.getElementById("productos");
  listaProductos.innerHTML = "";
  productos.forEach((producto) => {
    let p = document.createElement("p");
    p.innerText = `id: ${producto.id},
     title: ${producto.title},
    description: ${producto.description},
     price: ${producto.price}, 
     thumbnail: ${producto.thumbnail},
     code: ${producto.code},
      stock: ${producto.stock},
       category: ${producto.category}`;
    listaProductos.appendChild(p);
  });
});

botonquitar.addEventListener("click", (event) => {
  if (event) {
    const id = document.getElementById("id").value;
    document.getElementById("id").value = "";
    socket.emit("eliminar", id);
  }
});
