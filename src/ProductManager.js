import fs from "fs";

class ProductManager {
  constructor() {
    this.path = "./products.json";
    this.products = [JSON.parse(fs.readFileSync(this.path, "utf-8"))];
    this.productIdCounter = 1;
  }

  addProduct(product) {
    // VALIDA EXISTENCIA PRODUCTO EN EL ARRAY PRODUCTS
    if (this.products.some((p) => p.code === product.code)) {
      console.error("El código ya existe.");
      return;
    }

    // VALIDA QUE LOS CAMPOS A CONTINUACIÓN ESTEN CARGADOS
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.stock
    ) {
      console.log("Todos los campos son obligatorios.");
      return;
    }

    // ASIGNA UN ID AUTOINCREMENTAL
    product.id = this.productIdCounter++;

    // AGREGA EL PRODUCTO AL ARRAY
    this.products.push(product);

    // CREA UN ARCHIVO .json CON EL CONTENIDO DEL ARRAY DE PRODUCTOS
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }

  getProducts() {
    let contenido = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(contenido);
  }

  getProductById(id) {
    let productos = fs.readFileSync(this.path, "utf-8");
    const productsJson = JSON.parse(productos);
    const productoEncontrado = productsJson.find(
      (producto) => producto.id === id
    );

    if (productoEncontrado) {
      return productoEncontrado;
    } else {
      console.log("Producto no encontrado");
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

export default ProductManager;
