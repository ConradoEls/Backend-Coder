const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./products.json";
    this.products = [];
    this.productIdCounter = 1;
  }

  addProduct(product) {
    if (this.products.some((p) => p.code === product.code)) {
      console.error("El código ya existe.");
      return;
    }
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Todos los campos son obligatorios.");
      return;
    }

    product.id = this.productIdCounter++;

    this.products.push(product);

    fs.writeFileSync(this.path, JSON.stringify([...this.products]));
  }

  getProducts() {
    let contenido = fs.readFileSync(this.path, "utf-8");
    console.log(JSON.parse(contenido));
  }

  getProductById(id) {
    let productos = fs.readFileSync(this.path, "utf-8");
    const productsJson = JSON.parse(productos);
    const productoEncontrado = productsJson.find(
      (producto) => producto.id === id
    );

    if (productoEncontrado) {
      console.log(productoEncontrado);
    } else {
      console.error("Producto no encontrado");
    }
  }

  updateProduct(id, productUpdated) {
    let newProduct = {
      ...productUpdated,
      id,
    };
    let productos = fs.readFileSync(this.path, "utf-8");
    const productsJson = JSON.parse(productos);

    const index = productsJson.findIndex((producto) => producto.id === id);

    if (index !== -1) {
      productsJson[index] = newProduct;
      console.log("Producto actualizado");
    } else {
      console.log("Producto no encontrado");
    }

    fs.writeFileSync(this.path, JSON.stringify(productsJson));
  }

  deleteProduct(id) {
    let productos = fs.readFileSync(this.path, "utf-8");
    const productsJson = JSON.parse(productos);

    const index = productsJson.findIndex((producto) => producto.id === id);

    if (index !== -1) {
      productsJson.splice(index, 1);
      console.log("Producto eliminado");
    } else {
      console.log("Producto no encontrado");
    }

    fs.writeFileSync(this.path, JSON.stringify(productsJson));
  }
}

// TEST

const productManager = new ProductManager();
console.log("Instancia creada.");

productManager.addProduct({
  title: "producto prueba 1",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});

productManager.addProduct({
  title: "producto prueba 2",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc124",
  stock: 25,
});

productManager.addProduct({
  title: "producto prueba 3",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc125",
  stock: 25,
});

productManager.getProducts();

productManager.getProductById(1);

productManager.deleteProduct(2);

productManager.getProducts();

productManager.updateProduct(3, {
  title: "producto prueba 3.1",
  description: "Este es un producto prueba modificado",
  price: 201,
  thumbnail: "Sin imagen todavía",
  code: "abc126",
  stock: 24,
});

productManager.getProducts();